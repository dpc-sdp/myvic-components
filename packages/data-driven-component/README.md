# Data-Driven Component

**This is a "@dpc-sdp/ripple-nuxt-tide" submodule, for Single Digital Presence projects use only.**

A module to allow editors in SDP Tide CMS to add charts/maps into a content page.

## Install

```shell
npm install @dpc-sdp/yourvic-data-driven-component --save
```

## Usage

In SDP project "tide.config.js"(it should be found in SDP site project root "/tide/tide.config.js"), add module as below example.

```
const tideConfig = {
  nodeModules: [
    '@dpc-sdp/yourvic-data-driven-component'
  ]
}
```

## Add your own charts/maps

To add custom components, set `customComponents` to `true`.

```
const tideConfig = {
  nodeModules: [
    ['@dpc-sdp/yourvic-data-driven-component', { customComponents: true }]
  ]
}
```

Then add a file "/tide/data-driven-component-loader.js" to map and load your custom components, as below example.

```
const loadComponent = (configs) => {
  let dataDrivenComp
  switch (configs.name) {
    case 'myvic_vicfreewifi':
      dataDrivenComp = {
        name: () => import(/* webackChunkName: 'yourvic-free-wifi-map' */ '@dpc-sdp/yourvic-maps/YourvicFreeWifiMap').then(m => m.YourvicFreeWifiMap)
      }
      break

    case 'myvic_family_violence_women_programs':
      dataDrivenComp = {
        name: () => import(/* webackChunkName: 'yourvic-map-prevention-family-violence' */ '@dpc-sdp/yourvic-maps/YourvicMapPreventionFamilyViolence').then(m => m.YourvicMapPreventionFamilyViolence)
      }
      break

    case 'myvic_barchart_demo_1':
      dataDrivenComp = {
        name: () => import(/* webackChunkName: 'yourvic-bar-chart' */ '@dpc-sdp/yourvic-bar-chart'),
        props: {
          title: 'test bar chart',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                label: 'Dataset 1',
                data: [40, 20, 12, 52, 10, 39]
              }
            ]
          }
        }
      }
      break
  }
  return dataDrivenComp
}

export default loadComponent
```
