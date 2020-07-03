<template>
  <rpl-base-layout class="yourvic-example-layout">
    <div slot="header" class="yourvic-example-header">
        <rpl-site-header />
    </div>
    <rpl-page-layout class="yourvic-example-main">
      <rpl-container>
        <rpl-row row-gutter>
          <rpl-col cols="full">
            <div>
              <yourvic-map-core
                :containerStyle="{ position: 'relative', width: '100%', height:'400px' }"
                :center="[16138405.843820328, -4552817.013522999]"
                :zoom="12"
                :enableSelectInteraction="true"
              >
                <yourvic-map-tile-layer
                  type="OSM"
                />
              </yourvic-map-core>
            </div>
          </rpl-col>
        </rpl-row>
        <rpl-row row-gutter>
          <rpl-col cols="full">
            <div>
              <your-vic-bar-chart
                title="Bar Chart"
                direction="horizontal"
                :data="chartData"
                showLegend
                dataFormat="normal" />
            </div>
          </rpl-col>
        </rpl-row>
      </rpl-container>
    </rpl-page-layout>
    <div slot="footer" class="yourvic-example-footer">
      Footer
    </div>
  </rpl-base-layout>
</template>

<script>
  import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
  import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
  import RplSiteHeader from '@dpc-sdp/ripple-site-header'
  import {
    YourvicMapCore,
    YourvicMapTileLayer
  } from '@dpc-sdp/yourvic-map-core'
  import { YourVicBarChart } from '@dpc-sdp/yourvic-bar-chart'

  export default {
    name: 'Layout',
    components: {
      RplBaseLayout,
      RplPageLayout,
      RplContainer,
      RplRow,
      RplCol,
      RplSiteHeader,
      YourvicMapCore,
      YourvicMapTileLayer,
      YourVicBarChart
    },
    data: () => {
      return {
        chartData:  {
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .yourvic-example-layout {
  }
</style>
