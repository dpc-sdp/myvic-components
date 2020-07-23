<template>
  <div
    :class="[{ 'myvic-map-legend--isLeftAligned': alignLeft }, gradientColor]"
    class="myvic-map-legend"
  >
    <h2 class="myvic-map-legend__title">{{ title }}</h2>
    <div v-if="type === 'gradient'" class="myvic-map-legend__content">
      <div class="myvic-map-legend__display" />
      <div class="myvic-map-legend__range">
        <span class="myvic-map-legend__range-title">{{ gradientRange.low }}</span>
        <span class="myvic-map-legend__range-title">{{ gradientRange.high }}</span>
      </div>
    </div>
    <div v-if="type === 'image'" class="myvic-map-legend__content">
      <img :src="imageUrl" :alt="imageAltText">
    </div>
    <div v-if="type === 'custom'" class="myvic-map-legend__content">
      <!-- @slot Default slot for custom legend content -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * MyvicMapLegend provides a simple legend that can be overlayed on a map. Three types of legend are supported - a
 * ```gradient``` legend based on those in use in MyVictoria, an ```image``` legend that displays an image such as those
 * returned by a WMS GetLegendGraphic request, and a ```custom``` legend that allows users to define their own HTML
 * content to be displayed within the legend.
 */
export default {
  name: 'MyvicMapLegend',
  props: {
    /**
     * The type of the legend. Must be ```gradient```, ```image``` or ```custom```
     */
    type: {
      type: String,
      default: 'gradient',
      validator: value => ['gradient', 'image', 'custom'].includes(value)
    },
    /**
     * The title to display above the legend.
     */
    title: {
      type: String,
      default: 'Legend'
    },
    /**
     * Gradient color for a MyVictoria style gradient legend
     */
    gradientColor: {
      type: String,
      default: 'blue',
      validator: value => ['red', 'pink', 'blue', 'teal', 'purple'].includes(value)
    },
    /**
     * Range values to show below a gradient style legend. Accepts an object with low and high properties.
     */
    gradientRange: {
      type: Object,
      default: () => ({
        low: '',
        high: ''
      })
    },
    /**
     * URL of a legend image, such as a WMS GetLegendGraphic request
     */
    imageUrl: {
      type: String,
      default: ''
    },
    /**
     * Alt text to set for the legend image element
     */
    imageAltText: {
      type: String,
      default: 'Legend'
    },
    /**
     * Override the default bottom right position and align the legend to the left of the map
     */
    alignLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "~@dpc-sdp/myvic-global/styles/global";

  $blueShade10: #011a3c;
  $greyShade: #222222;

  @mixin linear-gradient($color-stops...) {
    background: nth(nth($color-stops, 1), 1);
    background: -webkit-linear-gradient(to left, $color-stops);
    background: linear-gradient(to right, $color-stops);
  }

  .myvic-map-legend {
    padding: .6rem;
    position: absolute;
    z-index: 900;
    background-color: rgba(255, 255, 255, 0.95);
    right: 1rem;
    bottom: 2rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
    max-width: 20rem;

    &--isLeftAligned {
      left: 1rem;
      right: auto;
    }

    &__content {
      position: relative;
      max-height: 300px;
      overflow: auto;
    }

    &__display {
      min-width: rem-calc(180);
      height: 12px;
      margin-bottom: .5rem;
      border-radius: 6px;

      .red & {
        @include linear-gradient(#f2b2c1 0%, #d50031 66%, #8a2a2b 100%);
      }

      .pink & {
        @include linear-gradient(#efc9d5 0%, #ef4a81 55%, #a10c3b 100%);
      }

      .blue & {
        @include linear-gradient(#88dbdf 0%, #0071cd 70%, #004b97 100%);
      }

      .teal & {
        @include linear-gradient(#87dadf 0%, #00b2a9 60%, #004b4f 100%);
      }

      .purple & {
        @include linear-gradient(#e89cad 0%, #87189d 60%, #500777 100%);
      }

    }

    &__title {
      font-size: rem-calc(13);
      color: $blueShade10;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    &__range-title {
      font-size: rem-calc(13);
      color: $greyShade;
    }

    &__range {
      display: flex;
      justify-content: space-between;
    }

  }
</style>
