<template>
  <section
    class="yourvic-data-block">
    <div
      :class="{ 'yourvic-data-block__item--selectable': selectable, 'yourvic-data-block__item--isBlock': isBlock }"
      class="yourvic-data-block__item">
      <data-item v-bind="data" />
      <span
        v-if="selectable"
        class="yourvic-data-block__link">
        <span class="yourvic-data-block__link-text">View chart</span>
        <!-- <icon
          :glyph="getGlyph('caret-right')"
          :width="5"
          :height="8"
        /> -->
      </span>
    </div>
  </section>
</template>

<script>
import DataItem from './DataItem'

/**
 * YourvicDataBlock provides configurable container for data display
 */
export default {
  components: {
    DataItem
  },
  props: {
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
     * isBlock
     */
    isBlock: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/yourvic-global/styles/global";
  $hoverColor: #e5f0fa;
  $borderColor: rgba(#0052c2, 0.3);

  .yourvic-data-block {
    position: relative;
    display: flex;

    &__item {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
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

          .data-block__link-text {
            margin-right: 5px;
            transition: all 0.075s ease-out;
          }
        }
        // }

        &:active,
        &:focus {
          background-color: $hoverColor;
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
      bottom: rem-calc(20);
    }

    &__link-text {
      font-size: rem-calc(13);
      font-weight: 500;
      margin-right: .25em;
      border-bottom: 2px solid #00a9e0;
    }
  }

</style>
