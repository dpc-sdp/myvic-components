<template>
  <div class="yourvic-examples__container">
    <p class="yourvic-examples__text-block">
      The charting of the COVID-19 pandemic has turned into an international pastime, with graphs demonstrating new daily cases,
      case severity and active case hot spots being closely watched day by day. This site looks to draw off the national interest
      in the pandemic but with a longer-term lens, looking at economic and social impacts of the physical distancing measures
      and the ensuing contraction of a globalised economy.
    </p>
    <p class="yourvic-examples__text-block">
      This site uses live data published by the Australian Bureau of Statistics coupled with the Victorian Department of Premier
      and Cabinet developer toolkit for graphic demonstration of data by way of graphs and maps.
    </p>
    <h3 class="yourvic-examples__header">People on the Streets</h3>
    <p class="yourvic-examples__text-block">
      Trends around the world have been pushing for increased connectivity on a global scale, international holidays and work
      trips have been a commonplace occurrence for many. As the COVID pandemic began to get its foothold ‘stay at home’ orders
      were published around the world. The reduction in visitors to Australia has been the first indicator of behavioural change
      as a result of these orders, below is a graph of the monthly visitor numbers coming to Australia.
    </p>
    <div class="yourvic-examples__chart-container">
      <line-chart class="yourvic-examples__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
      />
    </div>
    <p class="yourvic-examples__text-block">
      Here in Melbourne pedestrian activity slumped in late March and early April but has been increasing gently since. Below
      are the City of Melbourne’s Pedestrian counters currently registering activity in the area. To provide further context,
      the City of Melbourne usually attracts an average of 845,000 visitors every day.
    </p>
    <div class="yourvic-examples__chart-container">
      <!-- <line-chart class="yourvic-examples__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
      /> -->
    </div>
    <p class="yourvic-examples__text-block">
      With the ‘stay at home’ directive in place the luxury of doing one’s job from home has not been afforded to all, while
      many have pivoted to different working conditions some of the workforce has been put on breaks from their vocation.
      Below is a graph showing the labour force in Victoria broken down by sex.
    </p>
    <div class="yourvic-examples__chart-container">
      <line-chart class="yourvic-examples__labour-force-line-chart"
        :title="labourForceData.title"
        :data="labourForceData"
        :showLegend="true"
        :shortDesc="'Labour Force by Sex'"
      />
    </div>
    <p class="yourvic-examples__text-block">
      While we’re expecting wild fluctuations in the increasing and decreasing sources for the Victorians population clock,
      these have not been felt yet as Victoria’s net population continues to increase overall. Below are some charts showing
      the breakup of increasing and decreasing sources of Victoria’s population.
    </p>
    <h3 class="yourvic-examples__header">Hey Big Spender</h3>
    <p class="yourvic-examples__text-block">
      It’s no surprise that with changes to the workforce there may be changes to the spending habits of Australians with
      lowered consumer confidence. Tighter purse strings may reduce discretionary spending in various sectors, while the
      actuality of potential lockdown measures may mean peaks in panic shopping of certain sectors. Below are the Consumer
      Price Indices for a range of Goods and Services in Melbourne.
    </p>
    <div class="yourvic-examples__chart-container">
      <!-- <line-chart class="yourvic-examples__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
      /> -->
    </div>
    <p class="yourvic-examples__text-block">
      Similarly, the long-term leap consumers would be making into the property market has faltered, demonstrated itself
      to be a fickle creature. With every article published on the downturn of the property market in capital cities consumer
      confidence begins to take a hit. Below is a graph of the Greater Melbourne Residential Property Price Index demonstrating
      this change.
    </p>
    <div class="yourvic-examples__chart-container">
      <!-- <line-chart class="yourvic-examples__arrivals-line-chart"
        :title="arrivalsData.title"
        :data="arrivalsData"
        :shortDesc="'Arrivals by month'"
      /> -->
    </div>
    <p class="yourvic-examples__text-block">
      Hold your hats, it’s not all doom and gloom in Australia right now. Our economy is demonstrating that exports of goods
      and services remains to be a strong point, and even in the contraction of individuals international travel this has not
      hampered the exports from Australia. Below are some trends we’re seeing in the Export Price Index in Australia compared
      to the last quarter.
    </p>

    <pie-chart
      :title="incomingPopulationData.title"
      :data="incomingPopulationData"
      :showLegend="true"
      :shortDesc="'Incoming Population'"
     />
    <pie-chart
      :title="outgoingPopulationData.title"
      :data="outgoingPopulationData"
      :showLegend="true"
      :shortDesc="'Outgoing Population'"
     />
    <bar-chart
      :title="propertyPricesData.title"
      :data="propertyPricesData"
      :showLegend="true"
    />
  </div>
</template>
<script>

import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'
import LineChart from '@dpc-sdp/yourvic-line-chart'
import PieChart from '@dpc-sdp/yourvic-pie-chart'
import {
  getArrivalsData,
  getIncomingPopulationData,
  getOutgoingPopulationData,
  getPropertyPricesData,
  getPedestrianData,
  getLabourForceData
} from './utils/getData'
import {
  YourvicMapCore,
  YourvicMapVectorTileLayer,
  YourvicMapVectorLayer,
  YourvicMapLegend
} from '@dpc-sdp/yourvic-map-core'
// import { commarize } from '@dpc-sdp/yourvic-global/utils/formatting'

const startingChartData = { datasets: [], labels: [] }

/**
 * ExampleSite is a component showcasing various other components
 */
export default {
  components: {
    DataBlock,
    BarChart,
    LineChart,
    PieChart,
    YourvicMapCore,
    YourvicMapVectorLayer,
    YourvicMapVectorTileLayer,
    YourvicMapLegend
  },
  props: {
  },
  data () {
    return {
      arrivalsData: startingChartData,
      pedestrianData: startingChartData,
      labourForceData: startingChartData,
      incomingPopulationData: startingChartData,
      outgoingPopulationData: startingChartData,
      propertyPricesData: startingChartData
    }
  },
  mounted: async function () {
    const tasks = [
      getArrivalsData,
      getPedestrianData,
      getLabourForceData,
      getIncomingPopulationData,
      getOutgoingPopulationData,
      getPropertyPricesData
    ].map(x => this.createDataFetchTask(x))
    const results = await Promise.all(tasks)
    this.arrivalsData = results[0]
    this.pedestrianData = results[1]
    this.labourForceData = results[2]
    this.incomingPopulationData = results[3]
    this.outgoingPopulationData = results[4]
    this.propertyPricesData = results[5]
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
    &__header {
      color: $titleColor;
      padding-top: 2rem;
    }
    &__text-block {
      text-align: justify;
    }
    &__chart-container {
      margin-left: -10px;
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
    &__arrivals-line-chart {
      height: 500px;
    }
    &__labour-force-line-chart {
      height: 350px;
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
    &__bar-chart {
      height: 400px;
    }
    &__arrivals-line-chart {
      height: 400px;
    }
    &__map-container {
      width: 50%;
      margin-left: 10px;
    }
  }
</style>
