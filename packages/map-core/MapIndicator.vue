<template>
  <div
    v-if="show"
    id="myvic-map-core-popup-content"
    class="myvic-map-core-indicator"
    :class="`myvic-map-core-indicator--${position}`">
    <div class="myvic-map-core-indicator__close">
      <button-close
        :id="'tabs-close-button'"
        :size="'small'"
        @click="close"/>
    </div>
    <div
      class="myvic-map-core-indicator__inner"
      :class="{'myvic-map-core-indicator__inner--padded': !stickyHeader}"
      :ref="'contentElement'"
      :style="{
        maxHeight: position === 'float-left' ? '100%' : this.maxHeight,
        height: position === 'float-left' ? '100%' : 'auto',
        width: this.width
      }">
      <div :class="{'myvic-map-core-indicator__inner--flex': stickyHeader}">
        <div :class="{'myvic-map-core-indicator__title-container': stickyHeader}">
          <template v-if="(selectedFeature instanceof Array)">
            <h5 class="myvic-map-core-indicator__title--multiple">{{ selectedFeature[0].title }}</h5>
          </template>
          <template v-else>
            <h5 class="myvic-map-core-indicator__title">{{ selectedFeature.title }}</h5>
          </template>
        </div>
        <div :class="{'myvic-map-core-indicator__content-container': stickyHeader}">
          <div v-if="hasPopupSlotContent">
            <slot></slot>
          </div>
          <div v-else>
            <template v-if="(selectedFeature instanceof Array)">
              <div
                v-for="(feature, index) in selectedFeature.slice(1)"
                :key="index"
                class="myvic-map-core-indicator__feature-multiple">
                <hr v-if="!stickyHeader || index !== 0" />
                <h5 class="myvic-map-core-indicator__title">{{ feature.title }}</h5>
                <div v-if="feature.html" v-html="feature.html"></div>
                <div v-if="feature.value" class="myvic-map-core-indicator__value">{{ feature.value }}</div>
                <div v-if="feature.content" class="myvic-map-core-indicator__content">
                  <div class="myvic-map-core-indicator__readmore"
                      @click="readMoreMultiClick(index)"
                      @keyup.enter="readMoreMultiClick(index)"
                      v-html="showDescOpenMuliText(index)"
                      tabIndex="0" />
                  <div class="myvic-map-core-indicator__description" v-if="descIsOpen(index)" v-html="feature.content" />
                </div>
              </div>
            </template>
            <template v-else>
              <div v-if="selectedFeature.html" v-html="selectedFeature.html"></div>
              <div v-if="selectedFeature.value" class="myvic-map-core-indicator__value">{{ selectedFeature.value }}</div>
              <div v-if="selectedFeature.content" class="myvic-map-core-indicator__content">
                <div class="myvic-map-core-indicator__readmore"
                    @click="readMoreClick"
                    @keyup.enter="readMoreClick"
                    v-html="this.descOpenText"
                    tabIndex="0" />
                <div class="myvic-map-core-indicator__description" v-if="descOpen" v-html="selectedFeature.content" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonClose from './ButtonClose'
import Vue from 'vue'

const DEFAULT_MAX_HEIGHT_PX = 300
const DEFAULT_WIDTH_PX = 300

