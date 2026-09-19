import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../src/thl-card';
import type { ThlCard } from '../src/thl-card';
import { FALLING_FAST, NO_CASES, NO_DATA, RISING_FAST } from '../src/areas';
import type { HomeAssistant } from '../src/hass';
import type { Area } from '../src/types';

const ENTITY = 'sensor.thl_influenssa';

const AREAS: Area[] = [
  {
    area_id: 'finland',
    name: 'Kaikki hyvinvointialueet',
    amount_last_week: 17,
    amount_two_weeks_ago: 20,
    change_in_numbers: -3,
    change_percentage: '-15',
  },
  {
    area_id: 'lapin_hyvinvointialue',
    name: 'Lapin hyvinvointialue',
    amount_last_week: 2,
    amount_two_weeks_ago: 0,
    change_in_numbers: 2,
    change_percentage: 0,
  },
  {
    area_id: 'ahvenanmaa',
    name: 'Ahvenanmaa',
    amount_last_week: 0,
    amount_two_weeks_ago: 0,
    change_in_numbers: 0,
    change_percentage: 0,
  },
  {
    area_id: 'kainuun_hyvinvointialue',
    name: 'Kainuun hyvinvointialue',
    amount_last_week: 0,
    amount_two_weeks_ago: 9,
    change_in_numbers: -9,
    change_percentage: '-100',
  },
  {
    area_id: 'pirkanmaan_hyvinvointialue',
    name: 'Pirkanmaan hyvinvointialue',
    amount_last_week: 9,
    amount_two_weeks_ago: 2,
    change_in_numbers: 7,
    change_percentage: '350',
  },
];

function hass(overrides: Partial<{ state: string; values: Area[] }> = {}): HomeAssistant {
  return {
    locale: { language: 'fi' },
    states: {
      [ENTITY]: {
        entity_id: ENTITY,
        state: overrides.state ?? '17',
        attributes: {
          disease_name: 'Influenssa',
          last_week: 37,
          values: overrides.values ?? AREAS,
        },
      },
    },
  };
}

async function card(
  state: HomeAssistant,
  config: Record<string, unknown> = { entity: ENTITY },
): Promise<ThlCard> {
  const element = document.createElement('thl-card') as ThlCard;
  element.setConfig({ type: 'custom:thl-card', ...config } as never);
  element.hass = state;
  document.body.append(element);
  await element.updateComplete;
  return element;
}

