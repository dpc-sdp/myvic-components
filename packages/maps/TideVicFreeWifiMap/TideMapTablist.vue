<template>
  <div class="yourvic-map-tablist" role="tablist">
    <div class="yourvic-map-tablist__inner">
      <div v-if="title"
        class="yourvic-map-tablist__title"
        v-html="title" />
      <div class="yourvic-map-tablist__list">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="yourvic-map-tablist__item"
          :class="{
            'yourvic-map-tablist__item--active': tabIsActive(index)
          }"
          role="tab"
          :aria-selected="tabIsActive(index) ? 'true' : 'false'"
          @click="setActive(index)">
          {{tab}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YourVicMapTablist',
  props: {
    title: String,
    tabs: Array
  },
  data: function () {
    return {
      activeTab: 0
    }
  },
  computed: {
  },
  methods: {
    tabIsActive (index) {
      return this.activeTab === index
    },
    setActive (index) {
      this.activeTab = index
      this.$emit('update', index)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $yourvic-map-tablist-background-color: rpl-color('primary') !default;
  $yourvic-map-tablist-text-color: rpl-color('white') !default;

  $yourvic-map-tablist-title-padding: rem(10px) !default;
  $yourvic-map-tablist-title-ruleset: ('l', 1.5, 'regular') !default;
  $yourvic-map-tablist-title-bold-ruleset: ('l', 1.5, 'bold') !default;
  $yourvic-map-tablist-title-color: rpl-color('white') !default;
  $yourvic-map-tablist-button-border-size: rem(5px) !default;
  $yourvic-map-tablist-button-padding: (
    xs: $rpl-space-2 rem(10px),
    l: $rpl-space-4
  ) !default;
  $yourvic-map-tablist-button-color: rpl-color('mid_neutral_1') !default;
  $yourvic-map-tablist-button-color-active: rpl-color('white') !default;
  $yourvic-map-tablist-button-border-active: rpl-color('white') !default;

  $rpl-content-padding-top: (
    xs: $rpl-space * 4,
    m: $rpl-space * 10,
    l: $rpl-space * 17,
    xl: $rpl-space * 20,
    xxxl: $rpl-space * 22
  ) !default;

  .yourvic-map-tablist {
    &__inner {
      background-color: $yourvic-map-tablist-background-color;
      color: $yourvic-map-tablist-text-color;

      @include rpl_breakpoint(l) {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    &__title {
      padding: $yourvic-map-tablist-title-padding $yourvic-map-tablist-title-padding 0;
      @include rpl_typography_ruleset($yourvic-map-tablist-title-ruleset);
      color: $yourvic-map-tablist-title-color;

      @include rpl_breakpoint(l) {
        padding-bottom: $yourvic-map-tablist-title-padding;
      }

      strong {
        @include rpl_typography_ruleset($yourvic-map-tablist-title-bold-ruleset);
      }
    }

    &__item { // <button>
      appearance: none;
      background: transparent;
      border: 0;
      border-bottom: $yourvic-map-tablist-button-border-size solid transparent;
      color: $yourvic-map-tablist-button-color;

      @each $bp, $val in $yourvic-map-tablist-button-padding {
        @include rpl_breakpoint($bp) {
          padding: $val;
        }
      }

      &:hover {
        cursor: pointer;
      }

      &--active {
        color: $yourvic-map-tablist-button-color-active;
        border-bottom-color: $yourvic-map-tablist-button-border-active;
      }
    }
  }
</style>
