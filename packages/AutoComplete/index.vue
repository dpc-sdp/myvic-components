<template>
  <div class="yourvic-auto-complete">
    <div class="yourvic-auto-complete__input-wrapper">
      <input
        ref="input"
        v-model.trim="query"
        autocomplete="off"
        class="yourvic-auto-complete__input"
        type="text"
        name="yourvic-auto-complete"
        placeholder="Search"
        value=""
        @keyup.enter="onEnter"
        @focus="onChange"
        @keyup.down="onKeyDown"
        @keyup.up="onKeyUp">
      <rpl-icon
        v-if="!query.length"
        class="yourvic-auto-complete__icon"
        symbol="search"
        color="extra_dark_neutral"
        size="m"
      />
      <ButtonClose
        v-if="query.length"
        size="m"
        @click="onClear"
      />
    </div>
    <search-results
      v-show="showResults"
      :active-index="activeIndex"
      :result-item-line-style="resultItemLineStyle"
      :get-item-name="getItemName"
      :get-item-secondary-text="getItemSecondaryText"
      :showIcon="showIcon"
      :get-icon="getIcon"
      :items="results"
      :query="validQuery"
      class="yourvic-auto-complete__results"
      @item-selected="selectResult" />
  </div>
</template>
<script>

import _debounce from 'lodash.debounce'
import SearchResults from './SearchResults'
import ButtonClose from './ButtonClose'
import { isMobileSafari } from './utils/browser'
import { RplIcon } from '@dpc-sdp/ripple-icon'

/**
 * AutoComplete is a configurable component for displaying an autocomplete search with results
 */
export default {
  components: {
    RplIcon,
    SearchResults,
    ButtonClose
  },
  props: {
    /**
     * The full list of items to search against
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * The style of the result items. `Double` (default) will render two lines per result; the top line will contain the item name and the second line will optionally
     * contain the item description. `Single` will render only one line per item; it will contain the item's name and optionally a tag next to the name
     */
    resultItemLineStyle: {
      type: String,
      default: 'double',
      validator: value => ['single', 'double'].includes(value)
    },
    /**
     * A function to get the name of an item. This will appear as the main label in the results
     */
    getItemName: {
      type: Function,
      default: ({ name }) => name
    },
    /**
     * A function to get the secondary text for an item. The secondary text is either the description in the `double` item line style or the tag in the `single` style
     */
    getItemSecondaryText: {
      type: Function,
      default: ({ description }) => description
    },
    /**
     * A function to filter the items list when the user types in a search string. The first parameter is the items list and the second parameter is the search string
     */
    filter: {
      type: Function,
      default: (items, query) => items.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    },
    /**
     * The initial valueof the input box
     */
    initialValue: {
      type: String,
      default: ''
    },
    /**
     * If this is set to true, some of the component styles will be adjusted
     */
    isMobile: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to show an icon before the item name. This applies to both result item line styles
     */
    showIcon: {
      type: Boolean,
      default: false
    },
    /**
     * A function to get the icon name from the item. The default behavior is to try to read the `icon` property. This option allows for custom icons from the
     * [Ripple icon library](https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--icon-library) and even for a custom icon per different item
     */
    getIcon: {
      type: Function,
      default: ({ icon }) => icon
    },
    /**
     * If set to true all of the items will be shown on first render. Useful only for debugging
     */
    debugMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: -1,
      query: '',
      results: this.debugMode ? this.items : [],
      resultSelected: false,
      showResults: this.debugMode,
      validQuery: ''
    }
  },
  watch: {
    query () {
      this.debouncedOnChange()
    },
    initialValue () {
      this.onInitialValueChange()
    }
  },
  created () {
    if (this.initialValue) {
      this.onInitialValueChange()
    }

    this.debouncedOnChange = _debounce(this.onChange, 250)
  },
  destroyed () {
    document.removeEventListener('click', this.closeResults)
  },
  mounted () {
    document.addEventListener('click', this.closeResults)
    if (this.isMobile && isMobileSafari()) {
      // this is a lovely hack to force the keyboard focus into the
      // input field quickly on mount, because for some reason that
      // fixes issues with the fixed header not showing up properly
      this.$refs.input.focus()
      setTimeout(() => { this.$refs.input.blur() }, 50)
    }
  },
  methods: {
    closeResults ({ target }) {
      if (!this.$el.contains(target)) {
        this.showResults = false
      }
    },
    onChange () {
      this.$emit('input-changed', this.query.length !== 0)

      if (this.query.length < 3) {
        this.showResults = false
        return
      }

      if (this.resultSelected) {
        this.resultSelected = false
        return
      }

      this.validQuery = this.query
      this.showResults = true
      this.updateResults()
    },
    onInitialValueChange () {
      this.resultSelected = true
      this.query = this.initialValue
    },
    onEnter () {
      if (this.activeIndex > -1) {
        this.selectResult(this.results[this.activeIndex])
        this.activeIndex = -1
      }
    },
    onKeyDown () {
      if (this.activeIndex < this.results.length) {
        this.activeIndex++
      }
    },
    onKeyUp () {
      if (this.activeIndex > -1) {
        this.activeIndex--
      }
    },
    onClear () {
      this.query = ''
      this.resultSelected = false
    },
    selectResult (item) {
      this.results = []
      this.showResults = false
      this.resultSelected = true
      this.query = item.name
      this.$emit('item-selected', item)
    },
    updateResults () {
      this.results = this.filter(this.items, this.validQuery)
    },
    removeFocus () {
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/yourvic-global/styles/global";

  .yourvic-auto-complete {
    display: flex;
    flex-direction: column;
    position: relative;
    background: #fff;

    .is-mobile & {
      // position: fixed;
      // top: $header-height;
      // padding-top: $autocomplete-spacing-top;
      position: relative;
      top: 0;
      padding-top: 0;
      background: #fff;
      width: 100%;
      z-index: 10;
    }

    &__input-wrapper {
      align-items: center;
      border-radius: 5px;
      border: 1px solid $textColor;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;

      .is-mobile & {
        background-color: #fff;
        border: none;
        border-radius: 0;
        border-bottom: 2px solid $textColor;
      }

      .icon.close-btn {
        position: relative;
        top: 2px;
      }
    }

    &__input {
      border: none;
      font-size: rem-calc(14);
      outline: none;
      padding: 1rem 0;
      width: calc(100% - (1rem + 16px))
    }

    &__results {
      position: absolute;
      top: 100%;
      width: 100%;
      z-index: 1;
    }
  }
</style>
