import { storiesOf } from '@storybook/vue'

import SVicFreeWifiMap from './YourvicFreeWifiMap/YourvicFreeWifiMap'
import SVicPreventionFamilyViolence from './YourvicMapPreventionFamilyViolence/YourvicMapPreventionFamilyViolence'
import SVicFireMap from './YourvicFireMap/YourvicFireMap'

storiesOf('Molecules/Map', module)
  .add('Map with free wifi data', () => ({
    components: { SVicFreeWifiMap },
    template: `<s-vic-free-wifi-map />`
  }))
  .add('Map with family violence data', () => ({
    components: { SVicPreventionFamilyViolence },
    template: `<s-vic-prevention-family-violence title="Title" description="Description" />`
  }))
  .add('Map with fire data', () => ({
    components: { SVicFireMap },
    template: `<s-vic-fire-map />`
  }))
