/**
 * The card's visual editor: picks the sensor, how the counties are coloured,
 * the trend, and if wanted a fixed width for the map. Home Assistant provides
 * ha-form and the selectors.
 */
import { LitElement, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant } from './hass';
import { browserLanguage, translate } from './localize/localize';
import { WHOLE_COUNTRY } from './const';
import type { Area, ThlCardConfig } from './types';

interface SchemaEntry {
  name: string;
}

const DEFAULTS: Record<string, unknown> = { color_by: 'level', show_trend: true };

/**
 * The sensors the card can show: the whole country's sensor of each disease, and of the flu-like illness
 * visits. They are the ones that carry every area; the integration's county sensors don't.
 */
export function cardEntities(hass: HomeAssistant): string[] {
  return Object.values(hass.states)
    .filter((entity) => entity !== undefined && entity.entity_id.startsWith('sensor.'))
    .filter(
      (entity) =>
        Array.isArray(entity?.attributes.values) && String(entity?.attributes.attribution).includes('THL'),
    )
    .map((entity) => entity!.entity_id)
    .sort();
}

/** The counties of the chosen sensor, by name, to pick the default from. The empty choice is the whole country. */
function countyOptions(hass: HomeAssistant, entity: string, text: (key: string) => string) {
  const values = (hass.states[entity]?.attributes.values as Area[] | undefined) ?? [];
  const counties = values
    .filter((area) => area.area_id !== WHOLE_COUNTRY)
    .map((area) => ({ value: area.area_id, label: area.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return [{ value: '', label: text('whole_country') }, ...counties];
}

function schema(hass: HomeAssistant, entity: string, text: (key: string) => string) {
  return [
    {
      name: 'entity',
      required: true,
      selector: { entity: { domain: 'sensor', integration: 'thl', include_entities: cardEntities(hass) } },
    },
    {
      name: 'color_by',
      selector: {
        select: {
          mode: 'dropdown',
          options: [
            { value: 'level', label: text('color_by_level') },
            { value: 'change', label: text('color_by_change') },
          ],
        },
      },
    },
    {
      name: 'default_area',
      selector: { select: { mode: 'dropdown', options: countyOptions(hass, entity, text) } },
    },
    { name: 'show_trend', selector: { boolean: {} } },
    {
      name: 'map_width',
      selector: { number: { min: 120, max: 600, step: 5, unit_of_measurement: 'px', mode: 'box' } },
    },
  ];
}

@customElement('thl-card-editor')
export class ThlCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config: ThlCardConfig = { type: 'custom:thl-card', entity: '' };

  public setConfig(config: ThlCardConfig): void {
    this.config = { ...config };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...DEFAULTS, ...this.config }}
        .schema=${schema(this.hass, this.config.entity, (key) => this.text(key))}
        .computeLabel=${(entry: SchemaEntry) => this.text(entry.name)}
        .computeHelper=${(entry: SchemaEntry) => this.helper(entry.name)}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private valueChanged(event: CustomEvent<{ value: ThlCardConfig }>): void {
    const config: ThlCardConfig = { ...event.detail.value };

    // An empty width means the map follows the size of the card.
    if (config.map_width === undefined || config.map_width === null || String(config.map_width) === '') {
      delete config.map_width;
    }
    // No default county means the whole country.
    if (!config.default_area) {
      delete config.default_area;
    }
    // The defaults are shown in the form but left out of the configuration, so it stays short.
    for (const [key, value] of Object.entries(DEFAULTS)) {
      if (config[key] === value) {
        delete config[key];
      }
    }

    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
  }

  private text(key: string): string {
    return translate(this.language(), key);
  }

  private helper(key: string): string | undefined {
    const helper = translate(this.language(), `${key}_helper`);
    return helper === `${key}_helper` ? undefined : helper;
  }

  private language(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? browserLanguage();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'thl-card-editor': ThlCardEditor;
  }
}
