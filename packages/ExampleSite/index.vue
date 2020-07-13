<template>
  <div class="yourvic-example-site__container">
    <h1 class="yourvic-example-site__header-h1">This page has been created to showcase the charting and mapping components
      derived from the MyVictoria website
    </h1>
    <p class="yourvic-example-site__text-block">
      The charting of the COVID-19 pandemic has turned into an international pastime, with graphs demonstrating new daily cases,
      case severity and active case hot spots being closely watched day by day. This site looks to draw off the national interest
      in the pandemic but with a longer-term lens, looking at economic and social impacts of the physical distancing measures
      and the ensuing contraction of a globalised economy.
    </p>
    <p class="yourvic-example-site__text-block">
      This site uses live data published by the Australian Bureau of Statistics coupled with the Victorian Department of Premier
      and Cabinet developer toolkit for graphic demonstration of data by way of graphs and maps.
    </p>
    <h3 class="yourvic-example-site__header">People on the Streets</h3>
    <p class="yourvic-example-site__text-block">
      Trends around the world have been pushing for increased connectivity on a global scale, international holidays and work
      trips have been a commonplace occurrence for many. As the COVID pandemic began to get its foothold ‘stay at home’ orders
      were published around the world. The reduction in visitors to Australia has been the first indicator of behavioural change
      as a result of these orders, below is a graph of the monthly visitor numbers coming to Australia.
    </p>
    <div class="yourvic-example-site__chart-container">
      <line-chart class="yourvic-example-site__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
      />
    </div>
    <p class="yourvic-example-site__text-block">
      Here in Melbourne pedestrian activity slumped in late March and early April but has been increasing gently since. Below
      are the City of Melbourne’s Pedestrian counters currently registering activity in the area. To provide further context,
      the City of Melbourne usually attracts an average of 845,000 visitors every day.
    </p>
    <div class="yourvic-example-site__map-container">
      <yourvic-map-core
        :center="center"
        :zoom="8"
        :minZoom="1"
        :baseMapUrl="baseMapUrl"
        :popupContentFunction="generatePopupContent"
        ariaLabel="An interactive map"
      >
        <yourvic-map-vector-layer
          :loader="mapDataLoader"
          dataFormat="GeoJSON"
          loadingStrategy="all"
          :zoomToExtent="true"
          :layerStyle="getMapLayerStyle"
          :enablePopup="true"
          :attributions="attributions"
        />
        <yourvic-map-legend
          :type="'custom'"
          :title="'Number of pedestrians'"
        >
          <table style="width:100%">
            <tr>
              <td><div class="yourvic-example-site__legend-layer-gray" /></td>
              <td class="yourvic-example-site__legend-label">No pedestrians</td>
            </tr>
            <tr>
              <td><div class="yourvic-example-site__legend-layer-lightBlue" /></td>
              <td class="yourvic-example-site__legend-label">1-10</td>
            </tr>
            <tr>
              <td><div class="yourvic-example-site__legend-layer-mediumBlue" /></td>
              <td class="yourvic-example-site__legend-label">11-50</td>
            </tr>
            <tr>
              <td><div class="yourvic-example-site__legend-layer-darkBlue" /></td>
              <td class="yourvic-example-site__legend-label">51-100</td>
            </tr>
            <tr>
              <td><div class="yourvic-example-site__legend-layer-darkerBlue" /></td>
              <td class="yourvic-example-site__legend-label">More than 100</td>
            </tr>
          </table>
        </yourvic-map-legend>
      </yourvic-map-core>
    </div>
    <p class="yourvic-example-site__text-block">
      With the ‘stay at home’ directive in place the luxury of doing one’s job from home has not been afforded to all, while
      many have pivoted to different working conditions some of the workforce has been put on breaks from their vocation.
      Below is a graph showing the labour force in Victoria broken down by sex.
    </p>
    <div class="yourvic-example-site__chart-container">
      <line-chart class="yourvic-example-site__labour-force-line-chart"
        :title="labourForceData.title"
        :data="labourForceData"
        :showLegend="true"
        dataFormat="thousand"
        :shortDesc="'Labour Force by Sex'"
      />
    </div>
    <p class="yourvic-example-site__text-block">
      While we’re expecting wild fluctuations in the increasing and decreasing sources for the Victorians population clock,
      these have not been felt yet as Victoria’s net population continues to increase overall. Below are some charts showing
      the breakup of increasing and decreasing sources of Victoria’s population.
    </p>
    <div class="yourvic-example-site__chart-container">
      <pie-chart class="yourvic-example-site__population-pie-chart"
        :title="incomingPopulationData.title"
        :data="incomingPopulationData"
        :showLegend="true"
        :shortDesc="'Incoming Population'"
      />
      <pie-chart class="yourvic-example-site__population-pie-chart"
        :title="outgoingPopulationData.title"
        :data="outgoingPopulationData"
        :showLegend="true"
        :shortDesc="'Outgoing Population'"
      />
    </div>
    <h3 class="yourvic-example-site__header">Hey Big Spender</h3>
    <p class="yourvic-example-site__text-block">
      It’s no surprise that with changes to the workforce there may be changes to the spending habits of Australians with
      lowered consumer confidence. Tighter purse strings may reduce discretionary spending in various sectors, while the
      actuality of potential lockdown measures may mean peaks in panic shopping of certain sectors. Below are the Consumer
      Price Indices for a range of Goods and Services in Melbourne.
    </p>
    <div class="yourvic-example-site__chart-container">
      <tree-map class="yourvic-example-site__cpi-tree-map"
        :title="'CPI for a range of goods and services'"
        :data="cpiData"
        :valueAttr="'value'"
        :labelAttr="'label'"
        :shortDesc="'CPI for a range of goods and services'"
        />
    </div>
    <p class="yourvic-example-site__text-block">
      Similarly, the long-term leap consumers would be making into the property market has faltered, demonstrated itself
      to be a fickle creature. With every article published on the downturn of the property market in capital cities consumer
      confidence begins to take a hit. Below is a graph of the Greater Melbourne Residential Property Price Index demonstrating
      this change.
    </p>
    <div class="yourvic-example-site__chart-container">
      <bar-chart class="yourvic-example-site__property-prices-bar-chart"
        :title="propertyPricesData.title"
        direction="vertical"
        :data="propertyPricesData"
        :showLegend="true"
        :shortDesc="propertyPricesData.title"
      />
    </div>
    <p class="yourvic-example-site__text-block">
      Hold your hats, it’s not all doom and gloom in Australia right now. Our economy is demonstrating that exports of goods
      and services remains to be a strong point, and even in the contraction of individuals international travel this has not
      hampered the exports from Australia. Below are some trends we’re seeing in the Export Price Index in Australia compared
      to the last quarter.
    </p>
    <div class="yourvic-example-site__data-block-container">
      <data-block
        id="data-block-1"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiData"
      />
      <data-block
        id="data-block-2"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiMeatData"
      />
      <data-block
        id="data-block-3"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiCerealData"
      />
      <data-block
        id="data-block-4"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiMetalData"
      />
      <data-block
        id="data-block-4"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiCcbData"
      />
      <data-block
        id="data-block-4"
        class="yourvic-example-site__data-block"
        :selectable="false"
        :data="epiTransportData"
      />
    </div>
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'
import LineChart from '@dpc-sdp/yourvic-line-chart'
import PieChart from '@dpc-sdp/yourvic-pie-chart'
import TreeMap from '@dpc-sdp/yourvic-treemap'
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
  YourvicMapCore,
  YourvicMapVectorLayer,
  YourvicMapLegend,
  Style,
  Stroke,
  Fill,
  Circle
} from '@dpc-sdp/yourvic-map-core'
import ol from '@dpc-sdp/yourvic-map-core/lib/ol'

const startingChartData = { datasets: [], labels: [] }
const startingBlockData = { title: '', description: '' }

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
    YourvicMapCore,
    YourvicMapVectorLayer,
    YourvicMapLegend
  },
  props: {
  },
  data () {
    return {
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
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        ' | ',
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
      return new Promise(async (resolve, reject) => {
        try {
          let result = await task()
          resolve(result)
        } catch (error) {
          console.error(error)
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
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-example-site {
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
