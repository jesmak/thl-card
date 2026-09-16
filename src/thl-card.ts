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
import { CARD_VERSION, WHOLE_COUNTRY } from './const';
import type { HomeAssistant } from './hass';
import { browserLanguage, translate } from './localize/localize';
import { DISEASE_LOGO, THL_LOGO } from './logos';
import {
  COUNTIES,
  COUNTY_LABELS,
  MAP_GROUP_TRANSFORM,
  MAP_HEIGHT,
  MAP_VIEW_BOX,
  MAP_WIDTH,
  OUTLINES,
} from './map/counties';
import type { CountyShape, Outline } from './map/counties';
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
}

const registry = window as unknown as { customCards?: CardRegistration[] };
registry.customCards = registry.customCards ?? [];
registry.customCards.push({
  type: 'thl-card',
  name: translate(browserLanguage(), 'name'),
  description: translate(browserLanguage(), 'description'),
});

@customElement('thl-card')
export class ThlCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: ThlCardConfig;
  @state() private selected?: string;

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

    return html`
      <ha-card>
        ${this.map(areas)}
        <div class="right-pane">
          ${THL_LOGO}
          <div class="disease-logo-container">
            ${DISEASE_LOGO}
            <span>${entity.attributes.disease_name as string}</span>
          </div>
          ${this.stats(this.text('whole_country'), findArea(areas, WHOLE_COUNTRY))}
          ${selected === undefined ? nothing : this.stats(selected.name, selected)}
        </div>
      </ha-card>
    `;
  }

  private map(areas: Area[]): TemplateResult {
    return html`
      <div class="map">
        ${COUNTY_LABELS.map(
          (label) => html`
            <span class="amount" style="bottom: ${label.bottom}px; left: ${label.left}px;">
              ${caseCount(areas, label.id)}
            </span>
          `,
        )}
        <svg width="${MAP_WIDTH}" height="${MAP_HEIGHT}" viewBox="${MAP_VIEW_BOX}" version="1.1">
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
    this.selected = id;
  }

  private text(key: string, replacements?: Record<string, string>): string {
    const language = this.hass?.locale?.language ?? this.hass?.language ?? browserLanguage();
    return translate(language, key, replacements);
  }

  static get styles(): CSSResultGroup {
    return css`
      .map {
        display: inline-block;
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

      .map path {
        cursor: pointer;
      }

      .amount {
        color: var(--primary-text-color);
        font-size: 9px;
        position: absolute;
        text-shadow: 1px 1px 2px black;
      }

      .right-pane {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 240px);
        margin-top: 50px;
      }

      .thl-logo {
        display: flex;
        height: 40px;
      }

      .disease-logo-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 10px;
      }

      .disease-logo {
        height: 50px;
        width: 50px;
      }

      .stats-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 10px;
      }

      .stats-title {
        font-weight: 600;
        margin-top: 10px;
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
