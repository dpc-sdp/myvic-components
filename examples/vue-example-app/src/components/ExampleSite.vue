<template>
  <div class="myvic-example-site__container">
    <h1 class="myvic-example-site__header-h1">That page has been created to showcase the charting and mapping components
      derived from the MyVictoria website
    </h1>
    <p class="myvic-example-site__text-block">
      This page has been created to showcase the charting and mapping components derived from the MyVictoria website.
      To demonstrate the flexibility of embedding these charts into web pages a range of data sources and datasets have
      been drawn upon in this example site.
    </p>
    <p class="myvic-example-site__text-block">
      This site uses live data published by the Australian Bureau of Statistics (ABS), the City of Melbourne and the
      API Gateway coupled with the Victorian Department of Premier and Cabinet developer toolkit for demonstration of
      data by way of graphs and maps.
    </p>
    <p class="myvic-example-site__text-block">
      The first such is a line chart demonstrating the ABS dataset showing monthly visitors to Australia. This is
      a live feed of a data updated monthly by the ABS.
    </p>
    <div class="myvic-example-site__chart-container">
      <line-chart class="myvic-example-site__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
        :longDesc="longDescriptionUrls['arrivals-line-chart']"
      />
    </div>
    <p class="myvic-example-site__text-block">
      The next data demonstration component is a map of the City of Melbourne’s pedestrian sensor counts for the last
      minute of the past hour. Once again this is a live feed of data updated every hour by the City of Melbourne.
    </p>
    <div class="myvic-example-site__map-container">
      <myvic-map-core
        :center="center"
        :zoom="8"
        :minZoom="1"
        :baseMapUrl="baseMapUrl"
        :popupContentFunction="generatePopupContent"
        ariaLabel="An interactive map"
      >
        <myvic-map-vector-layer
          :loader="mapDataLoader"
          dataFormat="GeoJSON"
          loadingStrategy="all"
          :zoomToExtent="true"
          :layerStyle="getMapLayerStyle"
          :enablePopup="true"
          :attributions="attributions"
        />
        <myvic-map-legend
          :type="'custom'"
          :title="'Number of pedestrians'"
        >
          <table style="width:100%">
            <tr>
              <td><div class="myvic-example-site__legend-layer-gray" /></td>
              <td class="myvic-example-site__legend-label">No pedestrians</td>
            </tr>
            <tr>
              <td><div class="myvic-example-site__legend-layer-lightBlue" /></td>
              <td class="myvic-example-site__legend-label">1-10</td>
            </tr>
            <tr>
              <td><div class="myvic-example-site__legend-layer-mediumBlue" /></td>
              <td class="myvic-example-site__legend-label">11-50</td>
            </tr>
            <tr>
              <td><div class="myvic-example-site__legend-layer-darkBlue" /></td>
              <td class="myvic-example-site__legend-label">51-100</td>
            </tr>
            <tr>
              <td><div class="myvic-example-site__legend-layer-darkerBlue" /></td>
              <td class="myvic-example-site__legend-label">More than 100</td>
            </tr>
          </table>
        </myvic-map-legend>
      </myvic-map-core>
    </div>
    <p class="myvic-example-site__text-block">
      The next chart is showing the ABS dataset of the monthly labour force by sex in Victoria. This is a live feed of
      a data updated monthly by the ABS ingested and pushed out by the API gateway.
    </p>
    <div class="myvic-example-site__chart-container">
      <line-chart class="myvic-example-site__labour-force-line-chart"
        :title="labourForceData.title"
        :data="labourForceData"
        :showLegend="true"
        dataFormat="thousand"
        :shortDesc="'Labour Force by Sex'"
        :longDesc="longDescriptionUrls['labour-force-line-chart']"
      />
    </div>
    <p class="myvic-example-site__text-block">
      The following two pie charts are showing the ABS data of increasing and decreasing sources to Victoria’s
      population clock for the past quarter. Once again this is a live feed of a data updated quarterly by the ABS.
    </p>
    <div class="myvic-example-site__chart-container">
      <pie-chart class="myvic-example-site__population-pie-chart"
        :title="incomingPopulationData.title"
        :data="incomingPopulationData"
        :showLegend="true"
        :shortDesc="'Incoming Population'"
        :longDesc="longDescriptionUrls['incoming-population-pie-chart']"
      />
      <pie-chart class="myvic-example-site__population-pie-chart"
        :title="outgoingPopulationData.title"
        :data="outgoingPopulationData"
        :showLegend="true"
        :shortDesc="'Outgoing Population'"
        :longDesc="longDescriptionUrls['outcoming-population-pie-chart']"
      />
    </div>
    <p class="myvic-example-site__text-block">
      The next chart is a tree map showing the ABS data for the differences in the consumer price index in Melbourne
      for a range of goods and services for the past quarter. Once again this is a live feed of a data updated
      quarterly by the ABS.
    </p>
    <div class="myvic-example-site__chart-container">
      <tree-map class="myvic-example-site__cpi-tree-map"
        :title="'CPI for a range of goods and services'"
        :data="cpiData"
        :valueAttr="'value'"
        :labelAttr="'label'"
        :shortDesc="'CPI for a range of goods and services'"
        :longDesc="longDescriptionUrls['cpi-tree-map']"
        />
    </div>
    <p class="myvic-example-site__text-block">
      The following bar chart is showing the ABS data for quarterly residential property price index value for
      greater Melbourne. Once again this is a live feed of a data updated quarterly by the ABS.
    </p>
    <div class="myvic-example-site__chart-container">
      <bar-chart class="myvic-example-site__property-prices-bar-chart"
        :title="propertyPricesData.title"
        direction="vertical"
        :data="propertyPricesData"
        :showLegend="true"
        :shortDesc="propertyPricesData.title"
        :longDesc="longDescriptionUrls['property-prices-bar-chart']"
      />
    </div>
    <p class="myvic-example-site__text-block">
      Finally, the range of data blocks with trend icons below are showing the ABS data for the past quarter’s export
      price indices for a range of goods. Once again this is a live feed of a data updated quarterly by the ABS.
    </p>
    <div class="myvic-example-site__data-block-container">
      <data-block
        id="data-block-1"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiData"
      />
      <data-block
        id="data-block-2"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiMeatData"
      />
      <data-block
        id="data-block-3"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiCerealData"
      />
      <data-block
        id="data-block-4"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiMetalData"
      />
      <data-block
        id="data-block-4"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiCcbData"
      />
      <data-block
        id="data-block-4"
        class="myvic-example-site__data-block"
        :selectable="false"
        :data="epiTransportData"
      />
    </div>
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/myvic-data-block'
import BarChart from '@dpc-sdp/myvic-bar-chart'
import LineChart from '@dpc-sdp/myvic-line-chart'
import PieChart from '@dpc-sdp/myvic-pie-chart'
import TreeMap from '@dpc-sdp/myvic-treemap'
import {
  getArrivalsData,
  getCpiData,
  getIncomingPopulationData,
  getOutgoingPopulationData,
  getPropertyPricesData,
  getPedestrianData,
  getLabourForceData,
  getEpiData,
  getEpiMeatData,
  getEpiCerealData,
  getEpiMetalData,
  getEpiCcbData,
  getEpiTransportData
} from './utils/getData'
import {
  MyvicMapCore,
  MyvicMapVectorLayer,
  MyvicMapLegend,
  Style,
  Stroke,
  Fill,
  Circle
} from '@dpc-sdp/myvic-map-core'
import ol from '@dpc-sdp/myvic-map-core/lib/ol'

