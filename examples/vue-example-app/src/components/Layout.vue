<template>
  <rpl-base-layout class="myvic-example-layout">
    <div slot="header" class="myvic-example-header">
      <rpl-site-header />
    </div>
    <rpl-page-layout class="myvic-example-main">
      <rpl-container>
        <example-site />
      </rpl-container>
    </rpl-page-layout>
    <div slot="footer" class="myvic-example-footer">
    </div>
  </rpl-base-layout>
</template>

<script>
  import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
  import { RplContainer } from '@dpc-sdp/ripple-grid'
  import RplSiteHeader from '@dpc-sdp/ripple-site-header'
  import ExampleSite from './ExampleSite'

  export default {
    name: 'Layout',
    components: {
      RplBaseLayout,
      RplPageLayout,
      RplContainer,
      RplSiteHeader,
      ExampleSite
    },
    data: () => {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .myvic-example-layout {
  }
</style>
