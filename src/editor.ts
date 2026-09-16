/**
 * The card's visual editor: picks the disease sensor and, if wanted, a fixed
 * width for the map. Home Assistant provides ha-form and the selectors.
 */
import { LitElement, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant } from './hass';
import { browserLanguage, translate } from './localize/localize';
import type { ThlCardConfig } from './types';

interface SchemaEntry {
  name: string;
}

const SCHEMA = [
  {
    name: 'entity',
    required: true,
    selector: { entity: { domain: 'sensor', integration: 'thl' } },
  },
  {
    name: 'map_width',
    selector: { number: { min: 120, max: 600, step: 5, unit_of_measurement: 'px', mode: 'box' } },
  },
];

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
        .data=${this.config}
        .schema=${SCHEMA}
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
