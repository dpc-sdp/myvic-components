# @dpc-sdp/yourvic-bundle

A bundle of YourVictoria components packaged as a UMD. Mainly intended for use
in existing HTML sites that are not already using Vue or Webpack.

The bundle includes a simple API to allow individual components to be mounted
into an element on an HTML page. ```el``` represents an element id (as a string)
and props will pass a props object through to the underlying Vue component (see
the storybook docs for more information for each component).

```js
YourVic.mountAddressSearch (el, props)
YourVic.mountAreaSearch (el, props)
YourVic.mountAutoComplete (el, props)
YourVic.mountBarChart (el, props)
YourVic.mountDataBlock (el, props)
YourVic.mountLineChart (el, props)
YourVic.mountPieChart (el, props)
YourVic.mountToggleList (el, props)
YourVic.mountTreeMap (el, props)
YourVic.mountMap (el, props)
YourVic.mountMapWithTileLayer (el, mapProps, layerProps)
YourVic.mountMapWithVectorLayer (el, mapProps, layerProps)
YourVic.mountMapWithVectorTileLayer (el, mapProps, layerProps)
```

--------------------------------------------------------------------------------

## Import

```html
<script src="https://cdn.jsdelivr.net/npm/@dpc-sdp/yourvic-bundle/dist/yourvic-bundle.js"></script>
```

--------------------------------------------------------------------------------

## Install

```shell
npm install @dpc-sdp/yourvic-bundle --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
@dpc-sdp/yourvic-bundle
├── @dpc-sdp/yourvic-global
```

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.
