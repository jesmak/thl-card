import { beforeEach, describe, expect, it } from 'vitest';

import '../src/editor';
import type { ThlCardEditor } from '../src/editor';
import type { HomeAssistant } from '../src/hass';
import type { ThlCardConfig } from '../src/types';

const hass: HomeAssistant = { locale: { language: 'fi' }, states: {} };

async function editor(config: Partial<ThlCardConfig> = {}): Promise<ThlCardEditor> {
  const element = document.createElement('thl-card-editor') as ThlCardEditor;
  element.setConfig({ type: 'custom:thl-card', entity: 'sensor.thl_influenssa', ...config } as ThlCardConfig);
  element.hass = hass;
  document.body.append(element);
  await element.updateComplete;
  return element;
}

function form(
  element: ThlCardEditor,
): HTMLElement & { schema: Array<Record<string, unknown>>; data: unknown } {
  const found = element.shadowRoot?.querySelector('ha-form');
  if (!found) {
    throw new Error('the editor rendered no form');
  }
  return found as HTMLElement & { schema: Array<Record<string, unknown>>; data: unknown };
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('the visual editor', () => {
  it('asks for a disease sensor of the thl integration', async () => {
    const [entity] = form(await editor()).schema;
    expect(entity.name).toBe('entity');
    expect(entity.required).toBe(true);
    expect(entity.selector).toEqual({ entity: { domain: 'sensor', integration: 'thl' } });
  });

  it('offers a width for the map', async () => {
    const [, width] = form(await editor()).schema;
    expect(width.name).toBe('map_width');
  });

  it('shows the configuration it was given', async () => {
    expect(form(await editor({ map_width: 300 })).data).toMatchObject({
      entity: 'sensor.thl_influenssa',
      map_width: 300,
    });
  });

  it('names the fields in the viewer’s language', async () => {
    const element = await editor();
    const compute = (form(element) as unknown as { computeLabel(entry: { name: string }): string })
      .computeLabel;
    expect(compute({ name: 'entity' })).toBe('Tauti');
    expect(compute({ name: 'map_width' })).toBe('Kartan leveys');
  });

  it('passes on what the user changed', async () => {
    const element = await editor();
    const changes: ThlCardConfig[] = [];
    element.addEventListener('config-changed', (event) => {
      changes.push((event as CustomEvent<{ config: ThlCardConfig }>).detail.config);
    });

    form(element).dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: { type: 'custom:thl-card', entity: 'sensor.thl_norovirus', map_width: 320 } },
      }),
    );

    expect(changes).toHaveLength(1);
    expect(changes[0]).toEqual({ type: 'custom:thl-card', entity: 'sensor.thl_norovirus', map_width: 320 });
  });

  it('drops an emptied width, so the map follows the card again', async () => {
    const element = await editor({ map_width: 320 });
    const changes: ThlCardConfig[] = [];
    element.addEventListener('config-changed', (event) => {
      changes.push((event as CustomEvent<{ config: ThlCardConfig }>).detail.config);
    });

    form(element).dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: { type: 'custom:thl-card', entity: 'sensor.thl_influenssa', map_width: '' } },
      }),
    );

    expect(changes[0]).not.toHaveProperty('map_width');
  });
});
