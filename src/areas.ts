import { WHOLE_COUNTRY } from './const';
import type { Area, ColorBy } from './types';

/** The colour of a county whose numbers the sensor doesn't carry. */
export const NO_DATA = 'var(--primary-text-color)';
/** No cases at all, and none the week before either. */
export const NO_CASES = '#6495ED';
export const FALLING_FAST = '#0DAD4B';
export const FALLING = '#86C43F';
export const STEADY = '#FDE602';
export const RISING = '#F57E20';
export const RISING_FAST = '#ED3028';

export function findArea(areas: Area[], id: string): Area | undefined {
  return areas.find((area) => area.area_id === id);
}

/** The cases, or the flu-like illness visits, of one county: nothing to write when the sensor doesn't carry it. */
export function caseCount(areas: Area[], id: string): number | string {
  const area = findArea(areas, id);
  return area?.amount_last_week ?? area?.visits_last_week ?? '';
}

/** Whether the sensor is the flu-like illness visits rather than a disease. */
export function isVisits(areas: Area[]): boolean {
  return findArea(areas, WHOLE_COUNTRY)?.share_last_week !== undefined;
}

/** The figure that compares fairly between areas: incidence per 100 000, or the share of visits. */
export function level(area: Area | undefined): number | undefined {
  const value = area?.incidence_last_week ?? area?.share_last_week;
  return value === null || value === undefined ? undefined : Number(value);
}

/**
 * The change as a number. The integration sends a rounded string, the number 0
 * when there was nothing to compare with, and nothing at all when THL hasn't
 * published the week before.
 */
export function changePercentage(area: Area): number {
  return Number(area.change_percentage ?? NaN);
}

/** How a county is coloured, by level unless asked otherwise. */
export function fillColor(area: Area | undefined, colorBy: ColorBy = 'change', whole?: Area): string {
  return colorBy === 'level' ? levelColor(area, whole) : changeColor(area);
}

/**
 * Coloured by how the county compares with the whole country: green below it, red above it.
 * A county without cases is left the colour of no cases, and so is every county when the
 * whole country has none. A sensor from before incidence was written falls back to the change.
 */
export function levelColor(area: Area | undefined, whole: Area | undefined): string {
  if (area === undefined) {
    return NO_DATA;
  }
  const value = level(area);
  const national = level(whole);
  if (value === undefined || national === undefined) {
    return area.share_last_week === null ? NO_DATA : changeColor(area);
  }
  if (value === 0 || national === 0) {
    return NO_CASES;
  }

  const ratio = value / national;
  if (ratio < 0.5) {
    return FALLING_FAST;
  }
  if (ratio < 0.8) {
    return FALLING;
  }
  if (ratio > 2) {
    return RISING_FAST;
  }
  if (ratio > 1.25) {
    return RISING;
  }
  return STEADY;
}

/** Coloured by how the county's cases changed from the week before: green falling, red rising. */
export function changeColor(area: Area | undefined): string {
  if (area === undefined) {
    return NO_DATA;
  }
  // Only the number 0 means "nothing to compare with"; a string "0" is a real reading of no change.
  if (area.change_percentage === 0 && (area.amount_last_week ?? 0) === 0) {
    return NO_CASES;
  }

  const change = changePercentage(area);
  if (change < -40) {
    return FALLING_FAST;
  }
  if (change < -10) {
    return FALLING;
  }
  if (change > 40) {
    return RISING_FAST;
  }
  if (change > 10) {
    return RISING;
  }
  // Includes a county whose change is unknown, which is left the steady colour.
  return STEADY;
}
