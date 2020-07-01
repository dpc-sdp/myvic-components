<template>
  <div class="yourvic-examples__container">
    <div class="yourvic-examples__data-block-container">
      <data-block
        id="data-block-1"
        class="yourvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-1'"
        :data="personalIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-2"
        class="yourvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-2'"
        :data="personalIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-3"
        class="yourvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-3'"
        :data="householdIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-4"
        class="yourvic-examples__data-block"
        :isSelected="activeBlock === 'data-block-4'"
        :data="householdIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
    </div>
    <div class="yourvic-examples__bottom-row">
      <div class="yourvic-examples__chart-container">
        <bar-chart class="yourvic-examples__bar-chart"
          :data="chartData"
          :title="chartTitle"
          :showLegend="showChartLegend"
          data-format="percentage"
        />
      </div>
      <div class="yourvic-examples__map-container">
        <yourvic-map-core
          :center="center"
          :zoom="11"
        >
          <yourvic-map-vector-tile-layer
            :url="getVectorTileWmtsUrl()"
            dataFormat="MVT"
            mapboxStyleMethod="stylefunction"
            :mapboxStyle="mapboxStyle"
            mapboxStyleSource="Blue"
          />
          <yourvic-map-vector-layer
            :url="labelLayerUrl"
            dataFormat="GeoJSON"
            labelAttribute="full_name"
            labelOnly
          />
          <yourvic-map-legend
              type="gradient"
              :title="legendTitle"
              :gradientRange="legendData"
            >
            </yourvic-map-legend>
        </yourvic-map-core>
      </div>
    </div>
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'
import { getGeneralIncomeData, getIncomeData, getLegendData, getMapboxStyle, LEGEND_TITLES, MAP_LAYERS } from './utils/getData'
import {
  YourvicMapCore,
  YourvicMapVectorTileLayer,
  YourvicMapVectorLayer,
  YourvicMapLegend
} from '@dpc-sdp/yourvic-map-core'
import { commarize } from '@dpc-sdp/yourvic-global/utils/formatting'
import { createWfsRequestUrl } from '@dpc-sdp/yourvic-global/utils/geoserver_requests'

/**
 * IncomeData is a component showcasing the area search, data block and bar chart components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    YourvicMapCore,
    YourvicMapVectorLayer,
    YourvicMapVectorTileLayer,
    YourvicMapLegend
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
      legendData: { low: '0%', high: '100%' }
    }
  },
  mounted: async function () {
    this.selectArea('area-search', this.area)
    this.mapboxStyle = await getMapboxStyle()
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
    selectBlock: function (blockId) {
      this.activeBlock = blockId
      this.getLegendData()
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
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-examples {
    display: relative;

    &__container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto 0;
    }
    &__data-block-container {
      display: flex;
      justify-content: space-evenly;
      margin: 60px -10px 20px;
    }
    &__data-block {
      width: 30%;
      margin: 0 10px;
    }
    &__bottom-row {
      display: flex;
      margin: 40px 0 20px;
    }
    &__chart-container {
      width: 100%;
      max-width: calc(50% - 30px);
      margin-right: 30px;
    }
    &__bar-chart {
      height: 400px;
    }
    &__map-container {
      width: 50%;
      margin-left: 10px;
    }
  }
</style>