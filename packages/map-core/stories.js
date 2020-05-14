import { storiesOf } from '@storybook/vue'
import {
  withKnobs,
  text,
  object,
  number,
  boolean
} from '@storybook/addon-knobs/vue'
import YourvicMapCore from './index.vue'

storiesOf('Molecules/Map', module)
  .addDecorator(withKnobs)
  .add('Interactive Map', () => ({
    components: { YourvicMapCore },
    template: `<yourvic-map-core
        :style="{height: '100vh'}"
        :baseMapUrl="baseMapUrl"
        :center="center"
        :zoom="zoom"
        :minZoom="minZoom"
        :maxZoom="maxZoom"
        :enableZoomControl="enableZoomControl"
        :enableAttributionControl="enableAttributionControl"
        :enableFullScreenControl="enableFullScreenControl"
        :enablePanInteraction="enablePanInteraction"
        :enableZoomInteraction="enableZoomInteraction"
        :enableRotateInteraction="enableRotateInteraction"
      />`,
    props: {
      baseMapUrl: {
        default: text(
          'Base Map URL',
          'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
        )
      },
      center: {
        default: object('Center', [16136905.843820328, -4383057.013522999])
      },
      zoom: {
        default: number('Zoom', 7,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      minZoom: {
        default: number('Min Zoom', 1,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      maxZoom: {
        default: number('Max Zoom', 20,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      enableZoomControl: {
        default: boolean('Enable Zoom Control', true)
      },
      enableAttributionControl: {
        default: boolean('Enable Attribution Control', true)
      },
      enableFullScreenControl: {
        default: boolean('Enable Full Screen Control', false)
      },
      enablePanInteraction: {
        default: boolean('Enable Pan Interaction', true)
      },
      enableZoomInteraction: {
        default: boolean('Enable Zoom Interaction', true)
      },
      enableRotateInteraction: {
        default: boolean('Enable Rotate Interaction', false)
      }
    }
  }))
  .add('Fixed Map', () => ({
    components: { YourvicMapCore },
    template: `<yourvic-map-core
        :style="{margin: '20px', width: '400px', height: '300px', border: '1px solid black'}"
        :baseMapUrl="baseMapUrl"
        :center="center"
        :zoom="zoom"
        :minZoom="minZoom"
        :maxZoom="maxZoom"
        :enableZoomControl="enableZoomControl"
        :enableAttributionControl="enableAttributionControl"
        :enableFullScreenControl="enableFullScreenControl"
        :enablePanInteraction="enablePanInteraction"
        :enableZoomInteraction="enableZoomInteraction"
        :enableRotateInteraction="enableRotateInteraction"
      />`,
    props: {
      baseMapUrl: {
        default: text(
          'Base Map URL',
          'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
        )
      },
      center: {
        default: object('Center', [16138405.843820328, -4552817.013522999])
      },
      zoom: {
        default: number('Zoom', 17,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      minZoom: {
        default: number('Min Zoom', 1,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      maxZoom: {
        default: number('Max Zoom', 20,
          {
            range: true,
            min: 1,
            max: 20,
            step: 1
          }
        )
      },
      enableZoomControl: {
        default: boolean('Enable Zoom Control', false)
      },
      enableAttributionControl: {
        default: boolean('Enable Attribution Control', true)
      },
      enableFullScreenControl: {
        default: boolean('Enable Full Screen Control', false)
      },
      enablePanInteraction: {
        default: boolean('Enable Pan Interaction', false)
      },
      enableZoomInteraction: {
        default: boolean('Enable Zoom Interaction', false)
      },
      enableRotateInteraction: {
        default: boolean('Enable Rotate Interaction', false)
      }
    }
  }))
