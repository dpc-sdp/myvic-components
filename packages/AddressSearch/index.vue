<template>
  <auto-complete
    id="address-search"
    :items="addresses"
    :filter="filter"
    resultItemLineStyle="single"
    placeholder="Search for an address"
    :showIcon="showIcon"
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
      validator: value => ['DELWP', 'Mapbox', 'VicmapAddressAPI'].includes(value)
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
    },
    /**
     * Show icon with search results
     */
    showIcon: {
      type: Boolean,
      default: true
    },
    /**
     * Query params for Mapbox Geocoder API queries. Appended immediately after the search query to provide the option
     * to append search terms, e.g: +victoria.json?country=AU&proximity=144.9,-37.8&types=address&access_token=
     */
    mapboxGeocoderParams: {
      type: String,
      default: '+victoria.json?country=AU&proximity=144.9,-37.8&types=address&access_token='
    }
  },
  data () {
    return {
      addresses: []
    }
  },
  methods: {
    async filter (items, query) {
      try {
        let addresses = await getAddressSuggestions(this.provider, query, this.mapboxGeocoderParams)
        return addresses
      } catch (e) {
        console.log('Error retrieving address suggestions: ' + e)
        return []
      }
    },
    async selectAddress (id, item) {
      try {
        let address = await getAddress(this.provider, item)
        this.$emit('item-selected', id, address)
      } catch (e) {
        console.log('Error selecting address: ' + e)
      }
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
