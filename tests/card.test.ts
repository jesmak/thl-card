import { beforeEach, describe, expect, it } from 'vitest';

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

describe('the drawings', () => {
  it('draws the THL logo', async () => {
    const root = shadow(await card(hass()));
    const paths = [...root.querySelectorAll('.thl-logo path')];
    expect(paths).toHaveLength(3);
    expect(paths.map((path) => path.getAttribute('fill'))).toEqual(['#606060', '#7bc143', '#ffffff']);
  });

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

  it('show a county when it is clicked', async () => {
    const element = await card(hass());
    const root = shadow(element);
    expect(root.querySelectorAll('.stats-container')).toHaveLength(1);

    (root.querySelector('#kainuun_hyvinvointialue') as SVGElement).dispatchEvent(new Event('click'));
    await element.updateComplete;

    const panes = root.querySelectorAll('.stats-container');
    expect(panes).toHaveLength(2);
    expect(panes[1].textContent).toContain('Kainuun hyvinvointialue');
    expect(panes[1].textContent).toContain('Viime viikko: 0');
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
