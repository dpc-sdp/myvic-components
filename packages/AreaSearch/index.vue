<template>
  <auto-complete
    :items="areas"
    resultItemLineStyle="single"
    :showIcon="true"
    :getIcon="() => 'map_marker'"
  />
</template>
<script>

import { AutoComplete } from '@dpc-sdp/yourvic-autocomplete'
import { getAreas } from './utils/getAreas'

/**
 * AreaSearch is a component for looking up different kinds of areas using an autocomplete search
 */
export default {
  components: {
    AutoComplete
  },
  props: {
    /**
     * The id of this component. This will be passed on to the click event so that handlers recognize which AutoComplete was clicked
     */
    id: {
      type: String,
      default: 'area-search'
    }
  },
  data () {
    return {
      areas: []
    }
  },
  created: async function () {
    this.areas = await getAreas()
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-areasearch {
    display: relative;
  }
</style>
