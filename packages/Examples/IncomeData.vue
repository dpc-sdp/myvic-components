<template>
  <div class="myvic-examples__container">
    <div class="myvic-examples__data-block-container">
      <data-block
        id="data-block-1"
        class="myvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-1'"
        :data="personalIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-2"
        class="myvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-2'"
        :data="personalIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-3"
        class="myvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-3'"
        :data="householdIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-4"
        class="myvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-4'"
        :data="householdIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
    </div>
    <div class="myvic-examples__bottom-row">
      <div class="myvic-examples__chart-container">
        <bar-chart class="myvic-examples__bar-chart"
          :data="chartData"
          :title="chartTitle"
          :showLegend="showChartLegend"
          data-format="percentage"
          :shortDesc="chartTitle"
          :longDesc="'https://example.visualise.myvictoria.vic.gov.au/demo/bundle-3-bar-chart'"
        />
      </div>
      <div class="myvic-examples__map-container">
        <myvic-map-core
          :center="center"
          :zoom="11"
          ariaLabel="An interactive map showing income statistics"
        >
          <myvic-map-vector-tile-layer
            :url="getVectorTileWmtsUrl()"
            dataFormat="MVT"
            mapboxStyleMethod="stylefunction"
            :mapboxStyle="mapboxStyle"
            mapboxStyleSource="Blue"
            :attributions="attributions"
          />
          <myvic-map-vector-layer
            :url="labelLayerUrl"
            dataFormat="GeoJSON"
            labelAttribute="full_name"
            labelOnly
          />
          <myvic-map-legend
              type="gradient"
              :title="legendTitle"
              :gradientRange="legendData"
            >
            </myvic-map-legend>
        </myvic-map-core>
      </div>
    </div>
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/myvic-data-block'
import BarChart from '@dpc-sdp/myvic-bar-chart'
import { getGeneralIncomeData, getIncomeData, getLegendData, LEGEND_TITLES, MAP_LAYERS } from './utils/getData'
import {
  MyvicMapCore,
  MyvicMapVectorTileLayer,
  MyvicMapVectorLayer,
  MyvicMapLegend
} from '@dpc-sdp/myvic-map-core'
import { commarize } from '@dpc-sdp/myvic-global/utils/formatting'
import {
  createWfsRequestUrl,
  myVictoriaRotatingColours,
  myVictoriaLayerStops,
  buildMyVictoriaMapboxStyle
} from '@dpc-sdp/myvic-global/utils/geoserver_requests'

