import './public-path'
import 'babel-polyfill'
import Vue from 'vue'

// Replaced with dynamic imports for code splitting
// import MyVicAddressSearch from '@dpc-sdp/myvic-addresssearch'
// import MyVicAreaSearch from '@dpc-sdp/myvic-areasearch'
// import MyVicAutoComplete from '@dpc-sdp/myvic-autocomplete'
// import MyVicBarChart from '@dpc-sdp/myvic-bar-chart'
// import MyVicDataBlock from '@dpc-sdp/myvic-data-block'
// import MyVicLineChart from '@dpc-sdp/myvic-line-chart'
// import MyVicPieChart from '@dpc-sdp/myvic-pie-chart'
// import MyVicToggleList from '@dpc-sdp/myvic-toggle-list'
// import MyVicTreeMap from '@dpc-sdp/myvic-treemap'
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
  const { default: MyVicAddressSearch } = await import(/* webpackChunkName: "MyVicAddressSearch" */ '@dpc-sdp/myvic-addresssearch')
  initialiseVueComponent(MyVicAddressSearch, el, props)
}

export async function mountAreaSearch (el, props) {
  const { default: MyVicAreaSearch } = await import(/* webpackChunkName: "MyVicAreaSearch" */ '@dpc-sdp/myvic-areasearch')
  initialiseVueComponent(MyVicAreaSearch, el, props)
}

export async function mountAutoComplete (el, props) {
  const { default: MyVicAutoComplete } = await import(/* webpackChunkName: "MyVicAutoComplete" */ '@dpc-sdp/myvic-autocomplete')
  initialiseVueComponent(MyVicAutoComplete, el, props)
}

export async function mountBarChart (el, props) {
  const { default: MyVicBarChart } = await import(/* webpackChunkName: "MyVicBarChart" */ '@dpc-sdp/myvic-bar-chart')
  initialiseVueComponent(MyVicBarChart, el, props)
}

export async function mountDataBlock (el, props) {
  const { default: MyVicDataBlock } = await import(/* webpackChunkName: "MyVicDataBlock" */ '@dpc-sdp/myvic-data-block')
  initialiseVueComponent(MyVicDataBlock, el, props)
}

export async function mountLineChart (el, props) {
  const { default: MyVicLineChart } = await import(/* webpackChunkName: "MyVicLineChart" */ '@dpc-sdp/myvic-line-chart')
  initialiseVueComponent(MyVicLineChart, el, props)
}

export async function mountPieChart (el, props) {
  const { default: MyVicPieChart } = await import(/* webpackChunkName: "MyVicPieChart" */ '@dpc-sdp/myvic-pie-chart')
  initialiseVueComponent(MyVicPieChart, el, props)
}

export async function mountToggleList (el, props) {
  const { default: MyVicToggleList } = await import(/* webpackChunkName: "MyVicToggleList" */ '@dpc-sdp/myvic-toggle-list')
  initialiseVueComponent(MyVicToggleList, el, props)
}

export async function mountTreeMap (el, props) {
  const { default: MyVicTreeMap } = await import(/* webpackChunkName: "MyVicTreeMap" */ '@dpc-sdp/myvic-treemap')
  initialiseVueComponent(MyVicTreeMap, el, props)
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
