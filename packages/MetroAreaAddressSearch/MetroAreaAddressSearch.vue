<template>
  <div class="myvic-metro-area-address-search__container">
    <div class="myvic-metro-area-address-search__address-search-container">
      <auto-complete
        id="metro-area-search"
        :items="areas"
        :filter="filter"
        :getItemName="getItemName"
        resultItemLineStyle="single"
        placeholder="Search for an address"
        :initialValue="initialValue"
        :showIcon="true"
        :getIcon="() => 'map_marker'"
        :getItemSecondaryText="
          ({ tag, flag }) => (tag ? {
            text: tag,
            class: `myvic-metro-area-address-search__tag-${flag}`,
          } : '')
        "
        :minQueryLength="minQueryLength"
        @item-selected="selectArea"
        @item-cleared="clearArea"
      />
    </div>
    <div v-if="selectedFlag === '1'">
      <h2>{{ selectedName }} is located in the Metropolitan Melbourne region.</h2>
      <p>Enter another suburb, postcode or address to check another address.</p>
    </div>
    <div v-if="selectedFlag === '2'">
      <h2>
        {{ selectedName }} is not located in the Metropolitan Melbourne region.
      </h2>
      <p>Enter another suburb, postcode or address to check another address.</p>
    </div>
    <div v-if="selectedFlag === '3'">
      <p>{{ selectedName }} spans multiple regions</p>
      <p>Please enter the full address into the search bar.</p>
    </div>
  </div>
</template>
<script>
import { AutoComplete } from '@dpc-sdp/myvic-autocomplete'
import { getAreas, isInsideMetroArea } from './utils/getAreas'
import { getAddressSuggestions } from './utils/getAddresses'

export default {
  components: {
    AutoComplete
  },
  props: {
    initialValue: {
      type: String,
      default: ''
    },
    provider: {
      type: String,
      default: 'VicmapAddressAPI',
      validator: (value) =>
        ['DELWP', 'Mapbox', 'VicmapAddressAPI'].includes(value)
    },
    mapboxGeocoderParams: {
      type: String,
      default:
        '+victoria.json?country=AU&proximity=144.9,-37.8&types=address&access_token='
    },
    vicmapAddressAPIKey: {
      type: String,
      default: ''
    },
    minQueryLength: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      areas: [],
      selectedName: '',
      selectedFlag: '',
      filter: async (items, query) => {
        const results = items.filter(
          (x) =>
            x.name.toLowerCase().includes(query.toLowerCase()) ||
            x.postcode.includes(query)
        )

        if (results.length > 0) return results

        try {
          let addresses = await getAddressSuggestions(
            this.provider,
            query,
            this.mapboxGeocoderParams,
            this.vicmapAddressAPIKey
          )
          return addresses
        } catch (e) {
          console.log('Error retrieving address suggestions: ' + e)
          return []
        }
      },
      getItemName: ({ name }) => name
    }
  },
  created: async function () {
    this.areas = await getAreas()
  },
  computed: {},
  methods: {
    async selectArea (id, item) {
      if (item.flag) {
        this.selectedName = item.name
        this.selectedFlag = item.flag
        return
      }
      this.selectedName = ''
      this.selectedFlag = ''

      const result = await isInsideMetroArea(item.longitude, item.latitude)
      this.selectedName = item.name
      this.selectedFlag = result ? '1' : '2'
    },
    clearArea () {
      this.selectedName = ''
      this.selectedFlag = ''
    }
  }
}
</script>

<style lang="scss">
.myvic-metro-area-address-search__tag-1 {
  color: white;
  background: #0e43b7 !important;
}

.myvic-metro-area-address-search__tag-2 {
  color: white;
  background: #188d4d !important;
}

.myvic-metro-area-address-search__tag-3 {
  color: white;
  background: black !important;
}

.myvic-metro-area-address-search__container {
  padding: 1rem;
  background: #f6f6f9;
  border-top: 1px solid #dbdfe3;
  border-bottom: 1px solid #dbdfe3;
}
</style>
