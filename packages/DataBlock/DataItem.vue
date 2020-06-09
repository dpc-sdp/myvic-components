<template>
  <div class="yourvic-data-item">
    <h3
      class="yourvic-data-item__title">
      {{ title }}
      <span
        v-if="trend"
        class="yourvic-data-item__icon">
        <!-- <icon
          :glyph="getIcon(icon)"
          :width="12"
          :height="12" /> -->
      </span>
    </h3>
    <p class="yourvic-data-item__description">{{ description }}</p>
  </div>
</template>

<script>

export default {
  components: {
    // Icon
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
      default: ''
    }
  },
  computed: {
    icon () {
      return this.trend === 'up' ? 'arrow-up' : 'arrow-down'
    }
  },
  methods: {
    // getIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/yourvic-global/styles/global";
  .yourvic-data-item {
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
        margin-bottom: rem-calc(2px);

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
      top: -3px;
      margin-left: 2px;
    }
  }
</style>
