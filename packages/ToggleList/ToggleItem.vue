<template>
  <li
    :class="{ 'is-active': isSelected }"
    class="yourvic-toggle-item"
    @click="onClick"
    @keyup.enter="$emit('click')"
    tabindex="0"
    ref="currentItem"
    :aria-label="item.title"
    role="checkbox"
    :aria-checked="isSelected"
    >
    <div
      v-if="!!icon"
      class="yourvic-toggle-item__icon-left">
      <rpl-icon
        :symbol="icon"
        :color="isSelected ? color : 'mid_neutral_1'"
        size="m" />
    </div>
    <h3 class="yourvic-toggle-item__title">{{ item.title }}</h3>
    <div class="yourvic-toggle-item__icon-right">
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
      default: null
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
    onClick (event) {
      this.$emit('click')
      this.$refs.currentItem.blur()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  $greyTint: #D9D9D6;
  $greyTint5: #EDEDED;
  $greyShade: #53565A;
  $lightGrey: #546A7C;

  .yourvic-toggle-item {
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
    &:focus {
      background-color: $greyTint5;
      outline: none;
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
      box-sizing: content-box;
      width: 16px;
      height: 16px;
      line-height: 18px;
      text-align: center;
      position: relative;
      border: 2px solid $greyShade;
      border-radius: 5px;
      .is-active & {
        fill: $greyShade;
        border: 2px solid $greyShade;
      }
    }
  }

</style>
