<template>
  <div>
    <div class="yourvic-map-categories-page__menu">
      <rpl-text-label class="yourvic-map-categories-page__header-btn" size="small" emphasis >
        Browse by {{isArea ? 'area' : 'category'}}
      </rpl-text-label>
      <a class="yourvic-map-categories-page__other-btn" @click="clickShowOther">
        <rpl-text-label
          iconColor="primary"
          :underline="true"
          size="small"
          emphasis
        >
        Browse by {{isArea ? 'category' : 'area'}}
        </rpl-text-label>
      </a>
    </div>
    <yourvicMapCard
      v-for="(item, index) in items"
      @click="setCategory"
      :key="index"
      :isArea="isArea"
      :item="item"
    />
  </div>
</template>

<script>
import { RplTextLabel } from '@dpc-sdp/ripple-link'
import YourVicMapCard from './YourVicMapCard'

export default {
  name: 'YourVicMapCategoriesPage',
  components: {
    RplTextLabel,
    YourVicMapCard
  },
  props: {
    items: Array,
    isArea: Boolean
  },
  methods: {
    clickShowOther () {
      if (this.isArea) {
        this.$emit('clickShowCategories')
      } else {
        this.$emit('clickShowArea')
      }
    },
    setCategory (cat) {
      this.$emit('clickCategory', cat)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.yourvic-map-categories-page__menu {
  display: flex;
  .yourvic-map-categories-page__header-btn {
    &:hover, &:focus {
      color: rpl-color('extra_dark_neutral');
      text-decoration: none;
      outline: none;
      cursor: default;
    }
  }
  .yourvic-map-categories-page__other-btn {
    .rpl-text-label {
      border-bottom-color: rpl-color('secondary') !important;
    }
    // This makes the area button float right
    margin-left: auto;
    margin-right: $rpl-space;
    order: 2;
    cursor: pointer;
  }
}

</style>
