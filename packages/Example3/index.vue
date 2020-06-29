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
          :zoom="12"
          :minZoom="8"
          :baseMapUrl="baseMapUrl"
        >
          <yourvic-map-vector-layer
            :url="layerUrl"
            dataFormat="GeoJSON"
            loadingStrategy="bbox"
            :zoomToExtent="true"
          />
        </yourvic-map-core>
      </div>
    </div>
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'
import { getDemographicData, getIncomeData, commarize, createWfsRequestUrl } from './utils/getData'
import { YourvicMapCore, YourvicMapVectorLayer } from '@dpc-sdp/yourvic-map-core'

/**
 * Example 1 is a component showcasing the area search, data block and bar chart components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    YourvicMapCore,
    YourvicMapVectorLayer
  },
  props: {
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
      area: {
        id: 'LGA24600',
        name: 'City of Melbourne',
        description: 'lga'
      },
      activeBlock: 'data-block-1',
      demData: {},
      incomeData: {}
    }
  },
  mounted: async function () {
    this.selectArea('area-search', this.area)
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
    },
    selectArea: async function (searchComponent, area) {
      this.area = area
      this.demData = await getDemographicData(area)
      this.incomeData = await getIncomeData(area)
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
