import type { LovelaceCardConfig } from './hass';

export interface ThlCardConfig extends LovelaceCardConfig {
  entity: string;
  /** A fixed width for the map in pixels. Left out, the map follows the width of the card. */
  map_width?: number;
}

/** One wellbeing services county, as the thl integration writes it into the sensor's `values`. */
export interface Area {
  area_id: string;
  name: string;
  amount_last_week: number;
  /** All three are missing when THL hasn't published the week before. */
  amount_two_weeks_ago?: number;
  change_in_numbers?: number;
  /** A rounded string such as "-15", or the number 0 when there were no cases to compare with. */
  change_percentage?: string | number;
}
