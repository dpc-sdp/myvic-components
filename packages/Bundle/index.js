import './public-path'
import 'babel-polyfill'
import Vue from 'vue'

// Replaced with dynamic imports for code splitting
// import YourVicAddressSearch from '@dpc-sdp/yourvic-addresssearch'
// import YourVicAreaSearch from '@dpc-sdp/yourvic-areasearch'
// import YourVicAutoComplete from '@dpc-sdp/yourvic-autocomplete'
// import YourVicBarChart from '@dpc-sdp/yourvic-bar-chart'
// import YourVicDataBlock from '@dpc-sdp/yourvic-data-block'
// import YourVicLineChart from '@dpc-sdp/yourvic-line-chart'
// import YourVicPieChart from '@dpc-sdp/yourvic-pie-chart'
// import YourVicToggleList from '@dpc-sdp/yourvic-toggle-list'
// import YourVicTreeMap from '@dpc-sdp/yourvic-treemap'
// import YourvicMapCore from '@dpc-sdp/yourvic-map-core'
// import YourvicMapTileLayer from '@dpc-sdp/yourvic-map-core/MapTileLayer'
// import YourvicMapVectorLayer from '@dpc-sdp/yourvic-map-core/MapVectorLayer'
// import YourvicMapVectorTileLayer from '@dpc-sdp/yourvic-map-core/MapVectorTileLayer'

function initialiseVueComponent (component, el, props, childComponent, childProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const child = childComponent ? [ h(childComponent, { props: childProps }) ] : undefined
      return h(component, { props }, child)
    }
  })
}

export async function mountAddressSearch (el, props) {
  const { default: YourVicAddressSearch } = await import(/* webpackChunkName: "YourVicAddressSearch" */ '@dpc-sdp/yourvic-addresssearch')
  initialiseVueComponent(YourVicAddressSearch, el, props)
}

export async function mountAreaSearch (el, props) {
  const { default: YourVicAreaSearch } = await import(/* webpackChunkName: "YourVicAreaSearch" */ '@dpc-sdp/yourvic-areasearch')
  initialiseVueComponent(YourVicAreaSearch, el, props)
}

export async function mountAutoComplete (el, props) {
  const { default: YourVicAutoComplete } = await import(/* webpackChunkName: "YourVicAutoComplete" */ '@dpc-sdp/yourvic-autocomplete')
  initialiseVueComponent(YourVicAutoComplete, el, props)
}

export async function mountBarChart (el, props) {
  const { default: YourVicBarChart } = await import(/* webpackChunkName: "YourVicBarChart" */ '@dpc-sdp/yourvic-bar-chart')
  initialiseVueComponent(YourVicBarChart, el, props)
}

export async function mountDataBlock (el, props) {
  const { default: YourVicDataBlock } = await import(/* webpackChunkName: "YourVicDataBlock" */ '@dpc-sdp/yourvic-data-block')
  initialiseVueComponent(YourVicDataBlock, el, props)
}

export async function mountLineChart (el, props) {
  const { default: YourVicLineChart } = await import(/* webpackChunkName: "YourVicLineChart" */ '@dpc-sdp/yourvic-line-chart')
  initialiseVueComponent(YourVicLineChart, el, props)
}

export async function mountPieChart (el, props) {
  const { default: YourVicPieChart } = await import(/* webpackChunkName: "YourVicPieChart" */ '@dpc-sdp/yourvic-pie-chart')
  initialiseVueComponent(YourVicPieChart, el, props)
}

export async function mountToggleList (el, props) {
  const { default: YourVicToggleList } = await import(/* webpackChunkName: "YourVicToggleList" */ '@dpc-sdp/yourvic-toggle-list')
  initialiseVueComponent(YourVicToggleList, el, props)
}

export async function mountTreeMap (el, props) {
  const { default: YourVicTreeMap } = await import(/* webpackChunkName: "YourVicTreeMap" */ '@dpc-sdp/yourvic-treemap')
  initialiseVueComponent(YourVicTreeMap, el, props)
}

export async function mountMap (el, props) {
  const { default: YourvicMapCore } = await import(/* webpackChunkName: "YourvicMapCore" */ '@dpc-sdp/yourvic-map-core')
  initialiseVueComponent(YourvicMapCore, el, props)
}

export async function mountMapWithTileLayer (el, mapProps, layerProps) {
  const { default: YourvicMapCore } = await import(/* webpackChunkName: "YourvicMapCore" */ '@dpc-sdp/yourvic-map-core')
  const { default: YourvicMapTileLayer } = await import(/* webpackChunkName: "YourvicMapTileLayer" */ '@dpc-sdp/yourvic-map-core/MapTileLayer')
  initialiseVueComponent(YourvicMapCore, el, mapProps, YourvicMapTileLayer, layerProps)
}

export async function mountMapWithVectorLayer (el, mapProps, layerProps) {
  const { default: YourvicMapCore } = await import(/* webpackChunkName: "YourvicMapCore" */ '@dpc-sdp/yourvic-map-core')
  const { default: YourvicMapVectorLayer } = await import(/* webpackChunkName: "YourvicMapVectorLayer" */ '@dpc-sdp/yourvic-map-core/MapVectorLayer')
  initialiseVueComponent(YourvicMapCore, el, mapProps, YourvicMapVectorLayer, layerProps)
}

export async function mountMapWithVectorTileLayer (el, mapProps, layerProps) {
  const { default: YourvicMapCore } = await import(/* webpackChunkName: "YourvicMapCore" */ '@dpc-sdp/yourvic-map-core')
  const { default: YourvicMapVectorTileLayer } = await import(/* webpackChunkName: "YourvicMapVectorTileLayer" */ '@dpc-sdp/yourvic-map-core/MapVectorTileLayer')
  initialiseVueComponent(YourvicMapCore, el, mapProps, YourvicMapVectorTileLayer, layerProps)
}

export async function mountAreaWithDataExample (el, props) {
  const { AreaWithData } = await import(/* webpackChunkName: "AreaWithData" */ '@dpc-sdp/yourvic-examples')
  initialiseVueComponent(AreaWithData, el, props)
}

export async function mountAreaWithMapExample (el, props) {
  const { AreaWithMap } = await import(/* webpackChunkName: "AreaWithMap" */ '@dpc-sdp/yourvic-examples')
  initialiseVueComponent(AreaWithMap, el, props)
}

export async function mountIncomeDataExample (el, props) {
  const { IncomeData } = await import(/* webpackChunkName: "IncomeData" */ '@dpc-sdp/yourvic-examples')
  initialiseVueComponent(IncomeData, el, props)
}
