<template>
  <div
    class="yourvic-data-block">
    <div
      :class="{
        'yourvic-data-block__item--selectable': selectable,
        'is-selected': isSelected,
        'yourvic-data-block__item--isBlock': isBlock
      }"
      class="yourvic-data-block__item"
      :tabIndex="tabIndex"
      :aria-label="ariaLabel"
      :role="selectable ? 'button' : ''"
      @click="$emit('data-block-selected', id)"
      @keyup.enter="$emit('data-block-selected', id)">
      <data-item v-bind="data" />
      <span
        v-if="selectable"
        class="yourvic-data-block__link">
        <span class="yourvic-data-block__link-text">View chart</span>
          <rpl-icon
            class="yourvic-data-block__icon"
            symbol="arrow_right_secondary"
            color="dark_neutral_1"
            size="s"
          />
      </span>
    </div>
  </div>
</template>

<script>
import DataItem from './DataItem'
import { RplIcon } from '@dpc-sdp/ripple-icon'

/**
 * YourvicDataBlock provides configurable container for data display
 */
export default {
  components: {
    DataItem,
    RplIcon
  },
  props: {
    /**
     * The id of this DataBlock. This will be passed on to the click event so that handlers recognize which DataBlock component was clicked
     */
    id: {
      type: String,
      default: 'data-block'
    },
    /**
     * The props to pass on to the DataItem component. The mandatory props are title (string) and description (string)
     */
    data: {
      type: Object
    },
    /**
     * selectable gives the block borders, more padding and hover state
     */
    selectable: {
      type: Boolean,
      default: true
    },
    /**
     * if this is true, the block has a darker border and background color
     */
    isSelected: {
      type: Boolean,
      default: false
    },
    /**
     * isBlock
     */
    isBlock: {
      type: Boolean,
      default: true
    },
    /**
     * Customise the data block tab index
     */
    tabIndex: {
      type: Number,
      default: 0
    },
    /**
     * Customise the data block aria label
     */
    ariaLabel: {
      type: String,
      default: 'Data Block'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/yourvic-global/styles/global";
  $borderColor: rgba(#0052c2, 0.3);
  $selectedColor: #ddebf8;

  .yourvic-data-block {
    position: relative;
    display: flex;

    &__item {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: rem-calc(50);
      padding-top: .75rem;
      padding-right: 1rem;
      padding-bottom: .75rem;
      padding-left: 1rem;

      // @include breakpoint(medium) {
      padding-top: 1rem;
      padding-bottom: 1rem;
      // }

      &--isBlock {
        min-height: rem-calc(150);
        border: 1px solid #D9D9D6;
        border-radius: 5px;
        padding: 1.25rem;
        padding-bottom: 2.5rem;
        outline: none;

        // @include breakpoint(large) {
        //   padding: 1.4rem;
        //   padding-bottom: 2.8rem;
        //   min-height: rem-calc(170);
        // }
      }

      &--selectable {
        cursor: pointer;

        // @include breakpoint(medium) {
        &:hover {
          background-color: $hoverColor;
          border: 1px solid $borderColor;

          .yourvic-data-block__link-text {
            margin-right: 6px;
            transition: all 0.175s ease-out;
          }
        }
        // }

        &:active,
        &:focus {
          background-color: $hoverColor;
          border: 1px solid $borderColor;
        }

        &.is-selected {
          background-color: #ddebf8;
          border: 1px solid $borderColor;
        }
      }

      // &--isDisabled {
      //   background-color: palette(green, tint);
      // }
    }

    &__link {
      line-height: 1;
      position: absolute;
      bottom: rem-calc(24);
    }

    &__link-text {
      font-size: rem-calc(13);
      font-weight: 500;
      margin-right: .25em;
      border-bottom: 2px solid #0095C7;
    }

    &__icon {
      position: relative;
      top: 3px;
      left: -3px;
    }
  }

</style>
