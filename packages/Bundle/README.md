# @dpc-sdp/myvic-bundle

A bundle of MyVictoria components packaged as a UMD. Mainly intended for use
in existing HTML sites that are not already using Vue or Webpack.

The bundle includes a simple API to allow individual components to be mounted
into an element on an HTML page. ```el``` represents an element id (as a string)
and props will pass a props object through to the underlying Vue component (see
the storybook docs for more information for each component).

```js
Myvic.mountAddressSearch (el, props)
Myvic.mountAreaSearch (el, props)
Myvic.mountAutoComplete (el, props)
Myvic.mountBarChart (el, props)
Myvic.mountDataBlock (el, props)
Myvic.mountLineChart (el, props)
Myvic.mountPieChart (el, props)
Myvic.mountToggleList (el, props)
Myvic.mountTreeMap (el, props)
Myvic.mountMap (el, props)
Myvic.mountMapWithTileLayer (el, mapProps, layerProps)
Myvic.mountMapWithVectorLayer (el, mapProps, layerProps)
Myvic.mountMapWithVectorTileLayer (el, mapProps, layerProps)
```

--------------------------------------------------------------------------------

## Import

```html
<script src="https://cdn.jsdelivr.net/npm/@dpc-sdp/myvic-bundle/dist/myvic-bundle.js"></script>
```

--------------------------------------------------------------------------------

## Install

```shell
npm install @dpc-sdp/myvic-bundle --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
@dpc-sdp/myvic-bundle
├── @dpc-sdp/myvic-global
```

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.
