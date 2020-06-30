<template>
  <div class="yourvic-example3__container">
    <div class="yourvic-example3__data-block-container">
      <data-block
        id="data-block-1"
        class="yourvic-example3__data-block"
        :isSelected="activeBlock === 'data-block-1'"
        :data="personalIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-2"
        class="yourvic-example3__data-block"
        :isSelected="activeBlock === 'data-block-2'"
        :data="personalIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-3"
        class="yourvic-example3__data-block"
        :isSelected="activeBlock === 'data-block-3'"
        :data="householdIncomeData"
        @data-block-selected="selectBlock"
      />
      <data-block
        id="data-block-4"
        class="yourvic-example3__data-block"
        :isSelected="activeBlock === 'data-block-4'"
        :data="householdIncomeGrowthData"
        @data-block-selected="selectBlock"
      />
    </div>
    <div class="yourvic-example3__bottom-row">
      <div class="yourvic-example3__chart-container">
        <bar-chart class="yourvic-example3__bar-chart"
          :data="chartData"
          :title="chartTitle"
          :showLegend="showChartLegend"
          data-format="percentage"
        />
      </div>
      <div class="yourvic-example3__map-container">
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
import { getDemographicData, getIncomeData, getLegendData, LEGEND_TITLES, MAP_LAYERS } from './utils/getData'
import {
  YourvicMapCore,
  YourvicMapTileLayer,
  YourvicMapVectorTileLayer,
  YourvicMapVectorLayer,
  YourvicMapLegend
} from '@dpc-sdp/yourvic-map-core'
import { commarize } from '@dpc-sdp/yourvic-global/utils/formatting'
import { createWfsRequestUrl } from '@dpc-sdp/yourvic-global/utils/geoserver_requests'

/**
 * Example 1 is a component showcasing the area search, data block and bar chart components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    YourvicMapCore,
    YourvicMapTileLayer,
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
      demData: {},
      incomeData: {},
      legendData: { low: '0%', high: '100%' }
    }
  },
  mounted: async function () {
    this.selectArea('area-search', this.area)
    this.mapboxStyle = await this.getMapboxStyle()
  },
  computed: {
    layerUrl: function () {
      return createWfsRequestUrl(this.area.id, this.area.description)
    },
    personalIncomeData: function () {
      if (!this.demData.medianPersonalIncomeWeekly) {
        return { title: '', description: '' }
      } else {
        return {
          title: `$${commarize(this.demData.medianPersonalIncomeWeekly)}`,
          description: 'Total median personal income per week'
        }
      }
    },
    personalIncomeGrowthData: function () {
      if (!this.demData.medianPersonalIncomeWeeklyGrowth) {
        return { title: '', description: '' }
      } else {
        return {
          title: String(this.demData.medianPersonalIncomeWeeklyGrowth) + '%',
          description: `Personal income growth since 2011 for ${this.area.name}`,
          trend: this.demData.medianPersonalIncomeWeeklyGrowth > 0 ? 'up' : 'down'
        }
      }
    },
    householdIncomeData: function () {
      if (!this.demData.medianHouseholdIncomeWeekly) {
        return { title: '', description: '' }
      } else {
        return {
          title: `$${commarize(this.demData.medianHouseholdIncomeWeekly)}`,
          description: 'Total median household income per week'
        }
      }
    },
    householdIncomeGrowthData: function () {
      if (!this.demData.medianHouseholdIncomeWeeklyGrowth) {
        return { title: '', description: '' }
      } else {
        return {
          title: String(this.demData.medianHouseholdIncomeWeeklyGrowth) + '%',
          description: `Household income growth since 2011 for ${this.area.name}`,
          trend: this.demData.medianHouseholdIncomeWeeklyGrowth > 0 ? 'up' : 'down'
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
      this.demData = await getDemographicData(area)
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
    },
    getMapboxStyle: async () => {
      let response = await fetch('https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/rest/styles/Blue.MBStyle')
      let glStyle = await response.json()
      let stops = [377, 472, 532, 597, 674, 758, 902]
      let fillStops = glStyle.layers[0].paint['fill-color'].stops
      fillStops.forEach((stop, idx) => {
        stop[0] = parseFloat(stops[idx])
      })
      glStyle.layers[0].paint['fill-outline-color']['property'] = 'median_total_personal_income_weekly'
      glStyle.layers[0].paint['fill-color']['property'] = 'median_total_personal_income_weekly'
      glStyle.layers[0]['source-layer'] = 'income_lga_map'
      glStyle.sources = {
        Blue: {
          type: 'vector'
        }
      }
      return glStyle
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-example3 {
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
