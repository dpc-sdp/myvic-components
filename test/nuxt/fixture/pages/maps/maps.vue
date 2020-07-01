<template>
  <div>
      <component :is="mapFire" ></component>
      <component :is="mapWifi" ></component>
      <component :is="mapFVWP"></component>
  </div>
</template>

<script>
// TODO: we can't use import directly as "ol.js" will throw error "window not found" in server side.

export default {
  data () {
    return {
      mapFire: null,
      mapWifi: null,
      mapFVWP: null
    }
  },
  mounted () {
    // TODO: So we need to use dynamic import in mounted for now.
    // Ideally, "ol.js" issue should be handled inside map-core component.
    this.mapFire = () => import(/* webackChunkName: 'yourvic-fire-map' */ '@dpc-sdp/yourvic-maps/YourvicFireMap').then(m => m.YourvicFireMap)
    this.mapWifi = () => import(/* webackChunkName: 'yourvic-free-wifi-map' */ '@dpc-sdp/yourvic-maps/YourvicFreeWifiMap').then(m => m.YourvicFreeWifiMap)
    this.mapFVWP = () => import(/* webackChunkName: 'yourvic-map-prevention-family-violence' */ '@dpc-sdp/yourvic-maps/YourvicMapPreventionFamilyViolence').then(m => m.YourvicMapPreventionFamilyViolence)
  }
}
</script>
