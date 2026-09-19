/**
 * A dashboard card for the thl integration: the weekly numbers of one disease,
 * or of the flu-like illness visits, drawn on a map of Finland. Each wellbeing
 * services county is coloured by how it compares with the whole country, or by
 * how its cases changed from the week before. Clicking a county shows its own
 * figures and trend under the map.
 */
import { LitElement, css, html, nothing, svg } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { caseCount, fillColor, findArea, isVisits, level } from './areas';
import { cardEntities } from './editor';
import { CARD_VERSION, WHOLE_COUNTRY } from './const';
import type { HomeAssistant } from './hass';
import { browserLanguage, translate } from './localize/localize';
import { DISEASE_LOGO } from './logos';
import { COUNTIES, MAP_GROUP_TRANSFORM, MAP_HEIGHT, MAP_VIEW_BOX, MAP_WIDTH, OUTLINES } from './map/counties';
import type { CountyShape, Outline } from './map/counties';
import { COUNTY_LABELS } from './map/labels';
import { fetchTrend, isoWeek } from './trend';
import type { TrendPoint } from './trend';
import type { Area, ColorBy, ThlCardConfig } from './types';

/** The trend covers six months, which is what the integration keeps of the past when a sensor is new. */
const TREND_WEEKS = 26;

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
  @state() private trend: TrendPoint[] = [];
  /** The point of the trend the pointer is over. */
  @state() private hovered?: number;
  /** What the trend shown was fetched for, so it is fetched again only when that changes. */
  private trendKey?: string;

  public static getConfigElement(): HTMLElement {
    return document.createElement('thl-card-editor');
  }

  /** Offers the first disease of the thl integration when the card is added from the picker. */
  public static getStubConfig(hass?: HomeAssistant): Record<string, unknown> {
    return { entity: (hass ? cardEntities(hass)[0] : undefined) ?? '' };
  }

  public setConfig(config: ThlCardConfig): void {
    if (!config || !config.entity) {
      throw new Error(translate(browserLanguage(), 'invalid_configuration'));
    }
    // The default county is chosen whenever the card loads or its configuration changes.
    if (this.config?.default_area !== config.default_area || this.config === undefined) {
      this.selected = config.default_area || undefined;
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
    if (
      changed.has('config') ||
      changed.has('selected') ||
      changed.has('trend') ||
      changed.has('hovered') ||
      !this.config
    ) {
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
    const title = selected?.name ?? this.text('whole_country');

    return html`
      <ha-card>
        <div class="card ${this.wide ? 'wide' : ''}">
          <div class="disease">
            ${DISEASE_LOGO}
            <span class="disease-name">${this.name(entity.attributes)}</span>
          </div>
          <div class="body">
            ${this.map(areas, whole)}
            <div class="side">
              <div class="figures">
                ${isVisits(areas) ? this.visits(title, selected ?? whole) : this.stats(title, selected ?? whole)}
              </div>
            </div>
          </div>
          ${this.trendLine()}
        </div>
      </ha-card>
    `;
  }

  protected updated(): void {
    void this.refreshTrend();
  }

  /** The disease, or the flu-like illness visits, which have no disease and go by their sensor's name. */
  private name(attributes: Record<string, unknown>): string {
    const disease = attributes.disease_name as string | undefined;
    return disease ?? String(attributes.friendly_name ?? '').replace(/^THL\s+/, '');
  }

  /**
   * A card a whole section wide puts its figures beside the map, over the sea west of it, so it isn't
   * taller than it needs to be. Narrower cards keep them under the map. A card not resized is as wide
   * as the section.
   */
  private get wide(): boolean {
    const columns = (this.config?.grid_options as { columns?: number | string } | undefined)?.columns ?? 12;
    return columns === 'full' || Number(columns) >= 12;
  }

  private get colorBy(): ColorBy {
    return this.config?.color_by ?? 'level';
  }

  private map(areas: Area[], whole: Area | undefined): TemplateResult {
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
            ${COUNTIES.map((county) => this.county(county, areas, whole))}
          </g>
          <g style="display:inline" transform="${MAP_GROUP_TRANSFORM}">
            ${OUTLINES.filter((outline) => outline.layer === 'over').map((outline) => this.outline(outline))}
          </g>
        </svg>
      </div>
    `;
  }

  private county(county: CountyShape, areas: Area[], whole: Area | undefined) {
    return svg`<path
      d="${county.d}"
      transform="${ifDefined(county.transform)}"
      style="display:inline;fill:${fillColor(findArea(areas, county.id), this.colorBy, whole)}"
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
          area.incidence_last_week === undefined
            ? nothing
            : html`<span class="stats">
                ${this.text('incidence')}: ${this.number(area.incidence_last_week, 1)} / 100 000
              </span>`
        }
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

  /** The figures of the flu-like illness visits: their share of all visits, and how many there were. */
  private visits(title: string, area: Area | undefined): TemplateResult | typeof nothing {
    if (area === undefined) {
      return nothing;
    }
    const share = (value: number | null | undefined) =>
      value === null || value === undefined ? '–' : `${this.number(value, 3)} %`;
    return html`
      <div class="stats-container">
        <span class="stats-title">${title}</span>
        <span class="stats">${this.text('last_week')}: ${share(area.share_last_week)}</span>
        ${
          area.visits_last_week === undefined
            ? nothing
            : html`<span class="stats">
                ${this.text('visits')}: ${this.number(area.visits_last_week, 0)} /
                ${this.number(area.all_visits_last_week ?? 0, 0)}
              </span>`
        }
        ${
          area.share_two_weeks_ago === undefined
            ? nothing
            : html`<span class="stats"
                >${this.text('two_weeks_ago')}: ${share(area.share_two_weeks_ago)}</span
              >`
        }
      </div>
    `;
  }

  /** The chosen area's figure over the past weeks, as a line under its figures. Pointing at it shows a week. */
  private trendLine(): TemplateResult | typeof nothing {
    if (this.config?.show_trend === false || this.trend.length < 2) {
      return nothing;
    }
    const values = this.trend.map((point) => point.value);
    const highest = Math.max(...values);
    const top = highest > 0 ? highest : 1;
    const x = (index: number) => (index / (values.length - 1)) * 100;
    const y = (value: number) => 28 - (value / top) * 26;
    const points = values.map((value, index) => `${x(index).toFixed(2)},${y(value).toFixed(2)}`).join(' ');
    const digits = isVisits(this.areas()) ? 3 : 1;
    const marked = this.hovered ?? values.length - 1;
    // The dot and the bubble sit over the drawing, so the stretched line doesn't stretch them.
    const at = `left: ${x(marked).toFixed(2)}%; top: ${((y(values[marked]) / 30) * 100).toFixed(2)}%;`;

    return html`
      <div class="trend">
        <div
          class="trend-plot"
          @pointermove=${(event: PointerEvent) => this.hover(event)}
          @pointerleave=${() => (this.hovered = undefined)}
        >
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" role="img" aria-label="${this.text('trend')}">
            <polyline class="trend-area" points="0,30 ${points} 100,30" />
            <polyline class="trend-line" points="${points}" vector-effect="non-scaling-stroke" />
          </svg>
          <span class="trend-dot ${this.hovered === undefined ? '' : 'hovered'}" style="${at}"></span>
          ${
            this.hovered === undefined
              ? nothing
              : html`<span class="trend-bubble" style="left: ${x(marked).toFixed(2)}%;">
                  ${this.text('week_short')} ${this.dataWeek(marked)}: ${this.number(values[marked], digits)}
                </span>`
          }
        </div>
        <span class="trend-caption">
          ${this.text('trend_caption', { weeks: String(values.length) })} · ${this.text('highest')}
          ${this.number(highest, digits)}
        </span>
      </div>
    `;
  }

  private hover(event: PointerEvent): void {
    const plot = event.currentTarget as HTMLElement;
    const box = plot.getBoundingClientRect();
    if (box.width === 0 || this.trend.length < 2) {
      return;
    }
    const fraction = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1);
    this.hovered = Math.round(fraction * (this.trend.length - 1));
  }

  /**
   * The week a point's figure is from. A figure is shown from the week after its own, so a point is the
   * week before the one it sits in; the newest point is the figure the sensor shows now.
   */
  private dataWeek(index: number): number {
    if (index === this.trend.length - 1) {
      const week = Number(this.hass?.states[this.config?.entity ?? '']?.attributes.last_week);
      if (Number.isFinite(week)) {
        return week;
      }
    }
    return isoWeek(this.trend[index].week - 7 * 24 * 60 * 60 * 1000);
  }

  /** The sensor the trend is drawn from: the level for colouring by level, the cases otherwise. */
  private trendSource(): string | undefined {
    const areas = this.areas();
    const area = findArea(areas, this.selected ?? WHOLE_COUNTRY);
    if (area === undefined) {
      return undefined;
    }
    const byLevel = this.colorBy === 'level' && level(area) !== undefined;
    return (byLevel && area.incidence_entity_id) || area.entity_id || undefined;
  }

  private async refreshTrend(): Promise<void> {
    if (!this.hass || !this.config || this.config.show_trend === false) {
      return;
    }
    const source = this.trendSource();
    const weeks = TREND_WEEKS;
    const week = String(this.hass.states[this.config.entity]?.attributes.last_week ?? '');
    const key = `${source}|${weeks}|${week}`;
    if (key === this.trendKey) {
      return;
    }
    this.trendKey = key;
    this.hovered = undefined;
    if (source === undefined) {
      this.trend = [];
      return;
    }
    try {
      const points = await fetchTrend(this.hass, source, weeks);
      // A newer request may have been made while this one was on its way.
      if (this.trendKey === key) {
        this.trend = points;
      }
    } catch {
      this.trend = [];
    }
  }

  private areas(): Area[] {
    const entity = this.config ? this.hass?.states[this.config.entity] : undefined;
    return (entity?.attributes.values as Area[] | undefined) ?? [];
  }

  private number(value: number, digits: number): string {
    return new Intl.NumberFormat(this.language(), { maximumFractionDigits: digits }).format(value);
  }

  private message(text: string): TemplateResult {
    return html`<ha-card><div class="message">${text}</div></ha-card>`;
  }

  private select(id: string): void {
    // Clicking the county that is already chosen goes back to the whole country.
    this.selected = this.selected === id ? undefined : id;
  }

  private text(key: string, replacements?: Record<string, string>): string {
    return translate(this.language(), key, replacements);
  }

  private language(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? browserLanguage();
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

      .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: 100%;
      }

      .side {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: 100%;
      }

      /* A whole section wide: the map to the right, the figures over the sea west of it. */
      .wide .body {
        position: relative;
        align-items: flex-end;
      }

      .wide .map {
        width: min(68%, 300px);
      }

      .wide .side {
        position: absolute;
        left: 0;
        top: 30%;
        width: 50%;
        align-items: flex-start;
        /* Only the figures take the pointer; the counties under the rest stay clickable. */
        pointer-events: none;
      }

      .wide .side > * {
        pointer-events: auto;
      }

      .wide.card {
        padding: 12px 25px;
      }

      .wide .disease {
        font-size: clamp(11px, 5.5cqw, 20px);
      }

      .wide .trend {
        width: 100%;
      }

      .wide .figures {
        justify-content: flex-start;
      }

      .wide .stats-container {
        align-items: flex-start;
        text-align: left;
      }

      .trend {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        width: min(100%, 300px);
      }

      .trend-plot {
        position: relative;
        width: 100%;
        height: 40px;
        cursor: crosshair;
      }

      .trend svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .trend-dot {
        position: absolute;
        width: 6px;
        height: 6px;
        margin: -3px 0 0 -3px;
        border-radius: 50%;
        background: var(--primary-color);
        pointer-events: none;
      }

      .trend-dot.hovered {
        width: 8px;
        height: 8px;
        margin: -4px 0 0 -4px;
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      }

      .trend-bubble {
        position: absolute;
        bottom: calc(100% + 4px);
        transform: translateX(-50%);
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--primary-text-color);
        color: var(--card-background-color, #fff);
        font-size: 11px;
        white-space: nowrap;
        pointer-events: none;
      }

      .trend-line {
        fill: none;
        stroke: var(--primary-color);
        stroke-width: 2;
        stroke-linejoin: round;
      }

      .trend-area {
        fill: var(--primary-color);
        opacity: 0.15;
        stroke: none;
      }

      .trend-caption {
        font-size: 11px;
        color: var(--secondary-text-color);
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
