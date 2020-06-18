<template>
  <li
    :class="{ 'is-active': isSelected }"
    class="toggle-item"
    @click="$emit('click')"
    @keyup.enter="$emit('click')"
    tabindex="0"
    >
    <div
      class="toggle-item__icon-left">
      <rpl-icon
        :symbol="icon"
        :color="isSelected ? color : 'mid_neutral_1'"
        size="m" />
    </div>
    <h3 class="toggle-item__title">{{ item.title }}</h3>
    <div class="toggle-item__icon-right">
      <rpl-icon
        :symbol="isSelected ? 'tick' : null"
        size="m" />
    </div>
  </li>
</template>
<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'ToggleItem',
  components: {
    RplIcon
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'map_marker'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  $greyTint: #D9D9D6;
  $greyTint5: #EDEDED;
  $greyShade: #53565A;
  $lightGrey: #546A7C;

  .toggle-item {
    cursor: pointer;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 rem-calc(15);
    border-bottom: 1px solid $greyTint;
    -webkit-user-select: none;

    &:first-of-type {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-of-type {
      border-bottom: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:hover {
      background-color: $greyTint5;
    }
    &__title {
      font-size: rem-calc(13);
      font-weight: 500;
      flex-grow: 1;
      color: $greyShade;

      &.is-active {
        font-weight: 700;
      }
    }
    &__icon-left {
      position: relative;
      margin-right: 1rem;
      color: $greyTint;
      height: 21px;
      width: 21px;
      display: block;
      text-align: center;
      justify-items: center;
      border-radius: 999px;
      overflow: hidden;
      .is-active & {
      }
    }
    &__icon-right {
      width: 16px;
      height: 16px;
      line-height: 18px;
      text-align: center;
      position: relative;
      border: 2px solid $greyTint;
      border-radius: 5px;
      color: $greyTint;
      .is-active & {
        fill: $lightGrey;
        border: 2px solid $lightGrey;
      }
    }
  }

</style>
