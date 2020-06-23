<template>
  <ul class="yourvic-search-results">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :class="{ 'yourvic-search-results__item--isActive': index === activeIndex }"
      class="yourvic-search-results__item"
      @click="$emit('item-selected', item)">
      <component
        :is="innerComponentName"
        :itemName="getItemName(item)"
        :query="query"
        :itemSecondaryText="getItemSecondaryText(item)"
        :showIcon="showIcon"
        :icon="getIcon && getIcon(item)"
        :highlightMatch="false"
      />
    </li>
    <li
      v-show="!items.length"
      class="yourvic-search-results__item--no-results">
      <span
        class="yourvic-search-results__item-name">
        No results
      </span>
    </li>
  </ul>
</template>

<script>

export default {
  components: {
    'SingleLineItem': () => import(`./${'SingleLineItem'}`),
    'DoubleLineItem': () => import(`./${'DoubleLineItem'}`)
  },
  props: {
    activeIndex: {
      type: Number,
      default: -1
    },
    items: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      default: ''
    },
    resultItemLineStyle: {
      type: String
    },
    getItemName: {
      type: Function,
      required: true
    },
    getItemSecondaryText: {
      type: Function
    },
    showIcon: {
      type: Boolean
    },
    getIcon: {
      type: Function
    },
    highlightMatch: {
      type: Boolean
    }
  },
  computed: {
    innerComponentName: function () {
      return this.resultItemLineStyle === 'single' ? 'SingleLineItem' : 'DoubleLineItem'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-search-results {
    background-color: #fff;
    border: 1px solid $textColor;
    border-radius: 0 0 5px 5px;
    max-height: 420px;
    overflow-y: scroll;
    transform: translateY(-3px);
    margin-top: 0;
    margin-bottom: 0;

    .is-mobile & {
      max-height: 100vh;
      transform: translateY(0);
      border-radius: 0;
      border: none;
    }

    &__item {
      font-size: rem-calc(14);
      line-height: 1.5;
      font-weight: bold;

      &--no-results {
        padding: 1rem;
      }

      &:hover,
      &--isActive {
        background-color: $hoverColor;
        cursor: pointer;
      }

      &:last-child {
        border-radius: 0 0 5px 5px;
      }

      &-name {
        // Workaround for scoped styles not working with v-html markup
        // https://github.com/vuejs/vue-loader/issues/749
        /deep/ span {
          font-weight: 600;
        }
      }
    }
  }

</style>
