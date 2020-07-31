<template>
  <auto-complete
    id="address-search"
    :items="addresses"
    :filter="filter"
    resultItemLineStyle="single"
    placeholder="Search for an address"
    :showIcon="true"
    :getIcon="() => 'map_marker'"
    :minQueryLength="minQueryLength"
    @item-selected="selectAddress"
    @item-cleared="clearAddress"
  />
</template>
<script>

import { AutoComplete } from '@dpc-sdp/myvic-autocomplete'
import { getAddressSuggestions, getAddress } from './utils/getAddresses'

/**
 * AddressSearch is a component for looking up Victorian addresses using an autocomplete search
 */
export default {
  components: {
    AutoComplete
  },
  props: {
    provider: {
      type: String,
      default: 'DELWP',
      validator: value => ['DELWP', 'Mapbox'].includes(value)
    },
    initialValue: {
      type: String,
      default: ''
    },
    /**
     * Minimum length of the query (in characters) before filtering will occur
     */
    minQueryLength: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      addresses: []
    }
  },
  methods: {
    async filter (items, query) {
      let addresses = await getAddressSuggestions(this.provider, query)
      return addresses
    },
    async selectAddress (id, item) {
      let address = await getAddress(this.provider, item)
      this.$emit('item-selected', id, address)
    },
    clearAddress () {
      this.$emit('item-cleared', this.id)
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
