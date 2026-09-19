/**
 * The trend of an area, from the statistics the thl integration keeps for the area's sensor.
 *
 * A week's figure is published during the week after it, so a sensor changes in
 * the middle of a week. Averaging a week would mix two figures; the last value of
 * each week is the newest figure that week had.
 */
import type { HomeAssistant } from './hass';

export interface TrendPoint {
  /** The start of the week, in milliseconds. */
  week: number;
  value: number;
}

interface StatisticRow {
  start: number | string;
  mean?: number | null;
}

const DAY = 24 * 60 * 60 * 1000;

/** The Monday of the week a moment falls in, at midnight in the viewer's time. */
export function weekStart(moment: number): number {
  const date = new Date(moment);
  const sinceMonday = (date.getDay() + 6) % 7;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - sinceMonday);
  return date.getTime();
}

/** The ISO week number of a moment, in the viewer's time. */
export function isoWeek(moment: number): number {
  const date = new Date(moment);
  date.setHours(0, 0, 0, 0);
  // The Thursday of the week decides its year, and so its number.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const firstThursday = new Date(date.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7));
  return 1 + Math.round((date.getTime() - firstThursday.getTime()) / (7 * DAY));
}

/** The last value of each week, oldest first, for the given number of newest weeks. */
export function weeklyPoints(rows: StatisticRow[], weeks: number): TrendPoint[] {
  const byWeek = new Map<number, TrendPoint>();
  for (const row of rows) {
    if (row.mean === null || row.mean === undefined) {
      continue;
    }
    const start = typeof row.start === 'number' ? row.start : Date.parse(row.start);
    const week = weekStart(start);
    // The rows come oldest first, so a later row of the same week replaces an earlier one.
    byWeek.set(week, { week, value: row.mean });
  }
  return [...byWeek.values()].sort((a, b) => a.week - b.week).slice(-weeks);
}

/** Fetches the trend of one sensor. Nothing when Home Assistant has no statistics for it. */
export async function fetchTrend(
  hass: HomeAssistant,
  statisticId: string,
  weeks: number,
  now: number = Date.now(),
): Promise<TrendPoint[]> {
  if (!hass.callWS) {
    return [];
  }
  // From the start of the oldest week asked for; the newest week is the one still running.
  const start = new Date(weekStart(now) - weeks * 7 * DAY).toISOString();
  const result = await hass.callWS<Record<string, StatisticRow[]>>({
    type: 'recorder/statistics_during_period',
    start_time: start,
    statistic_ids: [statisticId],
    period: 'day',
    types: ['mean'],
  });
  return weeklyPoints(result[statisticId] ?? [], weeks);
}
