<template>
  <div class="myvic-examples__container">
    <area-search
      :initial-value="area.name"
      @item-selected="selectArea"
    />
    <div class="myvic-examples__data-block-container">
      <data-block class="myvic-examples__data-block" :data="populationData" :selectable="false" />
      <data-block class="myvic-examples__data-block" :data="populationGrowthData" :selectable="false" />
    </div>
    <div class="myvic-examples__chart-container">
      <bar-chart class="myvic-examples__bar-chart"
        :data="chartData" title="Household composition"
        data-format="percentage"
        :shortDesc="'Bar chart showing household composition'"
        :longDesc="'https://example.visualise.myvictoria.vic.gov.au/demo/bundle-1-bar-chart'"
      />
    </div>
  </div>
</template>
<script>

import { AreaSearch } from '@dpc-sdp/myvic-areasearch'
import DataBlock from '@dpc-sdp/myvic-data-block'
import BarChart from '@dpc-sdp/myvic-bar-chart'
import { getDemographicData } from './utils/getData'
import { commarize } from '@dpc-sdp/myvic-global/utils/formatting'

/**
 * AreaWithData is a component showcasing the area search, data block and bar chart components
 */
export default {
  components: {
    AreaSearch,
    DataBlock,
    BarChart
  },
  props: {
  },
  data () {
    return {
      area: {
        id: 'LGA24600',
        name: 'City of Melbourne',
        description: 'lga'
      },
      demData: {}
    }
  },
  mounted: async function () {
    this.selectArea('area-search', this.area)
  },
  computed: {
    populationData: function () {
      if (!this.demData.totalPopulation) {
        return { title: '', description: '' }
      } else {
        return {
          title: commarize(this.demData.totalPopulation),
          description: 'Total population'
        }
      }
    },
    populationGrowthData: function () {
      if (!this.demData.populationGrowth) {
        return { title: '', description: '' }
      } else {
        return {
          title: String(this.demData.populationGrowth) + '%',
          description: `Population growth since 2011 for ${this.area.name}`,
          trend: this.demData.populationGrowth > 0 ? 'up' : 'down'
        }
      }
    },
    chartData: function () {
      if (!this.demData.familyTotalPercent) {
        return { datasets: [], labels: [] }
      } else {
        return {
          labels: ['Family households', 'Group of people', 'Single person'],
          datasets: [
            {
              label: '',
              data: [this.demData.familyTotalPercent, this.demData.groupOfPeoplePercent, this.demData.singlePersonPercent]
            }
          ]
        }
      }
    }
  },
  methods: {
    selectArea: async function (searchComponent, area) {
      this.area = area
      this.demData = await getDemographicData(area)
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
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin: 60px 0 20px;
    }
    &__data-block {
      width: 35%;
      min-width: 145px;
      max-width: 180px;
    }
    &__chart-container {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }
    &__bar-chart {
      width: 100%;
      max-width: 50%;
      min-width: 280px;
      height: 280px;
    }
  }
</style>
