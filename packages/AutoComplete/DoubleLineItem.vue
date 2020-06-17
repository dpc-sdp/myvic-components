<template>
  <div class="yourvic-double-line-item">
    <div v-if="showIcon" class="yourvic-double-line-item__icon-container">
      <rpl-icon
        class="yourvic-double-line-item__icon"
        :symbol="icon"
        size="m"
      />
    </div>
    <div>
      <span
        class="yourvic-double-line-item__item-name"
        v-html="highlight(itemName)" />
      <span v-if="itemSecondaryText" class="yourvic-double-line-item__item-description">{{ itemSecondaryText }}</span>
    </div>
  </div>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  components: {
    RplIcon
  },
  props: {
    itemName: {
      type: String,
      required: true
    },
    query: {
      type: String,
      default: ''
    },
    itemSecondaryText: {
      type: String
    },
    showIcon: {
      type: Boolean
    },
    icon: {
      type: String
    }
  },
  methods: {
    highlight (val) {
      if (!this.query) return val
      return val.replace(new RegExp(this.query, 'gi'), match => `<span>${match}</span>`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-double-line-item {
    padding: 1rem;
    display: flex;
    align-items: center;

    &__icon-container {
      margin-right: 10px;
    }

    &__icon {
      position: relative;
      top: 1px;
      fill: #d9d9d6;
    }

    &__item-name {
      // Workaround for scoped styles not working with v-html markup
      // https://github.com/vuejs/vue-loader/issues/749
      /deep/ span {
        font-weight: 600;
      }
    }

    &__item-description {
      display: block;
      font-size: rem-calc(11);
      text-transform: uppercase;
    }

    &:hover, &:focus {
      .yourvic-double-line-item__icon {
        fill: $primaryColor;
      }
    }
  }

</style>
