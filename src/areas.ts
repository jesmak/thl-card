import type { Area } from './types';

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

/** The cases of one county, or nothing to write when the sensor doesn't carry it. */
export function caseCount(areas: Area[], id: string): number | string {
  return findArea(areas, id)?.amount_last_week ?? '';
}

/**
 * The change as a number. The integration sends a rounded string, the number 0
 * when there was nothing to compare with, and nothing at all when THL hasn't
 * published the week before.
 */
export function changePercentage(area: Area): number {
  return Number(area.change_percentage ?? NaN);
}

/** How a county is coloured: green where cases are falling, red where they are rising. */
export function fillColor(area: Area | undefined): string {
  if (area === undefined) {
    return NO_DATA;
  }
  // Only the number 0 means "nothing to compare with"; a string "0" is a real reading of no change.
  if (area.change_percentage === 0 && area.amount_last_week === 0) {
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
