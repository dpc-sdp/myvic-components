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
    <rpl-alert-base
      v-if="ie"
      class="myvic-data-driven__alert"
      backgroundColor="dark_neutral"
      textColor="white"
      iconColor="white"
      iconSymbol="alert_information"
      closeIconColor="white"
    >
      Internet Explorer 11 (and older) is not fully supported for this data driven component, please upgrade to a modern browser.
    </rpl-alert-base>
  </div>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplAlertBase } from '@dpc-sdp/ripple-alert'
import loadComponent from './component-loader'

export default {
  name: 'MyvicDataDriven',
  components: {
    RplMarkup,
    RplAlertBase
  },
  props: {
    title: String,
    description: String,
    configs: Object
  },
  data () {
    return {
      dataDrivenComp: null,
      ie: null
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
    // Don't render the component in IE if IE is not supported
    if (comp && comp.ieSupport === false && this.isIE()) {
      this.ie = true
      this.dataDrivenComp = false
    } else {
      this.dataDrivenComp = comp
    }
  },
  methods: {
    isIE () {
      if (!!window.MSInputMethodContext && !!document.documentMode) {
        return true
      }
      return false
    }
  }
}
</script>
