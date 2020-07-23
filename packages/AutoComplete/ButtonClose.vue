<template>
  <button
    aria-label="Close"
    :class="{'myvic-button-close': true, 'small': size === 's', 'large': size === 'l'}"
    type="button"
    @click="handleClick()">
    <span
      v-if="label"
      class="myvic-button-close__label">{{ label }}
    </span>
    <rpl-icon
      class="myvic-button-close__icon"
      symbol="close"
      :size="size"
    />
  </button>
</template>

<script>

import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  components: {
    RplIcon
  },
  props: {
    size: {
      // one of 'xxl|xl|l|m|s'
      type: String,
      default: 'm'
    },
    label: {
      // string or null
      type: String,
      default: null
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-button-close {
    padding: 0;
    border: 0;
    border-radius: 5px;
    background: transparent;
    line-height: 1;
    cursor: pointer;

    &.large {
      width: 30px;
      height: 30px;
    }

    &.small {
      width: 20px;
      height: 20px;
    }

    &__label {
      font-size: rem-calc(14);
      font-weight: 500;
      margin-right: 0.5rem;
      display: inline-block;
      position: relative;
      top: -3px;
    }

    &__icon {
      fill: $textColor;
      &:hover {
        fill: darken($textColor, 10%),
      }
    }
  }

</style>
