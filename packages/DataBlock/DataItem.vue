<template>
  <div class="myvic-data-item">
    <h3
      class="myvic-data-item__title">
      {{ title }}
      <span
        v-if="trend"
        class="myvic-data-item__icon">
        <rpl-icon
          :symbol="icon"
          :class="trend === 'up' ? 'myvic-data-item__icon-up' : 'myvic-data-item__icon-down'"
          size="m"
        />
      </span>
    </h3>
    <p class="myvic-data-item__description">{{ description }}</p>
  </div>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  components: {
    RplIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    trend: {
      type: String,
      default: '',
      validator: value => ['', 'up', 'down'].includes(value)
    }
  },
  computed: {
    icon () {
      return this.trend === 'up' ? 'arrow_up_primary' : 'arrow_down_primary'
    }
  },
  methods: {
    // getIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/myvic-global/styles/global";
  .myvic-data-item {
    &__title {
      font-weight: 700;
      font-size: rem-calc(18);
      color: $titleColor;
      margin-bottom: rem-calc(7);
      margin-top: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      //@include breakpoint(medium) {
      font-size: rem-calc(24);
      //}

      .data-overlay & {
        margin-bottom: rem-calc(2);

        //@include breakpoint(medium) {
        margin-bottom: rem-calc(7);
        //}
      }
    }

    &__description {
      font-size: rem-calc(13);
      line-height: 1.3;
      font-weight: 500;
      color: $textColor;
    }

    &__icon {
      position: relative;
      top: -1px;
      margin-left: 2px;
    }
    &__icon-up {
      fill: #0095C7;
    }
    &__icon-down {
      fill: #ca4c21;
    }
  }
</style>
