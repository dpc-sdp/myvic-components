# @dpc-sdp/yourvic-global

Shared styles, libraries and utility functions for use across YourVictoria
components.

Some functions are exported for external use, for example:

```js
import { buildMyVictoriaMapboxStyle } from '@dpc-sdp/yourvic-global/utils/geoserver_requests'

buildMyVictoriaMapboxStyle(colour, stops, property, sourceLayer)
```

--------------------------------------------------------------------------------

## Install

```shell
npm install @dpc-sdp/yourvic-global --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
@dpc-sdp/yourvic-map-core
├── @dpc-sdp/ripple-global
```

--------------------------------------------------------------------------------

## Import

```js
import {
  myVictoriaRotatingColours,
  myVictoriaLayerStops,
  buildMyVictoriaMapboxStyle
} from '@dpc-sdp/yourvic-global/utils/geoserver_requests'
```

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.

<!-- /GENERATED_DOCS -->
