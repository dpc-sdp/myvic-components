## Getting Started Guide

* [About the Project](#about-the-project)
* [Component Overview](#component-overview)
* [Component Usage and Deployment](#component-usage-and-deployment)
* [Data Hosting](#data-hosting)
* [Contributing](#contributing)
* [Support](#support)
* [License](#license)
* [Attribution](#attribution)

## About The Project

The My Victoria component library aims to enable the publication of accessible maps, charts and user interface (UI)
elements to websites by content owners across Government. It includes a set of reusable UI components designed to
integrate with DDI’s existing ecosystem of platforms and services; and supporting documentation and examples to assist
with their usage.

A particular focus has been to ensure that all components align to Victorian Government design standards and branding;
and provide an accessible and responsive user experience for the Victorian public. Packaging these elements as reusable
components provides content owners the flexibility to build rich and engaging user experiences to suit their target
audience, which is a significant differentiator from the many off-the-shelf dashboard tools.

## Component Overview

My Victoria provides a set of reusable components designed to allow developers to easily create their own
visualisations and dashboards in a consistent way. These components are self-contained building blocks that can be used
in a standalone website or integrated with existing DPC platforms such as
[SDP](https://www.singledigitalpresence.vic.gov.au/).

All components have been developed with [Vue](https://vuejs.org/) and aligned to the existing
[Ripple](https://github.com/dpc-sdp/ripple) component library. This means they have also been designed to match
Victorian Government design guidelines and can easily slot in alongside existing Ripple components and onto the
[SDP](https://www.singledigitalpresence.vic.gov.au/) platform.

All components are configurable and data-driven, allowing developers to pass information to the components via
documented Vue.js ‘props’. [Storybook](https://storybook.js.org/) has been used for documenting and demonstrating
components and is available [online here](https://storybook-myvictoria-vic-gov-au-develop.lagoon.vicsdp.amazee.io/).

All components target WCAG 2.0 AA accessibility compliance.

## Component Usage and Deployment

Developers can start using the components immediately. There are a few different options for getting started depending
on whether a standalone or SDP site is required. Specific package installation instructions are available in the
[README](https://github.com/dpc-sdp/myvictoria-components) for the MyVictoria Components repo.

### Standalone Site

The following options are recommended for creating a new standalone website:

- [Vue](https://vuejs.org/) (Single-Page Application) - A Vue application can be bootstrapped using [Vue CLI](https://cli.vuejs.org/guide/).
This approach is the simplest option when getting started or when only a single page or dashboard is required.
- [Nuxt](https://nuxtjs.org/) (Server Side Rendering) - Nuxt applications can be bootstrapped with
[create-nuxt-app](https://github.com/nuxt/create-nuxt-app). Nuxt adds server side rendering to Vue sites and is better
suited for larger enterprise sites with multiple pages.

### SDP Site

[Ripple](https://github.com/dpc-sdp/ripple) provides a framework for developing new [Nuxt](https://nuxtjs.org/) web
applications for hosting on [SDP](https://www.singledigitalpresence.vic.gov.au/). Ripple applications can optionally
be backed by [Tide](https://github.com/dpc-sdp/tide) - the SDP Drupal Content Management System (CMS)

- Ripple with Tide - The [@dpc-sdp/ripple-nuxt-tide](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide) Nuxt
module can be used to add Tide integration to a Nuxt application.
- Ripple without Tide - The [@dpc-sdp/nuxt-ripple-ui](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui) Nuxt module
can be used to add Ripple UI components without Tide integration for a Nuxt application.

## Data Hosting

Users of the Components are responsible for arranging their own data hosting (assuming data is not already hosted
online). There are few specific requirements for suitable data hosting options, other than that the data is accessible
via an API. Typically developers will need to request data via an API as part of a Vue application, then process it and
pass it into the components as Vue 'props'.

DPC provides some existing options for data hosting, including:

### [MyVictoria](https://myvictoria.vic.gov.au/)
MyVictoria is available as an option for short term data storage. The
current MyVictoria site uses an Amazon RDS database for data storage, with data served out using Geoserver which
provides OGC standard API endpoints. This approach is particularly appropriate for geospatial datasets but can be used
for any structured tabular dataset. MyVictoria also uses a Jenkins server for performing some traditional ETL functions.

### [Data.Vic](https://www.data.vic.gov.au/)
Data.Vic can be used to host data sets that can be stored in small files and made available as open data.

### [API Gateway](https://developer.vic.gov.au/)
Users needing to serve data through a new API are recommended to use
the DDI API Gateway. The API Gateway provides 3 layers of functionality:

- Portal – Discovery points for public APIs, as well as documentation and tools for developers.
- Gateway – API Management and security layer.
- Factory – Integration and orchestration layer for system integration, data transformation and business logic.

The API Gateway does not host data, however, through the factory layer it can support complex translation and processing
of data from its source. This approach eliminates the need to create and store intermediate datasets through traditional
ETL processes. It can also facilitate near real-time and autonomous data flows from a source data set. For performance
reasons, it is recommended that a CDN be used to cache data from the API Gateway as appropriate.

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