/**
 * IncomeData is a component showcasing the area search, data block and bar chart components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    MyvicMapCore,
    MyvicMapVectorLayer,
    MyvicMapVectorTileLayer,
    MyvicMapLegend
  },
  props: {
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
      labelLayerUrl: 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/myvic/wfs?SERVICE=wfs&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=myvic:label_lga&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json',
      mapboxStyle: undefined,
      area: {
        id: 'LGA24600',
        name: 'City of Melbourne',
        description: 'lga'
      },
      activeBlock: 'data-block-1',
      generalIncomeData: {},
      incomeData: {},
      legendData: { low: '0%', high: '100%' },
      attributions: [
        '<a href="https://example.visualise.myvictoria.vic.gov.au/demo/bundle-3-map" tabindex="0" target="_blank">Accessible Version</a>'
      ]
    }
  },
  mounted: async function () {
    await this.selectArea('area-search', this.area)
    this.mapboxStyle = await buildMyVictoriaMapboxStyle(
      myVictoriaRotatingColours.blue,
      myVictoriaLayerStops.income_personal_lga,
      'median_total_personal_income_weekly',
      'income_lga_map')
  },
  computed: {
    layerUrl: function () {
      return createWfsRequestUrl(this.area.id, this.area.description)
    },
    personalIncomeData: function () {
      if (!this.generalIncomeData.medianPersonalIncomeWeekly) {
        return { title: '', description: '' }
      } else {
        return {
          title: `$${commarize(this.generalIncomeData.medianPersonalIncomeWeekly)}`,
          description: 'Total median personal income per week'
        }
      }
    },
    personalIncomeGrowthData: function () {
      if (!this.generalIncomeData.medianPersonalIncomeWeeklyGrowth) {
        return { title: '', description: '' }
      } else {
        return {
          title: String(this.generalIncomeData.medianPersonalIncomeWeeklyGrowth) + '%',
          description: `Personal income growth since 2011 for ${this.area.name}`,
          trend: this.generalIncomeData.medianPersonalIncomeWeeklyGrowth > 0 ? 'up' : 'down'
        }
      }
    },
    householdIncomeData: function () {
      if (!this.generalIncomeData.medianHouseholdIncomeWeekly) {
        return { title: '', description: '' }
      } else {
        return {
          title: `$${commarize(this.generalIncomeData.medianHouseholdIncomeWeekly)}`,
          description: 'Total median household income per week'
        }
      }
    },
    householdIncomeGrowthData: function () {
      if (!this.generalIncomeData.medianHouseholdIncomeWeeklyGrowth) {
        return { title: '', description: '' }
      } else {
        return {
          title: String(this.generalIncomeData.medianHouseholdIncomeWeeklyGrowth) + '%',
          description: `Household income growth since 2011 for ${this.area.name}`,
          trend: this.generalIncomeData.medianHouseholdIncomeWeeklyGrowth > 0 ? 'up' : 'down'
        }
      }
    },
    chartData: function () {
      let blockData = this.incomeData[this.activeBlock]
      if (!blockData) {
        return { datasets: [], labels: [] }
      } else {
        return blockData
      }
    },
    chartTitle: function () {
      let blockData = this.incomeData[this.activeBlock]
      if (!blockData) {
        return ''
      } else {
        return blockData.title
      }
    },
    legendTitle: function () {
      return LEGEND_TITLES[this.activeBlock] || ''
    },
    showChartLegend: function () {
      let blockData = this.incomeData[this.activeBlock]
      if (!blockData) {
        return false
      } else {
        return blockData.datasets.length > 1
      }
    }
  },
  methods: {
    selectBlock: async function (blockId) {
      this.activeBlock = blockId
      await this.getLegendData()
      switch (blockId) {
        case 'data-block-1':
          this.mapboxStyle = await buildMyVictoriaMapboxStyle(
            myVictoriaRotatingColours.blue,
            myVictoriaLayerStops.income_personal_lga,
            'median_total_personal_income_weekly',
            'income_lga_map')
          break
        case 'data-block-2':
          this.mapboxStyle = await buildMyVictoriaMapboxStyle(
            myVictoriaRotatingColours.blue,
            myVictoriaLayerStops.income_personal_growth_lga,
            'total_person_growth',
            'income_lga_map')
          break
        case 'data-block-3':
          this.mapboxStyle = await buildMyVictoriaMapboxStyle(
            myVictoriaRotatingColours.blue,
            myVictoriaLayerStops.income_household_lga,
            'median_total_household_income_weekly',
            'income_lga_map')
          break
        case 'data-block-4':
          this.mapboxStyle = await buildMyVictoriaMapboxStyle(
            myVictoriaRotatingColours.blue,
            myVictoriaLayerStops.income_household_growth_lga,
            'total_family_growth',
            'income_lga_map')
          break
        default:
          this.mapboxStyle = await buildMyVictoriaMapboxStyle(
            myVictoriaRotatingColours.blue,
            myVictoriaLayerStops.income_household_growth_lga,
            'total_family_growth',
            'income_lga_map')
      }
    },
    selectArea: async function (searchComponent, area) {
      this.area = area
      this.generalIncomeData = await getGeneralIncomeData(area)
      this.incomeData = await getIncomeData(area)
      await this.getLegendData()
    },
    getLegendData: async function () {
      let mapLayer = MAP_LAYERS[this.activeBlock]
      this.legendData = await getLegendData(mapLayer, this.area.description)
    },
    getVectorTileWmtsUrl: () => {
      let path = `https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/gwc/service/wmts`
      let queryParams = {
        SERVICE: 'WMTS',
        REQUEST: 'GetTile',
        VERSION: '1.0.0',
        LAYER: `myvic:income_lga_map`,
        STYLE: '',
        TILEMATRIX: `EPSG:3857:{z}`,
        TILEMATRIXSET: 'EPSG:3857',
        FORMAT: 'application/x-protobuf;type=mapbox-vector',
        TILECOL: '{x}',
        TILEROW: '{y}'
      }
      let queryParamsString = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')
      return `${path}?${queryParamsString}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-examples {
    display: relative;

    &__container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto 0;
    }
    &__data-block-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 60px 0 20px;
    }
    &__data-block {
      width: 35%;
      min-width: 130px;
      max-width: 180px;
      margin: 10px 10px;
    }
    &__bottom-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 40px 8px 20px;
    }
    &__chart-container {
      flex-basis: calc(50% - 30px);
      flex-grow: 1;
      min-width: 290px;
      margin-right: 10px;
    }
    &__bar-chart {
      height: 400px;
      margin-bottom: 15px;
    }
    &__map-container {
      flex-basis: calc(50% - 30px);
      flex-grow: 1;
      min-width: 290px;
      height: 400px;
      margin-left: 10px;
    }
  }
</style>
