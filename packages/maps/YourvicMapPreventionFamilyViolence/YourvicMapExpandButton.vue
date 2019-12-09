<template>
  <rpl-button
    class="expand-btn"
    theme="primary"
    @click.native.prevent="clickExpand"
  >
    <rpl-icon
      :symbol="buttonIcon"
      color="white"
      size="m"
    />
  </rpl-button>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'YourvicMapExpandButton',
  props: {
    expanded: Boolean
  },
  components: {
    RplIcon
  },
  computed: {
    buttonIcon () {
      return this.expanded ? 'up' : 'down'
    }
  },
  methods: {
    clickExpand () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';
.yourvic-map-container__expand-btn-container {
  button {
    // padding: 0 !important;
    font-size: 1.5em;
    padding: $rpl-space-4;
    display:block;
    &:focus {
      outline: none; // Hiding the orange outline cause by chevron when focussed.
    }
  }
}
</style>
