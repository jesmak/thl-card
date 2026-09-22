# THL card

Home Assistant dashboard card that draws THL's weekly disease numbers on a map of Finland.

[![GitHub Release][releases-shield]][releases] [![GitHub Release Date][release-date-shield]][releases]

[![HACS][hacs-shield]][hacs] [![Home Assistant][home-assistant-shield]][home-assistant] [![License][license-shield]](LICENSE)

![Project Maintenance][maintenance-shield] [![GitHub Activity][commits-shield]][commits] [![Open bugs][bugs-shield]][bugs] [![Open enhancements][enhancements-shield]][enhancements]

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/jesmak)

## What is it?

A custom card that shows one disease's weekly numbers, or the flu-like illness visits in primary care, on an
interactive map of the wellbeing services counties. Each county is coloured by how it compares with the whole country,
and clicking one shows its figures and a trend of its past weeks under the map.

The numbers come from the [thl](https://www.github.com/jesmak/thl) integration, which is required.

![The card](docs/images/card.png)

## How to install

### With HACS

1. Add this repository to HACS custom repositories with type **Dashboard**
2. Search for THL card in HACS and download it
3. Refresh your browser

### Manually

1. Take `dist/thl-card.js` from the source code of the [latest release][releases] and copy it to the
   `config/www` folder of your Home Assistant installation
2. In Home Assistant settings, open dashboards, click the three dots at the top right and open resources
3. Add a new resource with the path `/local/thl-card.js` and type JavaScript
4. Refresh your browser

## Options

The card has a visual editor: add it from the card picker and choose the disease. The options can also be written by
hand.

| Name           | Type    | Requirement  | Description                                                                                        | Default           |
| -------------- | ------- | ------------ | -------------------------------------------------------------------------------------------------- | ----------------- |
| `type`         | string  | **Required** | `custom:thl-card`                                                                                  |                   |
| `entity`       | string  | **Required** | The whole country's sensor of a disease, or of the flu-like illness visits                         |                   |
| `color_by`     | string  | Optional     | `level` compares each county with the whole country, `change` with its own week before             | `level`           |
| `default_area` | string  | Optional     | The `area_id` of a county chosen whenever the card loads, such as `etela-karjalan_hyvinvointialue` | the whole country |
| `show_trend`   | boolean | Optional     | A line of the chosen area's past six months with its figures                                       | `true`            |
| `map_width`    | number  | Optional     | A fixed width for the map, in pixels                                                               | follows the card  |

```yaml
type: custom:thl-card
entity: sensor.thl_influenssa
```

## The size of the card

A card a whole section wide, which is where it starts, puts the figures beside the map, over the sea west of it, so
the card isn't taller than it needs to be. A narrower card keeps them under the map. The trend is always under the
map. The map grows with the card up to a point, and the shapes and the numbers written on them scale together. The
card is not made narrower than half a section.

Set `map_width` to fix the map at one size whatever the card does.

## The colours

By default a county is coloured by its level compared with the whole country: its incidence per 100 000 people for a
disease, or its share of flu-like illness visits. The level is what makes counties comparable, since a large county
has more cases simply because more people live there.

| Colour      | What it means                                  |
| ----------- | ---------------------------------------------- |
| Blue        | No cases at all                                |
| Green       | Less than half the whole country's level       |
| Light green | Less than 0.8 times the whole country's level  |
| Yellow      | About the same as the whole country            |
| Orange      | More than 1.25 times the whole country's level |
| Red         | More than twice the whole country's level      |

With `color_by: change` a county is coloured by how its cases changed from the week before instead:

| Colour      | What it means                                        |
| ----------- | ---------------------------------------------------- |
| Blue        | No cases at all, this week or the week before        |
| Green       | Cases fell by more than 40 %                         |
| Light green | Cases fell by more than 10 %                         |
| Yellow      | Little change either way, or no week to compare with |
| Orange      | Cases rose by more than 10 %                         |
| Red         | Cases rose by more than 40 %                         |

A county the sensor carries no numbers for is left the colour of the text.

## The figures and the trend

Under the map are the whole country's figures: last week's cases and incidence, the week before, and the change. For
the flu-like illness visits they are the share of visits, how many there were, and the share the week before. Clicking
a county shows its own figures instead; clicking it again goes back to the whole country.

The trend covers the past six months, drawn from the statistics the integration keeps for each area's sensor: the
incidence when colouring by level, the cases when colouring by change. Pointing at it shows the week and its figure.

## Development

Requires Node 22.13 or newer.

```
npm install
npm run check
```

`npm run check` typechecks, lints, checks formatting, runs the tests and builds `dist/thl-card.js`, which is the file
HACS installs and is committed to the repository.

| Path                  | What it contains                                                     |
| --------------------- | -------------------------------------------------------------------- |
| `src/thl-card.ts`     | The card itself                                                      |
| `src/areas.ts`        | Reading the sensor's areas, and the colour of each county            |
| `src/map/counties.ts` | The map, generated from the original inline SVG — not edited by hand |
| `src/logos.ts`        | The THL and disease drawings                                         |
| `src/localize/`       | The card's texts                                                     |
| `tests/`              | Tests, run with vitest                                               |

## Data

Disease statistics: [THL](https://thl.fi/), through the [thl](https://www.github.com/jesmak/thl) integration.

[releases-shield]: https://img.shields.io/github/release/jesmak/thl-card.svg?style=for-the-badge
[release-date-shield]: https://img.shields.io/github/release-date/jesmak/thl-card?style=for-the-badge
[releases]: https://github.com/jesmak/thl-card/releases
[hacs-shield]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge
[hacs]: https://hacs.xyz/docs/faq/custom_repositories/
[home-assistant-shield]: https://img.shields.io/badge/Home%20Assistant-visual%20editor%20%2F%20yaml-green.svg?style=for-the-badge
[home-assistant]: https://www.home-assistant.io/
[license-shield]: https://img.shields.io/github/license/jesmak/thl-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg?style=for-the-badge
[commits-shield]: https://img.shields.io/github/commit-activity/y/jesmak/thl-card.svg?style=for-the-badge
[commits]: https://github.com/jesmak/thl-card/commits/main
[bugs-shield]: https://img.shields.io/github/issues/jesmak/thl-card/bug?style=for-the-badge&label=bugs&color=red
[bugs]: https://github.com/jesmak/thl-card/labels/bug
[enhancements-shield]: https://img.shields.io/github/issues/jesmak/thl-card/enhancement?style=for-the-badge&label=enhancements&color=blue
[enhancements]: https://github.com/jesmak/thl-card/labels/enhancement
