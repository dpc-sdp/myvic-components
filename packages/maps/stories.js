import { storiesOf } from '@storybook/vue'

import SVicFreeWifiMap from './YourvicFreeWifiMap/YourvicFreeWifiMap'
import SVicPreventionFamilyViolence from './YourvicMapPreventionFamilyViolence/YourvicMapPreventionFamilyViolence'
import SVicFireMap from './YourvicFireMap/YourvicFireMap'

storiesOf('Molecules/Maps/Free Wifi', module)
  .addParameters({ component: SVicFreeWifiMap })
  .add('Map with free wifi data', () => ({
    components: { SVicFreeWifiMap },
    template: `<s-vic-free-wifi-map />`
  }))

storiesOf('Molecules/Maps/Family Violence', module)
  .addParameters({ component: SVicPreventionFamilyViolence })
  .add('Map with family violence data', () => ({
    components: { SVicPreventionFamilyViolence },
    template: `<s-vic-prevention-family-violence title="Title" description="Description" />`
  }))

storiesOf('Molecules/Maps/Fire', module)
  .addParameters({ component: SVicFireMap })
  .add('Map with fire data', () => ({
    components: { SVicFireMap },
    template: `<s-vic-fire-map />`
  }))
