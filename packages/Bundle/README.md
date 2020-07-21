# @dpc-sdp/myvic-bundle

A bundle of MyVictoria components packaged as a UMD. Mainly intended for use
in existing HTML sites that are not already using Vue or Webpack.

The bundle includes a simple API to allow individual components to be mounted
into an element on an HTML page. ```el``` represents an element id (as a string)
and props will pass a props object through to the underlying Vue component (see
the storybook docs for more information for each component).

```js
MyVic.mountAddressSearch (el, props)
MyVic.mountAreaSearch (el, props)
MyVic.mountAutoComplete (el, props)
MyVic.mountBarChart (el, props)
MyVic.mountDataBlock (el, props)
MyVic.mountLineChart (el, props)
MyVic.mountPieChart (el, props)
MyVic.mountToggleList (el, props)
MyVic.mountTreeMap (el, props)
MyVic.mountMap (el, props)
MyVic.mountMapWithTileLayer (el, mapProps, layerProps)
MyVic.mountMapWithVectorLayer (el, mapProps, layerProps)
MyVic.mountMapWithVectorTileLayer (el, mapProps, layerProps)
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
