/**
 * Where each county's case number is written on the map, placed by hand.
 *
 * The positions are in the map's own coordinate space, the 235 x 409 box the
 * drawing was made for: `bottom` counts up from its bottom edge and `left` from
 * its left edge. The card turns them into percentages, so they hold wherever
 * the map is scaled to.
 */

export interface CountyLabel {
  id: string;
  bottom: number;
  left: number;
}

export const COUNTY_LABELS: CountyLabel[] = [
  { id: 'ita-uudenmaan_hyvinvointialue', bottom: 15, left: 125 },
  { id: 'keski-uudenmaan_hyvinvointialue', bottom: 27, left: 105 },
  { id: 'lansi-uudenmaan_hyvinvointialue', bottom: 5, left: 80 },
  { id: 'vantaan_ja_keravan_hyvinvointialue', bottom: 14, left: 105 },
  { id: 'varsinais-suomen_hyvinvointialue', bottom: 25, left: 60 },
  { id: 'satakunnan_hyvinvointialue', bottom: 60, left: 50 },
  { id: 'kanta-hameen_hyvinvointialue', bottom: 40, left: 90 },
  { id: 'pirkanmaan_hyvinvointialue', bottom: 75, left: 80 },
  { id: 'paijat-hameen_hyvinvointialue', bottom: 50, left: 120 },
  { id: 'kymenlaakson_hyvinvointialue', bottom: 30, left: 150 },
  { id: 'etela-karjalan_hyvinvointialue', bottom: 50, left: 165 },
  { id: 'etela-savon_hyvinvointialue', bottom: 75, left: 150 },
  { id: 'pohjois-savon_hyvinvointialue', bottom: 125, left: 150 },
  { id: 'pohjois-karjalan_hyvinvointialue', bottom: 120, left: 200 },
  { id: 'keski-suomen_hyvinvointialue', bottom: 105, left: 115 },
  { id: 'etela-pohjanmaan_hyvinvointialue', bottom: 115, left: 70 },
  { id: 'pohjanmaan_hyvinvointialue', bottom: 135, left: 55 },
  { id: 'keski-pohjanmaan_hyvinvointialue', bottom: 150, left: 95 },
  { id: 'pohjois-pohjanmaan_hyvinvointialue', bottom: 180, left: 115 },
  { id: 'kainuun_hyvinvointialue', bottom: 180, left: 170 },
  { id: 'lapin_hyvinvointialue', bottom: 300, left: 140 },
  { id: 'helsingin_kaupunki', bottom: 5, left: 110 },
  { id: 'ahvenanmaa', bottom: 20, left: 10 },
];