const startingChartData = { datasets: [], labels: [] }
const startingBlockData = { title: '', description: '' }
const longDescriptionUrls = {
  'arrivals-line-chart': 'sample-site-line-chart-visitors',
  'pedestrian-map': 'sample-site-map',
  'labour-force-line-chart': 'sample-site-line-chart-labour',
  'incoming-population-pie-chart': 'sample-site-pie-chart-increase',
  'outcoming-population-pie-chart': 'sample-site-pie-chart-decrease',
  'cpi-tree-map': 'sample-site-tree-map',
  'property-prices-bar-chart': 'sample-site-bar-chart'
}

/**
 * ExampleSite is a component showcasing various other components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    LineChart,
    PieChart,
    TreeMap,
    MyvicMapCore,
    MyvicMapVectorLayer,
    MyvicMapLegend
  },
  props: {
  },
  data () {
    return {
      longDescriptionUrls: longDescriptionUrls,
      arrivalsData: startingChartData,
      cpiData: [],
      pedestrianData: startingChartData,
      labourForceData: startingChartData,
      incomingPopulationData: startingChartData,
      outgoingPopulationData: startingChartData,
      propertyPricesData: startingChartData,
      epiData: startingBlockData,
      epiMeatData: startingBlockData,
      epiCerealData: startingBlockData,
      epiMetalData: startingBlockData,
      epiCcbData: startingBlockData,
      epiTransportData: startingBlockData,
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
      attributions: [
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> | ',
        `<a href="${longDescriptionUrls['pedestrian-map']}">Long Description</a> | `,
        '<a href="https://data.melbourne.vic.gov.au/Transport/Pedestrian-Counting-System-Sensor-Locations/h57g-5234/data" tabindex="0" target="_blank">Accessible Version</a>'
      ],
      pointStyles: {
        gray: new Style({
          image: new Circle({
            fill: new Fill({
              color: '#93979a'
            }),
            stroke: new Stroke({
              color: 'rgba(255,255,255,0.5)',
              width: 2
            }),
            radius: 8
          })
        }),
        lightBlue: new Style({
          image: new Circle({
            fill: new Fill({
              color: '#69ccec'
            }),
            stroke: new Stroke({
              color: 'rgba(255,255,255,0.5)',
              width: 2
            }),
            radius: 8
          })
        }),
        mediumBlue: new Style({
          image: new Circle({
            fill: new Fill({
              color: '#0596c7'
            }),
            stroke: new Stroke({
              color: 'rgba(255,255,255,0.5)',
              width: 2
            }),
            radius: 8
          })
        }),
        darkBlue: new Style({
          image: new Circle({
            fill: new Fill({
              color: '#004680'
            }),
            stroke: new Stroke({
              color: 'rgba(255,255,255,0.5)',
              width: 2
            }),
            radius: 8
          })
        }),
        darkerBlue: new Style({
          image: new Circle({
            fill: new Fill({
              color: '#000e1a'
            }),
            stroke: new Stroke({
              color: 'rgba(255,255,255,0.5)',
              width: 2
            }),
            radius: 8
          })
        })
      }
    }
  },
  mounted: async function () {
    const tasks = [
      getArrivalsData,
      getCpiData,
      getLabourForceData,
      getIncomingPopulationData,
      getOutgoingPopulationData,
      getPropertyPricesData,
      getEpiData,
      getEpiMeatData,
      getEpiCerealData,
      getEpiMetalData,
      getEpiCcbData,
      getEpiTransportData
    ].map(x => this.createDataFetchTask(x))
    const results = await Promise.all(tasks)
    this.arrivalsData = results[0]
    this.cpiData = results[1]
    this.labourForceData = results[2]
    this.incomingPopulationData = results[3]
    this.outgoingPopulationData = results[4]
    this.propertyPricesData = results[5]
    this.epiData = results[6]
    this.epiMeatData = results[7]
    this.epiCerealData = results[8]
    this.epiMetalData = results[9]
    this.epiCcbData = results[10]
    this.epiTransportData = results[11]
  },
  computed: {
  },
  methods: {
    createDataFetchTask: function (task) {
      return new Promise(async (resolve) => {
        try {
          let result = await task()
          resolve(result)
        } catch (error) {
          resolve({})
        }
      })
    },
    mapDataLoader: async function (extent, resolution, projection, vectorSource) {
      const sensors = await getPedestrianData()
      var pedestrianData = new ol.format.GeoJSON().readFeatures(sensors, {
        featureProjection: projection
      })
      if (pedestrianData.length > 0) {
        vectorSource.addFeatures(pedestrianData)
      }
    },
    generatePopupContent: function (features) {
      return {
        title: features[0].get('description'),
        value: 'Pedestrian count: ' + features[0].get('pedestrianCount')
      }
    },
    getMapLayerStyle: function (feature) {
      var count = Number(feature.get('pedestrianCount'))
      if (count === 0) return this.pointStyles.gray
      if (count <= 10) return this.pointStyles.lightBlue
      if (count <= 50) return this.pointStyles.mediumBlue
      if (count <= 100) return this.pointStyles.darkBlue
      return this.pointStyles.darkerBlue
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-example-site {
    display: relative;

    &__container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto 80px;
    }
    &__header-h1 {
      color: $titleColor;
      padding-top: 2rem;
      padding-bottom: 20px;
      line-height: normal;
    }
    &__header {
      color: $titleColor;
      padding-top: 2rem;
    }
    &__text-block {
      text-align: justify;
    }
    &__chart-container {
      margin-left: -10px;
      margin-top: 2rem;
      margin-bottom: 3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    &__map-container {
      width: 100%;
      margin-top: 2rem;
      margin-bottom: 3rem;
      height: 560px;
    }
    &__arrivals-line-chart {
      height: 500px;
      width: 100%;
    }
    &__cpi-tree-map {
      height: 400px;
      width: 100%;
      max-width: 70%;
      margin: 0 auto;
    }
    &__labour-force-line-chart {
      height: 350px;
      width: 100%;
    }
    &__population-pie-chart {
      height: 300px;
      width: 300px;
    }
    &__property-prices-bar-chart {
      height: 550px;
      min-width: 95%;
      max-width: 95%;
    }
    &__data-block-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin: 60px -10px 20px;
    }
    &__data-block {
      width: 30%;
      min-width: 170px;
      margin: 10px 10px;
    }
    &__legend-layer-gray {
      background-color: #93979a;
      width: 14px;
      height: 14px;
      border-radius: 25px;
    }
    &__legend-layer-lightBlue {
      background-color: #69ccec;
      width: 14px;
      height: 14px;
      border-radius: 25px;
    }
    &__legend-layer-mediumBlue {
      background-color: #0596c7;
      width: 14px;
      height: 14px;
      border-radius: 25px;
    }
    &__legend-layer-darkBlue {
      background-color: #004680;
      width: 14px;
      height: 14px;
      border-radius: 25px;
    }
    &__legend-layer-darkerBlue {
      background-color: #000e1a;
      width: 14px;
      height: 14px;
      border-radius: 25px;
    }
    &__legend-label {
      position: relative;
      top: 1px;
      left: 2px;
      font-size: 14px;
    }
  }
</style>
