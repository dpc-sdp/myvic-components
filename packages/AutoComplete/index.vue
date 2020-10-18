<template>
  <form
    action=""
    @submit.prevent>
    <div class="myvic-auto-complete">
      <div class="myvic-auto-complete__input-wrapper">
        <input
          ref="input"
          aria-label="Search"
          v-model.trim="query"
          autocomplete="off"
          class="myvic-auto-complete__input"
          type="text"
          name="myvic-auto-complete"
          :placeholder="placeholder"
          value=""
          @keyup.enter="onEnter"
          @focus="onChange"
          @keyup.down="onKeyDown"
          @keyup.up="onKeyUp">
        <Spinner
          v-if="fetching"
          class="myvic-auto-complete__spinner"
          size="20"
        />
        <rpl-icon
          v-if="!query.length"
          class="myvic-auto-complete__icon"
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
        v-if="!gotError"
        v-show="showResults"
        :active-index="activeIndex"
        :result-item-line-style="resultItemLineStyle"
        :get-item-name="getItemName"
        :get-item-secondary-text="getItemSecondaryText"
        :showIcon="showIcon"
        :get-icon="getIcon"
        :highlight-match="false"
        :items="results"
        :query="validQuery"
        class="myvic-auto-complete__results"
        @item-selected="selectResult" />
      <error v-if="gotError" :message="error.toString()" errorClass="autocomplete" />
    </div>
  </form>
</template>
<script>

import _debounce from 'lodash.debounce'
import SearchResults from './SearchResults'
import ButtonClose from './ButtonClose'
import { isMobileSafari } from './utils/browser'
import { RplIcon } from '@dpc-sdp/ripple-icon'
import Error from '@dpc-sdp/myvic-global/components/Error'
import catchError from '@dpc-sdp/myvic-global/mixins/catchError'
import Spinner from '@dpc-sdp/myvic-global/components/Spinner'

/**
 * AutoComplete is a configurable component for displaying an autocomplete search with results
 */
export default {
  components: {
    RplIcon,
    SearchResults,
    ButtonClose,
    Error,
    Spinner
  },
  mixins: [catchError],
  props: {
    /**
     * The id of this AutoComplete. This will be passed on to the item-selected event so that handlers recognize which component initiated the event
     */
    id: {
      type: String,
      default: 'autocomplete'
    },
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
     * The placeholder text for the text input
     */
    placeholder: {
      type: String,
      default: 'Search'
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
     * Minimum length of the query (in characters) before filtering will occur
    */
    minQueryLength: {
      type: Number,
      default: 3
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
      validQuery: '',
      fetching: false
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

    this.debouncedOnChange = _debounce(this.onChange, 1000)
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

      if (this.query.length < this.minQueryLength) {
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
      if (this.activeIndex < this.results.length - 1) {
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
      this.$emit('item-cleared', this.id)
    },
    orderResults (results) {
      let firstCharMatches = []
      let otherMatches = []
      results.forEach(x => {
        let name = this.getItemName(x)
        if (!name || !name[0]) return
        if (name[0].toLowerCase() === this.validQuery[0].toLowerCase()) {
          firstCharMatches.push(x)
        } else {
          otherMatches.push(x)
        }
      })
      firstCharMatches.sort(this.sortByLength)
      otherMatches.sort(this.sortByLength)
      return firstCharMatches.concat(otherMatches)
    },
    selectResult (item) {
      this.results = []
      this.showResults = false
      this.resultSelected = true
      this.query = item.name
      this.$emit('item-selected', this.id, item)
    },
    sortByLength (item1, item2) {
      return this.getItemName(item1).length - this.getItemName(item2).length
    },
    async updateResults () {
      let results = this.filter(this.items, this.validQuery)
      this.fetching = true
      let resolved = await Promise.resolve(results).catch(e => { this.interceptError(e) })
      let orderedResults = this.orderResults(resolved)
      this.results = orderedResults
      this.fetching = false
    },
    removeFocus () {
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/myvic-global/styles/global";

  .myvic-auto-complete {
    display: flex;
    flex-direction: column;
    position: relative;
    background: #fff;
    color: $textColor;
    border-radius: 5px;

    &__spinner {
      position: relative;
      top: -1px;
      left: -2px;
    }

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
      width: calc(100% - (1rem + 32px))
    }

    &__results {
      position: absolute;
      top: 100%;
      width: 100%;
      z-index: 1;
      padding-left: 0;
    }
  }
</style>
