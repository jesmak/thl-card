import { describe, expect, it, vi } from 'vitest';

import type { HomeAssistant } from '../src/hass';
import { fetchTrend, isoWeek, weekStart, weeklyPoints } from '../src/trend';

const MONDAY = new Date(2026, 8, 14).getTime();
const DAY = 24 * 60 * 60 * 1000;

describe('the trend', () => {
  it('starts a week on its Monday', () => {
    expect(weekStart(MONDAY + 3 * DAY + 5000)).toBe(MONDAY);
    expect(weekStart(MONDAY)).toBe(MONDAY);
    expect(weekStart(MONDAY - 1)).toBe(MONDAY - 7 * DAY);
  });

  it('takes the last value of each week, which is the newest figure the week had', () => {
    const rows = [
      { start: MONDAY - 7 * DAY, mean: 4 },
      { start: MONDAY, mean: 4 },
      { start: MONDAY + 2 * DAY, mean: 5 },
      { start: MONDAY + 3 * DAY, mean: null },
    ];
    expect(weeklyPoints(rows, 12)).toEqual([
      { week: MONDAY - 7 * DAY, value: 4 },
      { week: MONDAY, value: 5 },
    ]);
  });

  it('numbers weeks as ISO does', () => {
    expect(isoWeek(MONDAY)).toBe(38);
    expect(isoWeek(new Date(2026, 0, 1).getTime())).toBe(1);
    expect(isoWeek(new Date(2027, 0, 1).getTime())).toBe(53);
  });

  it('keeps only the newest weeks asked for', () => {
    const rows = [0, 1, 2, 3].map((week) => ({ start: MONDAY + week * 7 * DAY, mean: week }));
    expect(weeklyPoints(rows, 2).map((point) => point.value)).toEqual([2, 3]);
  });

  it('asks Home Assistant for the daily statistics of the sensor', async () => {
    const callWS = vi
      .fn()
      .mockResolvedValue({ 'sensor.x': [{ start: new Date(MONDAY).toISOString(), mean: 1 }] });
    const hass = { states: {}, callWS } as unknown as HomeAssistant;

    expect(await fetchTrend(hass, 'sensor.x', 4, MONDAY + DAY)).toEqual([{ week: MONDAY, value: 1 }]);
    expect(callWS).toHaveBeenCalledWith({
      type: 'recorder/statistics_during_period',
      start_time: new Date(MONDAY - 4 * 7 * DAY).toISOString(),
      statistic_ids: ['sensor.x'],
      period: 'day',
      types: ['mean'],
    });
  });

  it('is empty without Home Assistant’s websocket', async () => {
    expect(await fetchTrend({ states: {} }, 'sensor.x', 4)).toEqual([]);
  });
});
