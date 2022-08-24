<template>
  <auto-complete
    id="area-search"
    :items="areas"
    :filter="filterFunction"
    :getItemName="getItemName"
    :getItemSecondaryText="showSecondaryText ? ({ description }) => description : () => null"
    resultItemLineStyle="single"
    :placeholder="placeholder"
    :initialValue="initialValue"
    :showIcon="true"
    :getIcon="() => 'map_marker'"
    :debounceSearch="debounceSearch"
    @item-selected="selectArea"
    @item-cleared="clearArea"
  />
</template>
<script>

import { AutoComplete } from '@dpc-sdp/myvic-autocomplete'
import { getAreas } from './utils/getAreas'

/**
 * AreaSearch is a component for looking up different kinds of areas using an autocomplete search
 */
export default {
  components: {
    AutoComplete
  },
  props: {
    noLgaOrRegion: {
      type: Boolean,
      default: false
    },
    initialValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: function () {
        return this.noLgaOrRegion ? 'Search by postcode or suburb...' : 'Search by postcode, suburb, Local Government Area or Region...'
      }
    },
    showSecondaryText: {
      type: Boolean,
      default: true
    },
    debounceSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      areas: [],
      filterFunction: (items, query) => items.filter(
        x => x.name.toLowerCase().includes(query.toLowerCase()) || x.postcode.includes(query)
      ),
      getItemName: ({ name, postcode }) => postcode.length ? `${name}, ${postcode}` : name
    }
  },
  created: async function () {
    this.areas = await getAreas(this.noLgaOrRegion)
  },
  computed: {
  },
  methods: {
    selectArea (id, item) {
      this.$emit('item-selected', id, item)
    },
    clearArea (id) {
      this.$emit('item-cleared', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-areasearch {
    display: relative;
  }
</style>