function shadow(element: ThlCard): ShadowRoot {
  const root = element.shadowRoot;
  if (!root) {
    throw new Error('the card rendered nothing');
  }
  return root;
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('the map', () => {
  it('draws every county and both outlines', async () => {
    const root = shadow(await card(hass()));
    expect(root.querySelectorAll('.map svg path')).toHaveLength(25);
    expect(root.querySelector('#lapin_hyvinvointialue')).not.toBeNull();
    expect(root.querySelector('#ahvenanmaa')).not.toBeNull();
  });

  it('writes each county’s cases on the map', async () => {
    const root = shadow(await card(hass()));
    const labels = [...root.querySelectorAll('.amount')].map((span) => span.textContent?.trim());
    expect(labels).toHaveLength(23);
    expect(labels).toContain('2');
    // Counties the sensor carries no numbers for are left blank, not "undefined".
    expect(labels.filter((text) => text === '')).not.toHaveLength(0);
    expect(labels.some((text) => text?.includes('undefined'))).toBe(false);
  });

  it('colours counties by how their numbers changed', async () => {
    const root = shadow(await card(hass()));
    const fill = (id: string) => root.querySelector(`#${id}`)?.getAttribute('style');
    expect(fill('kainuun_hyvinvointialue')).toContain(FALLING_FAST);
    expect(fill('pirkanmaan_hyvinvointialue')).toContain(RISING_FAST);
    expect(fill('ahvenanmaa')).toContain(NO_CASES);
    // A county the sensor doesn't carry at all.
    expect(fill('satakunnan_hyvinvointialue')).toContain(NO_DATA);
  });

  it('keeps the transform of the shapes that have one', async () => {
    const root = shadow(await card(hass()));
    expect(root.querySelector('#lapin_hyvinvointialue')?.getAttribute('transform')).toBeNull();
    expect(root.querySelector('#ahvenanmaa')?.getAttribute('transform')).toBe(
      'translate(-528.85372,-914.75602)',
    );
  });
});

describe('the size of the card', () => {
  it('lets the map scale with the card instead of fixing it in pixels', async () => {
    const root = shadow(await card(hass()));
    const svg = root.querySelector('.map svg') as SVGElement;
    expect(svg.getAttribute('width')).toBeNull();
    expect(svg.getAttribute('height')).toBeNull();
    expect(svg.getAttribute('viewBox')).toBe('0 0 1667.6923 2897.9419');
    expect((root.querySelector('.map') as HTMLElement).getAttribute('style')).toContain(
      'aspect-ratio: 235 / 409',
    );
  });

  it('places the numbers in proportion, so they scale with the map', async () => {
    const root = shadow(await card(hass()));
    const styles = [...root.querySelectorAll('.amount')].map((span) => span.getAttribute('style') ?? '');
    expect(styles.every((style) => style.includes('%'))).toBe(true);
    expect(styles.some((style) => style.includes('px'))).toBe(false);
    // Lapland sat at 300px from the bottom of a 409px map, and 140px from its left edge.
    expect(styles).toContain('bottom: 73.350%; left: 59.574%;');
  });

  it('fixes the map at the width the configuration asks for', async () => {
    const root = shadow(await card(hass(), { entity: ENTITY, map_width: 320 }));
    const style = (root.querySelector('.map') as HTMLElement).getAttribute('style') ?? '';
    expect(style).toContain('width: 320px');
    expect(style).toContain('max-width: 100%');
  });

  it('offers a visual editor', async () => {
    const { ThlCard } = await import('../src/thl-card');
    const element = ThlCard.getConfigElement();
    expect(element.tagName.toLowerCase()).toBe('thl-card-editor');
  });
});

describe('the shape of the card', () => {
  it('is never squeezed below half a section', () => {
    const element = document.createElement('thl-card') as ThlCard;
    expect(element.getGridOptions()).toEqual({ columns: 12, rows: 'auto', min_columns: 6 });
  });

  it('groups the figures, so they can sit in a row or a column', async () => {
    const root = shadow(await card(hass()));
    expect(root.querySelector('.figures')).not.toBeNull();
    expect(root.querySelectorAll('.figures .stats-container')).toHaveLength(1);
  });

  it('names the disease above the map, with the figures after it', async () => {
    const root = shadow(await card(hass()));
    const children = [...(root.querySelector('.card')?.children ?? [])].map((child) => child.className);
    expect(children).toEqual(['disease', 'body']);
    const body = [...(root.querySelector('.body')?.children ?? [])].map((child) => child.className);
    expect(body).toEqual(['map', 'side']);
  });

  it('puts the figures beside the map when the card is a whole section wide', async () => {
    expect(
      shadow(await card(hass()))
        .querySelector('.card')
        ?.classList.contains('wide'),
    ).toBe(true);
    const full = await card(hass(), { entity: ENTITY, grid_options: { columns: 'full' } });
    expect(shadow(full).querySelector('.card')?.classList.contains('wide')).toBe(true);
  });

  it('keeps the figures under the map in a narrower card', async () => {
    const root = shadow(await card(hass(), { entity: ENTITY, grid_options: { columns: 9 } }));
    expect(root.querySelector('.card')?.classList.contains('wide')).toBe(false);
  });

  it('keeps the disease name with its drawing', async () => {
    const root = shadow(await card(hass()));
    const disease = root.querySelector('.disease');
    expect(disease?.querySelector('.disease-logo')).not.toBeNull();
    expect(disease?.querySelector('.disease-name')?.textContent?.trim()).toBe('Influenssa');
  });

  it('keeps the disease on one line and the map within bounds', async () => {
    const { ThlCard } = await import('../src/thl-card');
    const styles = String((ThlCard as unknown as { styles: { cssText: string } }).styles.cssText);
    expect(styles).toContain('white-space: nowrap');
    // The drawing and the gap are tied to the name's size, not scaled on their own.
    expect(styles).toContain('width: 1.7em');
    expect(styles).toContain('gap: 0.5em');
    // A number must never swallow the click meant for the county under it.
    expect(styles).toContain('pointer-events: none');
    expect(styles).toContain('width: min(100%, 300px)');
    expect(styles).not.toContain('@container card');
  });
});

describe('the drawings', () => {
  it('draws the virus', async () => {
    const root = shadow(await card(hass()));
    expect(root.querySelectorAll('.disease-logo path')).toHaveLength(35);
  });
});

describe('the figures beside the map', () => {
  it('start with the whole country', async () => {
    const root = shadow(await card(hass()));
    const [whole] = root.querySelectorAll('.stats-container');
    expect(whole.querySelector('.stats-title')?.textContent).toContain('Koko maa');
    expect(whole.textContent).toContain('Viime viikko: 17');
    expect(whole.textContent).toContain('Toissa viikko: 20');
    expect(whole.textContent).toContain('-15%');
  });

  it('name the disease', async () => {
    const root = shadow(await card(hass()));
    expect(root.textContent).toContain('Influenssa');
  });

  it('show the chosen county instead of the whole country', async () => {
    const element = await card(hass());
    const root = shadow(element);
    expect(root.querySelectorAll('.stats-container')).toHaveLength(1);
    expect(root.querySelector('.stats-title')?.textContent).toContain('Koko maa');

    (root.querySelector('#kainuun_hyvinvointialue') as SVGElement).dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(root.querySelectorAll('.stats-container')).toHaveLength(1);
    expect(root.querySelector('.stats-title')?.textContent).toContain('Kainuun hyvinvointialue');
    expect(root.querySelector('.stats-container')?.textContent).toContain('Viime viikko: 0');
  });

  it('start with the default county when one is set', async () => {
    const element = await card(hass(), { entity: ENTITY, default_area: 'kainuun_hyvinvointialue' });
    const root = shadow(element);
    expect(root.querySelector('.stats-title')?.textContent).toContain('Kainuun hyvinvointialue');
    expect(root.querySelector('#kainuun_hyvinvointialue')?.classList.contains('selected')).toBe(true);

    (root.querySelector('#kainuun_hyvinvointialue') as SVGElement).dispatchEvent(new Event('click'));
    await element.updateComplete;
    expect(root.querySelector('.stats-title')?.textContent).toContain('Koko maa');
  });

  it('go back to the whole country when the same county is clicked again', async () => {
    const element = await card(hass());
    const root = shadow(element);
    const county = root.querySelector('#kainuun_hyvinvointialue') as SVGElement;

    county.dispatchEvent(new Event('click'));
    await element.updateComplete;
    county.dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(root.querySelectorAll('.stats-container')).toHaveLength(1);
    expect(root.querySelector('.stats-title')?.textContent).toContain('Koko maa');
  });

  it('leave out the change when THL has not published the week before', async () => {
    const values: Area[] = [{ area_id: 'finland', name: 'Kaikki hyvinvointialueet', amount_last_week: 17 }];
    const root = shadow(await card(hass({ values })));
    const [whole] = root.querySelectorAll('.stats-container');
    expect(whole.textContent).toContain('Viime viikko: 17');
    expect(whole.textContent).not.toContain('Toissa viikko');
    expect(whole.textContent).not.toContain('undefined');
  });
});

describe('when there is nothing to show', () => {
  it('says so when the entity does not exist', async () => {
    const root = shadow(await card({ states: {}, locale: { language: 'fi' } }));
    expect(root.textContent).toContain(ENTITY);
    expect(root.querySelector('svg')).toBeNull();
  });

  it('says so when the sensor is unavailable', async () => {
    const root = shadow(await card(hass({ state: 'unavailable' })));
    expect(root.querySelector('.message')?.textContent?.trim()).toBe(
      'Tautien lukumäärät eivät ole saatavilla.',
    );
  });

  it('refuses a configuration without an entity', () => {
    const element = document.createElement('thl-card') as ThlCard;
    expect(() => element.setConfig({ type: 'custom:thl-card' } as never)).toThrow();
  });
});

describe('by level and with a trend', () => {
  const LEVELS: Area[] = [
    {
      area_id: 'finland',
      name: 'Kaikki hyvinvointialueet',
      amount_last_week: 17,
      incidence_last_week: 0.3,
      entity_id: ENTITY,
      incidence_entity_id: 'sensor.thl_influenssa_ilmaantuvuus',
    },
    {
      area_id: 'lapin_hyvinvointialue',
      name: 'Lapin hyvinvointialue',
      amount_last_week: 2,
      incidence_last_week: 1.1,
      entity_id: 'sensor.thl_influenssa_lappi',
      incidence_entity_id: 'sensor.thl_influenssa_lappi_ilmaantuvuus',
    },
    { area_id: 'ahvenanmaa', name: 'Ahvenanmaa', amount_last_week: 0, incidence_last_week: 0 },
  ];

  function withTrend(values: Area[] = LEVELS) {
    const callWS = vi.fn().mockImplementation(async (message: { statistic_ids: string[] }) => ({
      [message.statistic_ids[0]]: [0, 1, 2].map((week) => ({
        start: Date.now() - (2 - week) * 7 * 24 * 60 * 60 * 1000,
        mean: week,
      })),
    }));
    return { state: { ...hass({ values }), callWS } as HomeAssistant, callWS };
  }

  async function settled(element: ThlCard): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await element.updateComplete;
  }

  it('colours a county by how it compares with the whole country', async () => {
    const root = shadow(await card(hass({ values: LEVELS })));
    const fill = (id: string) => root.querySelector(`#${id}`)?.getAttribute('style');
    expect(fill('lapin_hyvinvointialue')).toContain(RISING_FAST);
    expect(fill('ahvenanmaa')).toContain(NO_CASES);
  });

  it('shows the incidence with the cases', async () => {
    const root = shadow(await card(hass({ values: LEVELS })));
    expect(root.querySelector('.stats-container')?.textContent).toContain('Ilmaantuvuus: 0,3 / 100 000');
  });

  it('draws the trend of the whole country’s incidence, then of the chosen county', async () => {
    const { state, callWS } = withTrend();
    const element = await card(state);
    await settled(element);
    const root = shadow(element);

    expect(callWS.mock.calls[0][0].statistic_ids).toEqual(['sensor.thl_influenssa_ilmaantuvuus']);
    expect(root.querySelector('.trend polyline.trend-line')).not.toBeNull();
    expect(root.querySelector('.trend-caption')?.textContent).toContain('3 viikkoa');

    (root.querySelector('#lapin_hyvinvointialue') as SVGElement).dispatchEvent(new Event('click'));
    await settled(element);
    expect(callWS.mock.calls.at(-1)?.[0].statistic_ids).toEqual(['sensor.thl_influenssa_lappi_ilmaantuvuus']);
  });

  it('covers six months, and names the week and figure the pointer is at', async () => {
    const { state, callWS } = withTrend();
    const element = await card(state);
    await settled(element);
    const root = shadow(element);
    const start = new Date(callWS.mock.calls[0][0].start_time).getTime();
    expect(Math.round((Date.now() - start) / (7 * 24 * 60 * 60 * 1000))).toBeGreaterThanOrEqual(26);

    const plot = root.querySelector('.trend-plot') as HTMLElement;
    plot.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, height: 40 }) as DOMRect;
    plot.dispatchEvent(new PointerEvent('pointermove', { clientX: 49 }));
    await element.updateComplete;
    expect(root.querySelector('.trend-bubble')?.textContent?.replace(/\s+/g, ' ').trim()).toMatch(
      /^Vk \d+: 1$/,
    );

    plot.dispatchEvent(new PointerEvent('pointerleave'));
    await element.updateComplete;
    expect(root.querySelector('.trend-bubble')).toBeNull();
  });

  it('names the newest point by the week the sensor shows', async () => {
    const { state } = withTrend();
    const element = await card(state);
    await settled(element);
    const plot = shadow(element).querySelector('.trend-plot') as HTMLElement;
    plot.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, height: 40 }) as DOMRect;
    plot.dispatchEvent(new PointerEvent('pointermove', { clientX: 100 }));
    await element.updateComplete;
    expect(shadow(element).querySelector('.trend-bubble')?.textContent).toContain('Vk 37: 2');
  });

  it('draws the cases when colouring by change', async () => {
    const { state, callWS } = withTrend();
    await settled(await card(state, { entity: ENTITY, color_by: 'change' }));
    expect(callWS.mock.calls[0][0].statistic_ids).toEqual([ENTITY]);
  });

  it('draws no trend when asked not to', async () => {
    const { state, callWS } = withTrend();
    const element = await card(state, { entity: ENTITY, show_trend: false });
    await settled(element);
    expect(callWS).not.toHaveBeenCalled();
    expect(shadow(element).querySelector('.trend')).toBeNull();
  });

  it('does not ask again when nothing it depends on changed', async () => {
    const { state, callWS } = withTrend();
    const element = await card(state);
    await settled(element);
    element.hass = { ...state, states: { ...state.states } };
    await settled(element);
    expect(callWS).toHaveBeenCalledTimes(1);
  });
});

