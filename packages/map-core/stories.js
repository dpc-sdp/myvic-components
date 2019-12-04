import { storiesOf } from '@storybook/vue'
import RplMap from './index.vue'

storiesOf('Molecules/Map', module)
  .add('Map with no data', () => ({
    components: { RplMap },
    template: `<rpl-map
      :baseMapUrl="baseMapUrl" />`,
    data () {
      return {
        baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
      }
    }
  }))
