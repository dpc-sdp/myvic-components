<template>
  <div class="myvic-toggle-list">
    <ul v-if="!gotError" class="myvic-toggle-list__ul">
      <toggle-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :icon="item.icon"
        :color="item.color"
        :is-selected="selectedItems[item.id]"
        @click="onItemClick(item)" />
    </ul>
    <error v-if="gotError" :message="error.toString()" class="myvic-toggle-list__error"/>
  </div>
</template>
<script>
import ToggleItem from './ToggleItem'
import Error from '@dpc-sdp/myvic-global/components/Error'
import catchError from '@dpc-sdp/myvic-global/mixins/catchError'

/**
 * MyvicToggleList provides a styled list of items that can be toggled on/off on click
 */
export default {
  name: 'ToggleList',
  mixins: [catchError],
  components: {
    ToggleItem,
    Error
  },
  props: {
    /**
     * Array of items to be shown in the toggle list. Each item is an object and should have an ```id``` and
     * ```title```, and optionally an ```icon``` and ```color```. The ```icon``` and ```color``` must be supported by
     * the Ripple Icon component: https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--icon-library
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * An object for controlling which ```items``` are selected. Each item ```id``` should have a true or false value
     * in ```selectedItems```
     */
    selectedItems: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onItemClick (item) {
      /**
       * Triggered when an item is clicked to allow users to perform actions and update ```selectedItems```
       */
      this.$emit('item-selected', { item })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@dpc-sdp/myvic-global/styles/global";

  $greyTint: #D9D9D6;

  .myvic-toggle-list {

    &__ul {
      border: 1px solid $greyTint;
      border-radius: 5px;
      margin-top: rem-calc(10);
      margin-bottom: rem-calc(20);
      padding: 0;
    }

    &__error {
      width: 100%;
      height: 100%;
    }
  }

</style>
