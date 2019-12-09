<template>
     <div class="fire-map">
         <yourvic-map-core
         :center="getCenter"
         :baseMapUrl="baseMapUrl"
         :customMethods="customMethods"
         :zoom="getZoom"
         />
      </div>
 </template>

<script>
import { YourvicMapCore } from '@dpc-sdp/yourvic-map-core'
import ol from '@dpc-sdp/yourvic-map-core/lib/ol'

const { createImageIconStyle } = ol
const fontSizeInPx = '3.7'

// This value defines the colour of a single feature marker
const pointerColour = '#0095ec'

// This value defines the colour of the outline on clustered points
const clusterOutlineColour = '#999'

// This value defines the colour of the fill colour on clustered points
const clusterFillColour = '#ffffff'

// Access token for mapbox
const accessToken = 'pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'

const baseMapUrl = 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=' + accessToken

const styleSinglePoint = (feature, size) => {
// NOTE: the whitespace in the <text> element is
// important: `>${clusterSizeText}</text>`
// IE doesn't trim all the whitespace and it leads
// to off-center text

  return 'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
            width="${size}"
            height="${size}"
            viewBox="0 0 8 8">
            <circle
            fill="${pointerColour}"
            stroke-width="1"
            cx="4"
            cy="4"
            r="3.8"/>
            <text
            x="50%"
            y="50%"
            dy="1.25"
            text-anchor="middle"
            fill="#FFFFFF"
            style="font-size:${fontSizeInPx}px;
                font-weight: bold;
                font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
            ></text>
        </svg>
        `)
}

const styleCluster = (features, size) => {
  const clusterSizeText = features.length > 99 ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>` : features.length.toString()

  // NOTE: the whitespace in the <text> element is
  // important: `>${clusterSizeText}</text>`
  // IE doesn't trim all the whitespace and it leads
  // to off-center text
  return 'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 8 8">
        <circle
        stroke="${clusterOutlineColour}"
        fill="${clusterFillColour}"
        stroke-width="1"
        cx="4"
        cy="4"
        r="3.5"/>
        <text
        x="50%"
        y="50%"
        dy="1.25"
        text-anchor="middle"
        fill="${clusterOutlineColour}"
        style="font-size:${fontSizeInPx}px;
            font-weight: bold;
            font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
        >${clusterSizeText}</text>
    </svg>
    `)
}

const customMethods = {
  themeFeatureStyleFunction: (feature, resolution) => {
    const features = feature.get('features')
    const size = 30

    if (features.length > 1) {
      return [createImageIconStyle(
        styleCluster(features, size),
        'anonymous',
        [size, size]
      )]
    }

    return [createImageIconStyle(
      styleSinglePoint(features[0], size),
      'anonymous',
      [size, size]
    )]
  },

  createThemeLayer: ol => {
    const isIE = (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))

    // We expect standard GeoJSON here.
    // This implementation expects "name", "address", and "functions" as properties,
    // which can be changed in the generateFeatureName and generateFeatureDescription function below.
    const themeSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent => `/fireMap.json`
    })

    const clusterSource = new ol.source.ClusterSource({
      source: themeSource,
      distance: 40
    })

    if (isIE) {
      // internet explorer throws an error when using AnimatedCluster
      return new ol.layer.Vector({
        source: clusterSource,
        style: customMethods.themeFeatureStyleFunction
      })
    }

    return new ol.source.AnimatedCluster({
      animationDuration: 600,
      source: clusterSource,
      style: customMethods.themeFeatureStyleFunction
    })
  },
  featureMapper: (feature) => {
    const features = feature.get('features')

    const generateFeatureName = f => {
      return f.get('name') ? (f.get('name') + ' Fire Station') : 'Fire Station Name Currently Unavailable'
    }

    const generateFeatureDescription = f => {
      return ('<p>' + (f.get('address') || 'Fire Station Address Currently Unavailable') + '</p>' + '<p> (' + (f.get('functions') || 'Fire Station Function Currently Unavailable') + ')' + '</p>')
    }

    // Return data for single feature
    if (features.length === 1) {
      return {
        title: generateFeatureName(features[0]),
        content: generateFeatureDescription(features[0])
      }
    }

    // Return data for feature cluster
    return [
      {
        title: `${features.length} Fire Stations found in this area`
      },
      ...features.map((f, index) => {
        return {
          title: generateFeatureName(f),
          content: generateFeatureDescription(f)
        }
      })
    ]
  }
}

export default {
  name: 'FireMap',
  components: {
    YourvicMapCore
  },
  data: function () {
    return {
      baseMapUrl,
      customMethods,
      err: null
    }
  },
  computed: {
    getCenter () {
      return [16136905.843820328, -4553057.013522999]
    },
    getZoom () {
      return 6.5
    }
  }
}
</script>
