<template>
  <button
    type="button"
    v-bind:class="{'myvic-map-core-close-btn': true, 'myvic-map-core-close-btn--small': size === 'small', 'myvic-map-core-close-btn--light': color === 'light'}"
    @click="handleClick()"
  >
    <span v-if="label" class="myvic-map-core-close-btn__label">{{ label }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17">
      <path class="st0" d="M9.41362 8.78931L15.7065 2.49641C16.0975 2.10541 16.0975 1.47342 15.7065 1.08243C15.3155 0.691436 14.6835 0.691436 14.2925 1.08243L7.99964 7.37533L1.70674 1.08243C1.31574 0.691436 0.683751 0.691436 0.292757 1.08243C-0.0982368 1.47342 -0.0982368 2.10541 0.292757 2.49641L6.58566 8.78931L0.292757 15.0822C-0.0982368 15.4732 -0.0982368 16.1052 0.292757 16.4962C0.487754 16.6912 0.74375 16.7892 0.999746 16.7892C1.25574 16.7892 1.51174 16.6912 1.70674 16.4962L7.99964 10.2033L14.2925 16.4962C14.4875 16.6912 14.7435 16.7892 14.9995 16.7892C15.2555 16.7892 15.5115 16.6912 15.7065 16.4962C16.0975 16.1052 16.0975 15.4732 15.7065 15.0822L9.41362 8.78931Z"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      // one of 'large|small'
      type: String,
      default: 'large'
    },
    label: {
      // string or null
      type: String,
      default: null
    },
    color: {
      // one of 'dark|light'
      type: String,
      default: 'dark'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  $myvic-map-core-close-btn-color: rpl-color('black') !default;
  $myvic-map-core-close-btn-color-revse: rpl-color('white') !default;
  $myvic-map-core-close-btn-color-hover: rpl-color('dark_neutral') !default;

  .myvic-map-core-close-btn {
    fill: $myvic-map-core-close-btn-color;
    cursor: pointer;
    padding: 0;
    border: 0;
    background: transparent;
    line-height: 1;

    &:hover {
      fill: $myvic-map-core-close-btn-color-hover;
    }
    &--large {
      // This is not in used at this moment.
      width: rem(30px);
      height: rem(30px);
    }
    &--small {
      width: rem(20px);
      height: rem(20px);
    }
    &--light {
      // This is not in used at this moment.
      fill: $myvic-map-core-close-btn-color-revse;
    }
    &__label {
      // This is not in used at this moment, design may need to be reviewed.
      font-size: rpl-font-size('xs');
      line-height: 1.2rem;
    }
  }
</style>