export default {
  name: 'MapIndicator',
  components: {
    ButtonClose
  },
  props: {
    selectedFeature: {
      type: Object | Array,
      default: 'default'
    },
    filters: {
      type: undefined
    },
    // get the parent's map element for checking container size
    mapElement: {
      type: Element
    },
    stickyHeader: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'default'
    }
  },
  data: function () {
    return {
      defaultReadText: 'Read more',
      defaultHideText: 'Read less',
      show: false,
      descMultiOpen: {},
      descMultiOpenText: {},
      descOpen: false,
      descOpenText: 'Read more',
      maxHeight: DEFAULT_MAX_HEIGHT_PX + 'px',
      width: DEFAULT_WIDTH_PX + 'px'
    }
  },
  computed: {
    hasPopupSlotContent: function () {
      return !!this.$slots.default
    }
  },
  methods: {
    showReadMeText: function (show) {
      if (show) {
        return this.defaultHideText
      } else {
        return this.defaultReadText
      }
    },
    resetPopup () {
      this.descMultiOpen = {}
      this.descMultiOpenText = {}
      this.descOpen = false
      this.descOpenText = this.defaultReadText
    },
    close () {
      this.show = false
      this.resetPopup()
      this.$emit('popup-close')
    },
    readMoreMultiClick: function (index) {
      if (this.descMultiOpen[index] === undefined) {
        Vue.set(this.descMultiOpen, index, false)
        Vue.set(this.descMultiOpenText, index, this.defaultReadText)
      }
      if (this.single) {
        let strIndex = index.toString()
        for (let item in this.descMultiOpen) {
          if (item !== strIndex) {
            Vue.set(this.descMultiOpen, item, false)
            Vue.set(this.descMultiOpenText, item, this.defaultReadText)
          }
        }
      }
      Vue.set(this.descMultiOpen, index, !this.descMultiOpen[index])
      Vue.set(this.descMultiOpenText, index, this.showReadMeText(this.descMultiOpen[index]))
    },
    readMoreClick () {
      this.descOpen = !this.descOpen
      this.descOpenText = this.showReadMeText(this.descOpen)
    },
    descIsOpen: function (index) {
      return (this.descMultiOpen[index] === undefined) ? false : this.descMultiOpen[index]
    },
    showDescOpenMuliText: function (index) {
      return (this.descMultiOpenText[index] === undefined) ? this.defaultReadText : this.descMultiOpenText[index]
    }
  },
  watch: {
    selectedFeature: function (newFeature, oldFeature) {
      // if the selectedFeature has been set to null, then hide the popup
      this.show = !!newFeature
      // Reset the description boxes if the popup is hidden
      if (!this.show) {
        this.resetPopup()
      }
      this.$nextTick(() => {
        if (this.$refs.contentElement) {
          // Make sure the popup is scrolled to top when it's opened
          this.$refs.contentElement.scrollTop = 0
          // Update the popup's size to fit the content & browser
          const mapSize = this.mapElement.getBoundingClientRect()
          this.maxHeight = Math.min(mapSize.height * 0.8, DEFAULT_MAX_HEIGHT_PX) + 'px'
          this.width = Math.min(mapSize.width - 40, DEFAULT_WIDTH_PX) + 'px'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .myvic-map-core-indicator {
    $root: &;
    background-color: rpl-color('white');
    border-radius: rem(5px);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
    overflow: hidden;

    &--default:before {
      $size: rem(12px);
      content: '';
      display: block;
      width: $size;
      height: $size;
      background-color: rpl-color('white');
      position: absolute;
      bottom: -($size/2);
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    }

    &--float-left {
      height: 100%;
    }

    &__inner {
      position: relative;
      box-sizing: border-box;

      &--padded {
        // big right margin to pad close button
        padding: 1.25rem 2.7rem 1.25rem 1rem;
        overflow: auto;
      }
    }

    &__inner--flex {
      display: flex;
      flex-direction: column;
      max-height: inherit;
    }

    &__close {
      position: absolute;
      right: $rpl-space * 5;
      top: $rpl-space * 5;
      z-index: 10;
    }

    &__title-container {
      padding: 1.25rem 2.7rem 1rem 1.25rem;
      flex: none;
      background: rpl-color('light_neutral');
      box-shadow: 0px 2px 8px rgba(0,0,0,0.14);
    }

    &__title {
      color: rpl-color('primary');
      font-size: rpl-font-size('s');
      margin-top: 0;
      margin-bottom: 0;
    }

    &__title--multiple {
      font-size: rpl-font-size('m');
      color: rpl-color('black');
      margin-top: 0;
      margin-bottom: 0;
    }

    &__content-container {
      padding: 0.75rem 1.25rem 1.25rem 1.25rem;
      flex: 1 auto;
      overflow: auto;
    }

    &__value {
      font-size: rpl-font-size('xs');
      margin-bottom: $rpl-space-4;
    }

    &__list {
      font-size: rpl-font-size('s');
      list-style-type: decimal;
      margin-top: $rpl-space;
      padding-left: $rpl-space-4;
    }

    &__description {
      font-size: rpl-font-size('xs');
      margin-bottom: 0;

      // The /deep/ selector helps style elements
      // inside a v-html block
      & /deep/ #{$root}__link {
        color: rpl-color('primary');
      }
    }

    &__readmore {
      font-size: rpl-font-size('xs');
      text-decoration: underline;
      font-style: italic;
      margin-top: -$rpl-space-2;
      margin-bottom: $rpl-space-4;
      cursor: pointer;
    }
  }
</style>
