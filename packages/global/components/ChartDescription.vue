<template>
  <a class="yourvic-chart-long-description" :class="cssClass" :href="longDesc">Chart Description</a>
</template>

<script>

export default {
  props: {
    longDesc: {
      type: String,
      required: true
    },
    cssClass: {
      type: String
    }
  }
}
</script>

<style lang="scss">
</style>
