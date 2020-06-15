<template>
  <div class="yourvic-error" :class="cssClass">
    <span class="yourvic-error-span">{{ message }}</span>
  </div>
</template>

<script>
/**
 * The Error component can be used to display a specific error message
 */
export default {
  name: 'Error',
  props: {
    /**
     * the error message to display
     */
    message: {
      type: String,
      default: function () {
        return ''
      }
    },
    /**
     * the css class to apply to this component
     */
    errorClass: {
      type: String
    }
  },
  computed: {
    cssClass: function () {
      return `yourvic-error--${this.errorClass}`
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "../styles/global";
@import "../styles/charts";

$rpl-dev-error-text-color: $rpl-danger-color !default;

.yourvic-error {
  background-color: $error-bg-color;
  color: $rpl-dev-error-text-color;
  height: inherit;
  width: inherit;
  display: flex;
  align-items: center;

  &--chart {
    background-size: $error-grid-size;
    background-image: $error-grid-pattern;
  }

  &--map {
    background-size: $error-grid-size;
    background-image: $error-grid-pattern;
  }

  &-span {
    margin: 0 auto;
    padding: 0 $rpl-space-4 * 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
