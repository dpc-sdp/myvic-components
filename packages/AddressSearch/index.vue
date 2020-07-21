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

import { AutoComplete } from '@dpc-sdp/myvic-autocomplete'
import { getAddresses } from './utils/getAddresses'

/**
 * AddressSearch is a component for looking up Victorian addresses using an autocomplete search
 */
export default {
  components: {
    AutoComplete
  },
  props: {
    initialValue: {
      type: String,
      default: ''
    }
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
  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-addresssearch {
    display: relative;
  }
</style>
