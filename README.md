Test
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Component Overview](#component-overview)
* [Installation](#installation)
* [Usage](#usage)
* [Component Listing](#component-listing)
* [Deployment](#deployment)
* [Data Hosting](#data-hosting)
* [Contributing](#contributing)
* [Support](#support)
* [License](#license)
* [Attribution](#attribution)

<!-- ABOUT THE PROJECT -->
## About The Project

The My Victoria component library aims to enable the publication of accessible maps, charts and user interface (UI)
elements to websites by content owners across Government. It includes a set of reusable UI components designed to
integrate with DDI’s existing ecosystem of platforms and services; and supporting documentation and examples to assist
with their usage.

All components have been designed to align to Victorian Government design standards and branding; and include features
to improve their accessibility.

For a higher level overview of how to get started, see the [Getting Started Guide](GETTING_STARTED.md)

## Component Overview

All components have been developed with [Vue](https://vuejs.org/) as part of the
[MyVic-Components](https://github.com/dpc-sdp/myvic-components) repository and aligned to the existing
[Ripple](https://github.com/dpc-sdp/ripple) component library. Components are published to NPM, ready to be used
directly in any Vue JS application.

[Vue CLI](https://cli.vuejs.org/guide/) is recommended for bootstrapping a new standalone Vue JS application.

[Ripple](https://github.com/dpc-sdp/ripple) includes example Vue JS and Nuxt sites that can be used to bootstrap a web
application for deployment to [SDP](https://www.singledigitalpresence.vic.gov.au/).

[Storybook](https://storybook.js.org/) examples with component documentation are available
[here](https://visualise.myvictoria.vic.gov.au/)

## Installation

Installation is straightforward with NPM or Yarn. See the component listing for all available packages.

```shell
npm install @dpc-sdp/myvic-bar-chart --save
```

or

```shell
yarn add @dpc-sdp/myvic-bar-chart
```

## Usage

All components are published to NPM as individual packages under the @dpc-sdp namespace, with a myvic- prefix. For
example:

- @dpc-sdp/myvic-map-core
- @dpc-sdp/myvic-bar-chart

Components are intended to be used with Vue.js projects, and can be installed with NPM as follows:

```shell
npm install @dpc-sdp/myvic-map-core --save
```

And imported using ES6 style imports:

```javascript
import { MyvicMapCore } from '@dpc-sdp/myvic-map-core'
```

Or using require as follows:

```javascript
const MyvicMapCore = require("@dpc-sdp/myvic-map-core")
```

Or imported directly into an HTML page (see the UMD Bundle documentation for more information:

```html
<script src="https://cdn.jsdelivr.net/npm/@dpc-sdp/myvic-bundle@dev/dist/myvic-bundle.js"></script>
```

## Component Listing

### Auto Complete

A component for displaying an autocomplete search with results. This component renders a text input that allows
searching over a set of items. The filtered results will appear beneath the input as a selectable list.

- [@dpc-sdp/myvic-autocomplete](https://www.npmjs.com/package/@dpc-sdp/myvic-autocomplete)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/autocomplete--default-story)

### Address Search

A component for looking up addresses in Victoria using an autocomplete search.

- [@dpc-sdp/myvic-addresssearch](https://www.npmjs.com/package/@dpc-sdp/myvic-addresssearch)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/addresssearch--default-story)

### Area Search

A component for looking up different kinds of areas using an autocomplete search.

- [@dpc-sdp/myvic-areasearch](https://www.npmjs.com/package/@dpc-sdp/myvic-areasearch)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/areasearch--default-story)

### Bar Chart

A component for displaying a data-driven bar chart.

- [@dpc-sdp/myvic-bar-chart](https://www.npmjs.com/package/@dpc-sdp/myvic-bar-chart)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/bar-chart--default-story)

### Line Chart

A component for displaying a data-driven line chart.

- [@dpc-sdp/myvic-line-chart](https://www.npmjs.com/package/@dpc-sdp/myvic-line-chart)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/line-chart--default-story)

### Pie Chart

A component for displaying a data-driven pie chart.

- [@dpc-sdp/myvic-pie-chart](https://www.npmjs.com/package/@dpc-sdp/myvic-pie-chart)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/pie-chart--default-story)

### Tree Map

A component for displaying a data-driven tree map.

- [@dpc-sdp/myvic-treemap](https://www.npmjs.com/package/@dpc-sdp/myvic-treemap)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/tree-map--default-story)

### Data Block

A component for displaying a single data item as a block element.

- [@dpc-sdp/myvic-data-block](https://www.npmjs.com/package/@dpc-sdp/myvic-data-block)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/data-block--default-story)

### Toggle List

A component for displaying a dynamic list of toggleable items.

- [@dpc-sdp/myvic-toggle-list](https://www.npmjs.com/package/@dpc-sdp/myvic-toggle-list)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/toggle-list--default-story)

### Map

An interactive map component based on [OpenLayers](https://openlayers.org/).

- [@dpc-sdp/myvic-map-core](https://www.npmjs.com/package/@dpc-sdp/myvic-map-core)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/maps-core--interactive-map)

### Map - Tile Layer

A component that provides support for OSM, XYZ, WMS and ArcGIS tiled map layers.

- [@dpc-sdp/myvic-map-core](https://www.npmjs.com/package/@dpc-sdp/myvic-map-core)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/maps-tile-layer--configurable-layer)

### Map - Vector Layer

A component that provides support for vector sources such as WFS, ArcGIS Feature Server and GeoJSON files.

- [@dpc-sdp/myvic-map-core](https://www.npmjs.com/package/@dpc-sdp/myvic-map-core)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/maps-vector-layer--configurable-layer)

### Map - Vector Tile Layer

A component that provides support for Mapbox Vector Tile sources.

- [@dpc-sdp/myvic-map-core](https://www.npmjs.com/package/@dpc-sdp/myvic-map-core)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/maps-vector-tile-layer--configurable-layer)

### Global

Shared styles, libraries and utility functions for use across MyVictoria components.

- [@dpc-sdp/myvic-global](https://www.npmjs.com/package/@dpc-sdp/myvic-global)

### Bundled Examples

Examples showing how multiple components can be bundled together and interact with each other.

- [@dpc-sdp/myvic-examples](https://www.npmjs.com/package/@dpc-sdp/myvic-examples)
- [Storybook Documentation](https://visualise.myvictoria.vic.gov.au/?path=/docs/examples-areawithdata--default-story)

### UMD Bundle

A bundle of MyVictoria components packaged as a UMD. Mainly intended for use
in existing HTML sites that are not already using Vue or Webpack.

- [@dpc-sdp/myvic-bundle](https://www.npmjs.com/package/@dpc-sdp/myvic-bundle)

## Deployment

Users of the My Victoria components are responsible for arranging their own web hosting. Some possible options include:

- A Standalone Vue or Nuxt app can be self hosted on any standard web server.
- Existing SDP Sites may be able to use the components via Drupal and Data Driven Component
- A New SDP Site
- Non Vue.js site using the UMD bundle

## Data Hosting

The My Victoria components don't have any specific requirements for data hosting, other than that the data is online
and can be parsed with JavaScript. If hosting is required, some existing options include:

- [MyVictoria](https://myvictoria.vic.gov.au/) (using Geoserver for hosting geospatial web services)
- [Data.Vic](https://www.data.vic.gov.au/)
- [API Gateway](https://developer.vic.gov.au/)

## Contributing

Check our CONTRIBUTING.md

## Support

[Digital Engagement, Department of Premier and Cabinet, Victoria, Australia](https://github.com/dpc-sdp) is a maintainer of this package.

<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

## Attribution

Single Digital Presence offers government agencies an open and flexible toolkit to build websites quickly and cost-effectively.

<!-- SDP LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dpc-sdp/ripple">
    <img src="docs/sdp-vicgov.jpg" alt="Logo" height="150">
  </a>
</p>
