# Data-Driven Component

**This is a "@dpc-sdp/ripple-nuxt-tide" submodule, for Single Digital Presence projects use only.**

A module to allow editors in SDP Tide CMS to add charts/maps into a content page.

## Install

```shell
npm install @dpc-sdp/myvic-data-driven-component --save
```

## Usage

In SDP project "tide.config.js"(it should be found in SDP site project root "/tide/tide.config.js"), add module as below example.

```
const tideConfig = {
  nodeModules: [
    '@dpc-sdp/myvic-data-driven-component'
  ]
}
```

## Add your own charts/maps

To add custom components, set `customComponents` to `true`.

```
const tideConfig = {
  nodeModules: [
    ['@dpc-sdp/myvic-data-driven-component', { customComponents: true }]
  ]
}
```

Then add a file "/tide/data-driven-component-loader.js" to map and load your custom components, as below example.

```
const loadComponent = (configs) => {
  let dataDrivenComp
  switch (configs.name) {
    case 'my_chart':
      dataDrivenComp = {
        name: () => import(/* webackChunkName: 'my-chart' */ '~/components/MyChart').then(m => m.MyChart)
      }
      break

    case 'myvic_barchart_demo_1':
      dataDrivenComp = {
        name: () => import(/* webackChunkName: 'myvic-bar-chart' */ '@dpc-sdp/myvic-bar-chart'),
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
