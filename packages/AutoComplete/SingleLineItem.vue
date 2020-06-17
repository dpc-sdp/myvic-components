<template>
  <div class="yourvic-single-line-item">
    <rpl-icon
      v-if="showIcon"
      class="yourvic-single-line-item__icon"
      :symbol="icon"
      size="m"
    />
    <span
      class="yourvic-single-line-item__item-name"
      v-html="highlight(itemName)" />
    <span v-if="itemSecondaryText" class="yourvic-single-line-item__pill">{{ itemSecondaryText }}</span>
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

  .yourvic-single-line-item {
    padding: 1rem;

    &__icon {
      display: inline-block;
      padding-right: 23px;
      position: relative;
      top: 2px;
      fill: #d9d9d6;
    }

    &__item-name {
      box-shadow: inset 0 -2px $primaryColor;
    }

    &__pill {
      display: block;
      font-size: rem-calc(12);
      text-transform: uppercase;
      padding-top: .125rem;

      // @include breakpoint(medium) {
      display: inline-block;
      background-color: #EDEDED;
      margin-left: rem-calc(10);
      padding: 0.1rem 0.4rem;
      border-radius: 13px;
      text-transform: none;
      // }
    }

    &:hover, &:focus {
      .yourvic-single-line-item__icon {
        fill: $primaryColor;
      }
      .yourvic-single-line-item__pill {
        // @include breakpoint(medium) {
        background-color: #fff;
        // }
      }
}
  }

</style>