describe('the flu-like illness visits', () => {
  const VISITS: Area[] = [
    {
      area_id: 'finland',
      name: 'Kaikki alueet',
      share_last_week: 0.0125,
      share_two_weeks_ago: 0.011,
      visits_last_week: 250,
      all_visits_last_week: 2000000,
      entity_id: 'sensor.thl_influenssankaltaiset_kaynnit',
    },
    {
      area_id: 'lapin_hyvinvointialue',
      name: 'Lapin hyvinvointialue',
      share_last_week: 0.05,
      visits_last_week: 12,
      all_visits_last_week: 24000,
    },
  ];

  function visits(): HomeAssistant {
    return {
      locale: { language: 'fi' },
      states: {
        'sensor.thl_influenssankaltaiset_kaynnit': {
          entity_id: 'sensor.thl_influenssankaltaiset_kaynnit',
          state: '0.0125',
          attributes: { friendly_name: 'THL Influenssankaltaiset käynnit', last_week: 37, values: VISITS },
        },
      },
    };
  }

  it('are named after their sensor', async () => {
    const root = shadow(await card(visits(), { entity: 'sensor.thl_influenssankaltaiset_kaynnit' }));
    expect(root.querySelector('.disease-name')?.textContent?.trim()).toBe('Influenssankaltaiset käynnit');
  });

  it('show the share of visits and how many there were', async () => {
    const root = shadow(await card(visits(), { entity: 'sensor.thl_influenssankaltaiset_kaynnit' }));
    const figures = root.querySelector('.stats-container')?.textContent?.replace(/\s+/g, ' ');
    expect(figures).toContain('Viime viikko: 0,013 %');
    expect(figures).toContain('Käynnit: 250 / 2 000 000');
    expect(figures).toContain('Toissa viikko: 0,011 %');
  });

  it('write the visits on the map and colour by the share', async () => {
    const root = shadow(await card(visits(), { entity: 'sensor.thl_influenssankaltaiset_kaynnit' }));
    const labels = [...root.querySelectorAll('.amount')].map((span) => span.textContent?.trim());
    expect(labels).toContain('12');
    expect(root.querySelector('#lapin_hyvinvointialue')?.getAttribute('style')).toContain(RISING_FAST);
  });
});
