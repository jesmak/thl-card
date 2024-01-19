import { LovelaceCardConfig } from 'custom-card-helpers';

export interface THLCovidCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
}

export interface Area {
  area_id: string;
  name: string;
  amount_last_week: number;
  amount_two_week_ago: number;
  change_in_numbers: number;
  change_percentage: number;
}
