<template>
  <div class="myvic-data-driven">
    <h2 v-if="title" class="myvic-data-driven__title">{{ title }}</h2>
    <rpl-markup v-if="description" :html="description" class="myvic-data-driven__description" />
    <component
      v-if="dataDrivenComp"
      :is="dataDrivenComp.name"
      v-bind="dataDrivenComp.props"
      class="myvic-data-driven__component"
    >
    </component>
  </div>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import loadComponent from './component-loader'

export default {
  name: 'MyvicDataDriven',
  components: {
    RplMarkup
  },
  props: {
    title: String,
    description: String,
    configs: Object
  },
  data () {
    return {
      dataDrivenComp: null
    }
  },
  mounted () {
    let comp
    // Load custom components first.
    const configs = this.$tide.getModuleConfig('@dpc-sdp/myvic-data-driven-component')
    if (configs.customComponents) {
      const file = 'loader'
      const loaderCustomComponents = require(`~/tide/data-driven-component-${file}.js`).default
      comp = loaderCustomComponents(this.configs)
    }
    // If no custom component match, load in default components.
    if (!comp) {
      comp = loadComponent(this.configs)
    }
    this.dataDrivenComp = comp
  }
}
</script>
