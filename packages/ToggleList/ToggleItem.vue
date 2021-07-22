<template>
  <li
    class="myvic-toggle-item"
    :class="{ 'myvic-toggle-item--clickable': showCheckbox, 'is-active': isSelected }"
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
      class="myvic-toggle-item__icon-left"
      :class="{ 'custom-color': customColor }"
      :style="customColor ? `--customColor: ${color}` : ''"
    >
      <div v-if="iconInLibrary" v-html="iconHtml" style="display: flex;"/>
      <rpl-icon v-else
        :symbol="icon"
        :color="isSelected ? color : 'mid_neutral_1'"
        size="m" />
    </div>
    <h3 class="myvic-toggle-item__title">{{ item.title }}</h3>
    <div v-if="showCheckbox" class="myvic-toggle-item__icon-right">
      <rpl-icon
        :symbol="isSelected ? 'tick' : null"
        size="m" />
    </div>
  </li>
</template>
<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'
import { icons, getSvg } from '@dpc-sdp/myvic-global/mapIcons/iconLibrary'

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
    },
    customColor: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    iconInLibrary () {
      return Object.keys(icons).includes(this.icon)
    },
    iconHtml () {
      return getSvg(this.icon, 's', this.color)
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
  @import "~@dpc-sdp/myvic-global/styles/global";

  $greyTint: #D9D9D6;
  $greyTint5: #EDEDED;
  $greyShade: #53565A;
  $lightGrey: #546A7C;

  .myvic-toggle-item {
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

    &__title {
      font-family: "VIC-Regular", "Arial", "Helvetica", "sans-serif";
      font-size: rem-calc(13);
      font-weight: 500;
      flex-grow: 1;
      color: $greyShade;
      overflow: hidden;
      text-overflow: ellipsis;
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
      display: flex;
      align-items: center;
      justify-items: center;
      border-radius: 999px;
      flex: 0 0 auto;
      .is-active &.custom-color {
        > svg {
          fill: var(--customColor);
        }
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
      flex: 0 0 auto;
      .is-active & {
        fill: $greyShade;
        border: 2px solid $greyShade;
      }
    }
    &--clickable {
      cursor: pointer;

      &:hover {
        background-color: $greyTint5;
      }
      &:focus {
        background-color: $greyTint5;
        outline: none;
      }

      & h3.myvic-toggle-item__title {
        font-family: "VIC-Bold", "Arial", "Helvetica", "sans-serif";
      }
    }
  }

</style>
