/**
 * A dashboard card for the thl integration: the weekly case numbers of one
 * disease drawn on a map of Finland, each wellbeing services county coloured by
 * how much its number changed from the week before. Clicking a county shows its
 * own figures beside the map.
 */
import { LitElement, css, html, nothing, svg } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { caseCount, fillColor, findArea } from './areas';
import './editor';
import { CARD_VERSION, WHOLE_COUNTRY } from './const';
import type { HomeAssistant } from './hass';
import { browserLanguage, translate } from './localize/localize';
import { DISEASE_LOGO } from './logos';
import { COUNTIES, MAP_GROUP_TRANSFORM, MAP_HEIGHT, MAP_VIEW_BOX, MAP_WIDTH, OUTLINES } from './map/counties';
import type { CountyShape, Outline } from './map/counties';
import { COUNTY_LABELS } from './map/labels';
import type { Area, ThlCardConfig } from './types';

console.info(
  `%c  THL-CARD  \n%c  ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

interface CardRegistration {
  type: string;
  name: string;
  description: string;
  documentationURL?: string;
  preview?: boolean;
}

const registry = window as unknown as { customCards?: CardRegistration[] };
registry.customCards = registry.customCards ?? [];
registry.customCards.push({
  type: 'thl-card',
  name: translate(browserLanguage(), 'name'),
  description: translate(browserLanguage(), 'description'),
  documentationURL: 'https://github.com/jesmak/thl-card',
  preview: true,
});

@customElement('thl-card')
export class ThlCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ThlCardConfig;
  @state() private selected?: string;

  public static getConfigElement(): HTMLElement {
    return document.createElement('thl-card-editor');
  }

  /** Offers the first disease of the thl integration when the card is added from the picker. */
  public static getStubConfig(hass?: HomeAssistant): Record<string, unknown> {
    const entity = Object.keys(hass?.states ?? {}).find((id) => id.startsWith('sensor.thl_'));
    return { entity: entity ?? '' };
  }

  public setConfig(config: ThlCardConfig): void {
    if (!config || !config.entity) {
      throw new Error(translate(browserLanguage(), 'invalid_configuration'));
    }
    this.config = { ...config };
  }

  public getCardSize(): number {
    return 8;
  }

  /** In a sections view the card is drawn full width, and never squeezed below half a section. */
  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: 'auto', min_columns: 6 };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('config') || changed.has('selected') || !this.config) {
      return true;
    }
    const previous = changed.get('hass') as HomeAssistant | undefined;
    // Redraw whenever the sensor itself changed, not only when the week did.
    return !previous || previous.states[this.config.entity] !== this.hass?.states[this.config.entity];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return this.message(this.text('entity_not_found', { entity: this.config.entity }));
    }
    if (entity.state === 'unavailable' || entity.state === 'unknown') {
      return this.message(this.text('unavailable'));
    }

    const areas = (entity.attributes.values as Area[] | undefined) ?? [];
    const selected = this.selected === undefined ? undefined : findArea(areas, this.selected);
    const whole = findArea(areas, WHOLE_COUNTRY);

    return html`
      <ha-card>
        <div class="card">
          <div class="disease">
            ${DISEASE_LOGO}
            <span class="disease-name">${entity.attributes.disease_name as string}</span>
          </div>
          ${this.map(areas)}
          <div class="figures">
            ${this.stats(selected?.name ?? this.text('whole_country'), selected ?? whole)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private map(areas: Area[]): TemplateResult {
    const width = this.config?.map_width;
    const size =
      width === undefined
        ? `aspect-ratio: ${MAP_WIDTH} / ${MAP_HEIGHT};`
        : `aspect-ratio: ${MAP_WIDTH} / ${MAP_HEIGHT}; width: ${width}px; max-width: 100%;`;

    return html`
      <div class="map" style="${size}">
        ${COUNTY_LABELS.map(
          (label) => html`
            <span
              class="amount"
              style="bottom: ${((label.bottom / MAP_HEIGHT) * 100).toFixed(3)}%; left: ${(
                (label.left / MAP_WIDTH) *
                100
              ).toFixed(3)}%;"
            >
              ${caseCount(areas, label.id)}
            </span>
          `,
        )}
        <svg viewBox="${MAP_VIEW_BOX}" version="1.1" preserveAspectRatio="xMidYMid meet">
          <g style="display:inline" transform="${MAP_GROUP_TRANSFORM}">
            ${OUTLINES.filter((outline) => outline.layer === 'under').map((outline) => this.outline(outline))}
            ${COUNTIES.map((county) => this.county(county, areas))}
          </g>
          <g style="display:inline" transform="${MAP_GROUP_TRANSFORM}">
            ${OUTLINES.filter((outline) => outline.layer === 'over').map((outline) => this.outline(outline))}
          </g>
        </svg>
      </div>
    `;
  }

  private county(county: CountyShape, areas: Area[]) {
    return svg`<path
      d="${county.d}"
      transform="${ifDefined(county.transform)}"
      style="display:inline;fill:${fillColor(findArea(areas, county.id))}"
      id="${county.id}"
      class="${this.selected === county.id ? 'selected' : ''}"
      @click="${() => this.select(county.id)}" />`;
  }

  private outline(outline: Outline) {
    return svg`<path id="${outline.id}" style="${outline.style}" d="${outline.d}"
      transform="${ifDefined(outline.transform)}" />`;
  }

  private stats(title: string, area: Area | undefined): TemplateResult | typeof nothing {
    if (area === undefined) {
      return nothing;
    }
    return html`
      <div class="stats-container">
        <span class="stats-title">${title}</span>
        <span class="stats">${this.text('last_week')}: ${area.amount_last_week}</span>
        ${
          area.amount_two_weeks_ago === undefined
            ? nothing
            : html`<span class="stats">${this.text('two_weeks_ago')}: ${area.amount_two_weeks_ago}</span>`
        }
        ${
          area.change_percentage === undefined
            ? nothing
            : html`<span class="stats">
                ${this.text('change')}: ${area.change_percentage}% (${area.change_in_numbers})
              </span>`
        }
      </div>
    `;
  }

  private message(text: string): TemplateResult {
    return html`<ha-card><div class="message">${text}</div></ha-card>`;
  }

  private select(id: string): void {
    // Clicking the county that is already chosen goes back to the whole country.
    this.selected = this.selected === id ? undefined : id;
  }

  private text(key: string, replacements?: Record<string, string>): string {
    const language = this.hass?.locale?.language ?? this.hass?.language ?? browserLanguage();
    return translate(language, key, replacements);
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      .card {
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 12px;
        box-sizing: border-box;
      }

      /* The disease is named at the top, on one line whatever width the card has. */
      .disease {
        display: flex;
        align-items: center;
        justify-content: center;
        /* The drawing and the gap are sized from this, so the whole row keeps
           its proportions at every width. */
        font-size: clamp(11px, 5.5cqw, 18px);
        gap: 0.5em;
        max-width: 100%;
        max-height: 48px;
      }

      .disease-logo {
        flex: 0 0 auto;
        width: 1.7em;
        height: 1.7em;
      }

      .disease-name {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
      }

      .map {
        position: relative;
        container-type: inline-size;
        /* Grows with the card, but only so far: taller than this and it swamps the page. */
        width: min(100%, 300px);
      }

      .map svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      .map path {
        cursor: pointer;
      }

      .map path:hover {
        opacity: 0.7;
      }

      .map path:active {
        opacity: 0.4;
      }

      .map path.selected {
        opacity: 0.5;
      }

      .amount {
        color: var(--primary-text-color);
        position: absolute;
        /* The numbers lie on top of the shapes, so let the clicks through to the county beneath. */
        pointer-events: none;
        text-shadow: 1px 1px 2px black;
        /* 9px when the map is its original 235px wide, and in proportion after that. */
        font-size: 9px;
        font-size: 3.83cqw;
      }

      .figures {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .stats-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .stats-title {
        font-weight: 600;
      }

      .stats {
        font-size: 12px;
      }

      .message {
        padding: 16px;
        color: var(--primary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'thl-card': ThlCard;
  }
}
