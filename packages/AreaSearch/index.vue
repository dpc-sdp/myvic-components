<template>
  <auto-complete
    id="area-search"
    :items="areas"
    resultItemLineStyle="single"
    placeholder="Search by postcode, suburb, Local Government Area or Region..."
    :showIcon="true"
    :getIcon="() => 'map_marker'"
    @item-selected="selectArea"
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
  },
  data () {
    return {
      areas: []
    }
  },
  created: async function () {
    this.areas = await getAreas()
  },
  methods: {
    selectArea (id, item) {
      this.$emit('item-selected', id, item)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-areasearch {
    display: relative;
  }
</style>