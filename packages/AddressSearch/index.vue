<template>
  <auto-complete
    id="address-search"
    :items="addresses"
    :filter="filter"
    resultItemLineStyle="single"
    placeholder="Search for an address"
    :showIcon="true"
    :getIcon="() => 'map_marker'"
    @item-selected="selectAddress"
  />
</template>
<script>

import { AutoComplete } from '@dpc-sdp/yourvic-autocomplete'
import { getAddresses } from './utils/getAddresses'

/**
 * AddressSearch is a component for looking up Victorian addresses using an autocomplete search
 */
export default {
  components: {
    AutoComplete
  },
  props: {
  },
  data () {
    return {
      addresses: []
    }
  },
  methods: {
    async filter (items, query) {
      let addresses = await getAddresses(query)
      return addresses
    },
    selectAddress (id, item) {
      this.$emit('item-selected', id, item)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-addresssearch {
    display: relative;
  }
</style>
