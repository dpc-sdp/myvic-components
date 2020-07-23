import './public-path'
import 'babel-polyfill'
import Vue from 'vue'

// Replaced with dynamic imports for code splitting
// import MyvicAddressSearch from '@dpc-sdp/myvic-addresssearch'
// import MyvicAreaSearch from '@dpc-sdp/myvic-areasearch'
// import MyvicAutoComplete from '@dpc-sdp/myvic-autocomplete'
// import MyvicBarChart from '@dpc-sdp/myvic-bar-chart'
// import MyvicDataBlock from '@dpc-sdp/myvic-data-block'
// import MyvicLineChart from '@dpc-sdp/myvic-line-chart'
// import MyvicPieChart from '@dpc-sdp/myvic-pie-chart'
// import MyvicToggleList from '@dpc-sdp/myvic-toggle-list'
// import MyvicTreeMap from '@dpc-sdp/myvic-treemap'
// import MyvicMapCore from '@dpc-sdp/myvic-map-core'
// import MyvicMapTileLayer from '@dpc-sdp/myvic-map-core/MapTileLayer'
// import MyvicMapVectorLayer from '@dpc-sdp/myvic-map-core/MapVectorLayer'
// import MyvicMapVectorTileLayer from '@dpc-sdp/myvic-map-core/MapVectorTileLayer'

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
  const { default: MyvicAddressSearch } = await import(/* webpackChunkName: "MyvicAddressSearch" */ '@dpc-sdp/myvic-addresssearch')
  initialiseVueComponent(MyvicAddressSearch, el, props)
}

export async function mountAreaSearch (el, props) {
  const { default: MyvicAreaSearch } = await import(/* webpackChunkName: "MyvicAreaSearch" */ '@dpc-sdp/myvic-areasearch')
  initialiseVueComponent(MyvicAreaSearch, el, props)
}

export async function mountAutoComplete (el, props) {
  const { default: MyvicAutoComplete } = await import(/* webpackChunkName: "MyvicAutoComplete" */ '@dpc-sdp/myvic-autocomplete')
  initialiseVueComponent(MyvicAutoComplete, el, props)
}

export async function mountBarChart (el, props) {
  const { default: MyvicBarChart } = await import(/* webpackChunkName: "MyvicBarChart" */ '@dpc-sdp/myvic-bar-chart')
  initialiseVueComponent(MyvicBarChart, el, props)
}

export async function mountDataBlock (el, props) {
  const { default: MyvicDataBlock } = await import(/* webpackChunkName: "MyvicDataBlock" */ '@dpc-sdp/myvic-data-block')
  initialiseVueComponent(MyvicDataBlock, el, props)
}

export async function mountLineChart (el, props) {
  const { default: MyvicLineChart } = await import(/* webpackChunkName: "MyvicLineChart" */ '@dpc-sdp/myvic-line-chart')
  initialiseVueComponent(MyvicLineChart, el, props)
}

export async function mountPieChart (el, props) {
  const { default: MyvicPieChart } = await import(/* webpackChunkName: "MyvicPieChart" */ '@dpc-sdp/myvic-pie-chart')
  initialiseVueComponent(MyvicPieChart, el, props)
}

export async function mountToggleList (el, props) {
  const { default: MyvicToggleList } = await import(/* webpackChunkName: "MyvicToggleList" */ '@dpc-sdp/myvic-toggle-list')
  initialiseVueComponent(MyvicToggleList, el, props)
}

export async function mountTreeMap (el, props) {
  const { default: MyvicTreeMap } = await import(/* webpackChunkName: "MyvicTreeMap" */ '@dpc-sdp/myvic-treemap')
  initialiseVueComponent(MyvicTreeMap, el, props)
}

export async function mountMap (el, props) {
  const { default: MyvicMapCore } = await import(/* webpackChunkName: "MyvicMapCore" */ '@dpc-sdp/myvic-map-core')
  initialiseVueComponent(MyvicMapCore, el, props)
}

export async function mountMapWithTileLayer (el, mapProps, layerProps) {
  const { default: MyvicMapCore } = await import(/* webpackChunkName: "MyvicMapCore" */ '@dpc-sdp/myvic-map-core')
  const { default: MyvicMapTileLayer } = await import(/* webpackChunkName: "MyvicMapTileLayer" */ '@dpc-sdp/myvic-map-core/MapTileLayer')
  initialiseVueComponent(MyvicMapCore, el, mapProps, MyvicMapTileLayer, layerProps)
}

export async function mountMapWithVectorLayer (el, mapProps, layerProps) {
  const { default: MyvicMapCore } = await import(/* webpackChunkName: "MyvicMapCore" */ '@dpc-sdp/myvic-map-core')
  const { default: MyvicMapVectorLayer } = await import(/* webpackChunkName: "MyvicMapVectorLayer" */ '@dpc-sdp/myvic-map-core/MapVectorLayer')
  initialiseVueComponent(MyvicMapCore, el, mapProps, MyvicMapVectorLayer, layerProps)
}

export async function mountMapWithVectorTileLayer (el, mapProps, layerProps) {
  const { default: MyvicMapCore } = await import(/* webpackChunkName: "MyvicMapCore" */ '@dpc-sdp/myvic-map-core')
  const { default: MyvicMapVectorTileLayer } = await import(/* webpackChunkName: "MyvicMapVectorTileLayer" */ '@dpc-sdp/myvic-map-core/MapVectorTileLayer')
  initialiseVueComponent(MyvicMapCore, el, mapProps, MyvicMapVectorTileLayer, layerProps)
}

export async function mountAreaWithDataExample (el, props) {
  const { AreaWithData } = await import(/* webpackChunkName: "AreaWithData" */ '@dpc-sdp/myvic-examples')
  initialiseVueComponent(AreaWithData, el, props)
}

export async function mountAreaWithMapExample (el, props) {
  const { AreaWithMap } = await import(/* webpackChunkName: "AreaWithMap" */ '@dpc-sdp/myvic-examples')
  initialiseVueComponent(AreaWithMap, el, props)
}

export async function mountIncomeDataExample (el, props) {
  const { IncomeData } = await import(/* webpackChunkName: "IncomeData" */ '@dpc-sdp/myvic-examples')
  initialiseVueComponent(IncomeData, el, props)
}
