# THL card by [@jesmak](https://www.github.com/jesmak)

A Home Assistant Lovelace custom card for tracking disease statistics by Finnish Institute for Health and Welfare (THL).

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![GitHub Activity][commits-shield]][commits]

## What is it?

A custom Lovelace card that displays the number of disease cases last week and two weeks ago, nicely
visualized in an interactive map of Finland. Requires [thl](https://www.github.com/jesmak/thl) integration as the data source.

![image](https://github.com/jesmak/thl-card/blob/main/thl.png?raw=true)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/jesmak)

## Options

| Name                       | Type    | Requirement  | Description                                                     | Default             |
| -------------------------- | ------- | ------------ | --------------------------------------------------------------- | ------------------- |
| type                       | string  | **Required** | `custom:thl-card`                                               |                     |
| entity                     | string  | **Required** | Target entity (or entities) created by a compatible integration |                     |

## How to install

### With HACS

1. Add this repository to HACS custom repositories
2. Search for THL card in HACS and install with type Lovelace
3. Refresh your browser

### Manually

1. Download thl-card.js from latest release and copy it to config/www folder on your Home Assistant installation.
2. In Home Assistant settings, open dashboards, click the 3 dots button on the top right of the screen and open resources
3. Add a new resource with path /local/thl-card.js (type JavaScript)
4. Refresh your browser

[commits-shield]: https://img.shields.io/github/commit-activity/y/jesmak/thl-card.svg?style=for-the-badge
[commits]: https://github.com/jesmak/thl-card/commits/master
[license-shield]: https://img.shields.io/github/license/jesmak/thl-card.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/jesmak/thl-card.svg?style=for-the-badge
[releases]: https://github.com/jesmak/thl-card/releases
