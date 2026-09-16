import { describe, expect, it } from 'vitest';

import {
  caseCount,
  changePercentage,
  fillColor,
  FALLING,
  FALLING_FAST,
  findArea,
  NO_CASES,
  NO_DATA,
  RISING,
  RISING_FAST,
  STEADY,
} from '../src/areas';
import type { Area } from '../src/types';

function area(values: Partial<Area> = {}): Area {
  return {
    area_id: 'lapin_hyvinvointialue',
    name: 'Lapin hyvinvointialue',
    amount_last_week: 2,
    amount_two_weeks_ago: 1,
    change_in_numbers: 1,
    change_percentage: '100',
    ...values,
  };
}

describe('finding a county', () => {
  it('is found by the id the integration uses', () => {
    const areas = [area(), area({ area_id: 'finland', name: 'Kaikki hyvinvointialueet' })];
    expect(findArea(areas, 'finland')?.name).toBe('Kaikki hyvinvointialueet');
    expect(findArea(areas, 'ahvenanmaa')).toBeUndefined();
  });

  it('writes nothing on the map for a county the sensor does not carry', () => {
    expect(caseCount([area({ amount_last_week: 7 })], 'lapin_hyvinvointialue')).toBe(7);
    expect(caseCount([], 'lapin_hyvinvointialue')).toBe('');
  });

  it('reads the change whether it comes as a string or a number', () => {
    expect(changePercentage(area({ change_percentage: '-43' }))).toBe(-43);
    expect(changePercentage(area({ change_percentage: 0 }))).toBe(0);
    expect(changePercentage(area({ change_percentage: undefined }))).toBeNaN();
  });
});

describe('the colour of a county', () => {
  it('is the text colour when the sensor has no numbers for it', () => {
    expect(fillColor(undefined)).toBe(NO_DATA);
  });

  it('is blue when there were no cases at all, this week or before', () => {
    expect(fillColor(area({ amount_last_week: 0, change_percentage: 0 }))).toBe(NO_CASES);
  });

  it('is not blue when the change is a real reading of no change', () => {
    expect(fillColor(area({ amount_last_week: 0, change_percentage: '0' }))).toBe(STEADY);
  });

  it.each([
    ['-100', FALLING_FAST],
    ['-43', FALLING_FAST],
    ['-41', FALLING_FAST],
    ['-40', FALLING],
    ['-15', FALLING],
    ['-10', STEADY],
    ['0', STEADY],
    ['10', STEADY],
    ['15', RISING],
    ['40', RISING],
    ['41', RISING_FAST],
    ['100', RISING_FAST],
  ])('is right for a change of %s per cent', (change, expected) => {
    expect(fillColor(area({ change_percentage: change }))).toBe(expected);
  });

  it('is the steady colour when THL has not published the week before', () => {
    expect(fillColor(area({ change_percentage: undefined, amount_two_weeks_ago: undefined }))).toBe(STEADY);
  });
});
