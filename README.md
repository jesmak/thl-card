# THL card

Home Assistant dashboard card that draws THL's weekly disease numbers on a map of Finland.

[![GitHub Release][releases-shield]][releases] [![GitHub Release Date][release-date-shield]][releases] [![HACS][hacs-shield]][hacs] [![License][license-shield]](LICENSE)

<p>
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/country-light.png#gh-light-mode-only" width="400" alt="Influenza on a map of Finland's wellbeing services counties, each coloured by its incidence against the whole country and labelled with its cases, the whole country's figures beside the map, the capital region enlarged below them, a colour key and a six-month trend">
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/country-dark.png#gh-dark-mode-only" width="400" alt="Influenza on a map of Finland's wellbeing services counties, each coloured by its incidence against the whole country and labelled with its cases, the whole country's figures beside the map, the capital region enlarged below them, a colour key and a six-month trend">
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/county-light.png#gh-light-mode-only" width="400" alt="Buttons for influenza and norovirus over the map, coloured by the change from the week before, with Pirkanmaa chosen and outlined, its figures including the same week a year ago, and its own trend">
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/county-dark.png#gh-dark-mode-only" width="400" alt="Buttons for influenza and norovirus over the map, coloured by the change from the week before, with Pirkanmaa chosen and outlined, its figures including the same week a year ago, and its own trend">
</p>

## What is it?

A card for the [thl](https://github.com/jesmak/thl) integration, which reads the weekly disease statistics of THL, the
Finnish Institute for Health and Welfare. It draws one disease, or the flu-like illness visits in primary care, on a
map of the wellbeing services counties. Each county is coloured by how it compares with the whole country, or by how
its cases changed from the week before. Clicking a county shows its own figures and trend.

One card can switch between several diseases. The capital region, whose counties are too small to point at on the map,
is drawn again larger beside the figures.

The thl integration is required.

## Installation

### With HACS

1. Add this repository to HACS custom repositories with type **Dashboard**
2. Search for THL card in HACS and download it
3. Refresh your browser

### Manual

1. Take `dist/thl-card.js` from the source code of the [latest release][releases] and copy it to the `config/www`
   folder of your Home Assistant installation
2. In Home Assistant settings, open dashboards, click the three dots at the top right and open resources
3. Add a new resource with the path `/local/thl-card.js` and type JavaScript
4. Refresh your browser

## Options

The card has a visual editor. Add it from the card picker and choose the disease. The options can also be written by
hand.

| Name           | Type           | Description                                                                                                 | Default           |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ----------------- |
| `type`         | string         | **Required.** `custom:thl-card`                                                                             |                   |
| `entity`       | string or list | **Required.** The whole country's sensor of a disease, or of the flu-like illness visits, or a list of them |                   |
| `color_by`     | string         | `level` compares each county with the whole country, `change` with its own week before                      | `level`           |
| `default_area` | string         | The `area_id` of a county chosen whenever the card loads, such as `pirkanmaan_hyvinvointialue`              | the whole country |
| `show_trend`   | boolean        | A line of the chosen area's past six months under its figures                                               | `true`            |
| `show_inset`   | boolean        | The capital region drawn again larger beside the figures                                                    | `true`            |
| `show_key`     | boolean        | A key under the map that says what the colours mean                                                         | `true`            |
| `map_width`    | number         | A fixed width for the map, in pixels                                                                        | follows the card  |

## What it shows

### The map

Each county is coloured, and its cases, or for the flu-like illness visits the visits, are written at its middle.
Clicking a county chooses it and outlines it, and clicking it again goes back to the whole country. The counties can
also be chosen from the keyboard, with Tab and Enter.

Helsinki and Vantaa and Kerava are a few pixels each on the map. The capital region is therefore drawn again about five
times larger beside the figures, with a dashed frame on the map around what it shows. Its counties and their numbers
are chosen there. With `show_inset: false` it is left out, and their numbers are on the map with the rest, as hard to
point at as they are small.

### The colours

By default a county is coloured by its level compared with the whole country. The level is its incidence per 100 000
people for a disease, or its share of flu-like illness visits. The level is what makes counties comparable, since a large county
has more cases simply because more people live there.

| Colour      | What it means                                  |
| ----------- | ---------------------------------------------- |
| Blue        | No cases at all                                |
| Green       | Less than half the whole country's level       |
| Light green | Less than 0.8 times the whole country's level  |
| Yellow      | About the same as the whole country            |
| Orange      | More than 1.25 times the whole country's level |
| Red         | More than twice the whole country's level      |

With `color_by: change` a county is coloured by how its cases changed from the week before instead, or for the
flu-like illness visits, how their share changed:

| Colour      | What it means                                        |
| ----------- | ---------------------------------------------------- |
| Blue        | No cases at all, this week or the week before        |
| Green       | Cases fell by more than 40 %                         |
| Light green | Cases fell by more than 10 %                         |
| Yellow      | Little change either way, or no week to compare with |
| Orange      | Cases rose by more than 10 %                         |
| Red         | Cases rose by more than 40 %                         |

The key under the map gives the same bounds. A county the sensor carries no numbers for is left the colour of the
text.

### The figures and the trend

Beside or under the map are the whole country's figures, last week's cases and incidence, the week before, and the
change. A county that had no cases the week before has a dash for the change, as there is nothing to compare with. For
the flu-like illness visits they are the share of visits, how many there were, and the share the week before. A chosen
county shows its own figures instead.

The same week a year ago is shown too, when Home Assistant's statistics reach that far. The thl integration writes a
year into them from version 2.1, so with an earlier version the line is missing.

The trend covers the past six months, drawn from the statistics the integration keeps for each area's sensor. It is
the incidence when colouring by level, and the cases when colouring by change. Pointing at it, tapping it or moving along it
with the arrow keys shows a week and its figure. THL publishes a week's figures during the week after, so the newest
point is the figure the sensor shows now, and the others are each named by the week their figure is from.

### Several diseases

Given a list of sensors, the card shows buttons over the map to switch between them. The first is shown when the card
loads, and the chosen county stays chosen when switching.

### Sizes

In a sections view the card is the section's full width by default, and can be made as narrow as half the section. A
card 290 pixels wide or more, which is a whole section even in a view of four, puts the figures beside the map, over the
sea west of it, with the capital region below them. A narrower card keeps them under the map, with the capital region
beside them when there is room and under them when not. In a wider card the map and the figures stay together in the
middle. The map grows with the card up to a point, and the shapes and the numbers on them scale together.

<p>
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/narrow-light.png#gh-light-mode-only" width="255" alt="A narrow card with the figures, the capital region, the colour key and the trend under the map">
<img src="https://raw.githubusercontent.com/jesmak/thl-card/main/docs/images/narrow-dark.png#gh-dark-mode-only" width="255" alt="A narrow card with the figures, the capital region, the colour key and the trend under the map">
</p>

Set `map_width` to fix the map at one size whatever the card does.

## Examples

One disease:

```yaml
type: custom:thl-card
entity: sensor.thl_influenssa
```

Three diseases to switch between, coloured by change, with a county chosen when the card loads:

```yaml
type: custom:thl-card
entity:
  - sensor.thl_influenssa
  - sensor.thl_koronavirus
  - sensor.thl_norovirus
color_by: change
default_area: pirkanmaan_hyvinvointialue
```

## Data

Disease statistics: [THL](https://thl.fi/), through the [thl](https://github.com/jesmak/thl) integration.

The map of the wellbeing services counties is adapted from
[Hyvinvointialueet.svg](https://commons.wikimedia.org/wiki/File:Hyvinvointialueet.svg) by Fenn-O-maniC on Wikimedia
Commons, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The adapted map in
`src/map/counties.ts` is licensed under CC BY-SA 4.0 as well, see [LICENSE-map](LICENSE-map).

## Translating

The card's texts are in `src/localize/languages/`, one JSON file per language, named by its language code, such as
`en.json` and `fi.json`. To add a language, copy `en.json` to the new language's code, such as `sv.json`, and translate
the values. Nothing else needs changing. The card finds the file by itself and uses it when Home Assistant is set to
that language. A text left out falls back to English.

## Development

Requires Node 22.13 or newer.

```
npm install
npm run check
```

`npm run check` typechecks, lints, checks formatting, runs the tests and builds `dist/thl-card.js`, which is the file
HACS installs and is committed to the repository.

| Path                    | What it contains                                                                 |
| ----------------------- | -------------------------------------------------------------------------------- |
| `src/thl-card.ts`       | The card itself                                                                  |
| `src/areas.ts`          | Reading the sensor's areas, and the colour of each county                        |
| `src/trend.ts`          | The trend and the same week a year ago, from Home Assistant's statistics         |
| `src/editor.ts`         | The visual editor                                                                |
| `src/map/counties.ts`   | The map's shapes, adapted from Wikimedia Commons, not edited by hand             |
| `src/map/labels.ts`     | Where each county's number is written, and what the capital region's inset shows |
| `src/logos.ts`          | The virus drawn by the disease's name                                            |
| `src/localize/`         | The card's texts, one JSON file per language                                     |
| `docs/screenshots.json` | The made-up figures the README's screenshots are taken from                      |
| `tests/`                | Tests, run with vitest                                                           |

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/jesmak)

## Thanks

To Fenn-O-maniC for the map of the wellbeing services counties.

## License

MIT, see [LICENSE](LICENSE). The map is CC BY-SA 4.0, see [LICENSE-map](LICENSE-map).

[releases-shield]: https://img.shields.io/github/release/jesmak/thl-card.svg?style=for-the-badge
[release-date-shield]: https://img.shields.io/github/release-date/jesmak/thl-card?style=for-the-badge
[releases]: https://github.com/jesmak/thl-card/releases
[hacs-shield]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge
[hacs]: https://hacs.xyz/docs/faq/custom_repositories/
[license-shield]: https://img.shields.io/github/license/jesmak/thl-card.svg?style=for-the-badge
