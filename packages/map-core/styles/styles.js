import ol from '../lib/ol'
import globalStyles from '@dpc-sdp/myvic-global/styles/stylesExport.js'

const defaultStrokeColour = globalStyles.fillSecondaryHover
const selectedStrokeColour = globalStyles.strokeLine1
const defaultFillColour = ol.getRgbaFromString(globalStyles.fillTertiary, 0.2)
const selectedFillColour = ol.getRgbaFromString(globalStyles.strokeLine1, 0.2)
const defaultLineColour = globalStyles.fillSecondaryHover
const selectedLineColour = globalStyles.strokeLine1
const defaultMarkerColour = ol.getRgbaFromString(globalStyles.fillSecondaryHover, 1)
const selectedMarkerColour = ol.getRgbaFromString(globalStyles.strokeLine1, 1)
const defaultTextStrokeColour = 'black'
const defaultTextFillColour = 'white'

const defaultPointStyle = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 4,
      stroke: new ol.style.Stroke({
        color: defaultStrokeColour,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: defaultFillColour
      })
    })
  })
]

const selectedPointStyle = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 4,
      stroke: new ol.style.Stroke({
        color: selectedStrokeColour,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: selectedFillColour
      })
    }),
    zIndex: Infinity
  })
]

let markerSvg = `<svg width="24" height="32" viewBox="0 0 12 16"  xmlns="http://www.w3.org/2000/svg">
  <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 10.41 6 16 6 16C6 16 12 10.41 12 6C12 2.7492 9.31714 0 6 0C2.68286 0 0 2.7492 0 6ZM3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />
</svg>`

const defaultMarkerStyle = [
  new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      src: 'data:image/svg+xml;utf8,' + markerSvg,
      scale: 0.8,
      color: defaultMarkerColour
    })
  })
]

const selectedMarkerStyle = [
  new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      src: 'data:image/svg+xml;utf8,' + markerSvg,
      scale: 0.8,
      color: selectedMarkerColour
    })
  })
]

const defaultLineStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: defaultLineColour,
      width: 3
    })
  })
]

const selectedLineStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: selectedLineColour,
      width: 3
    }),
    zIndex: Infinity
  })
]

const defaultPolygonStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: defaultStrokeColour,
      width: 3
    }),
    fill: new ol.style.Fill({
      color: defaultFillColour
    })
  })
]

const selectedPolygonStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: selectedStrokeColour,
      width: 3
    }),
    fill: new ol.style.Fill({
      color: selectedFillColour
    }),
    zIndex: Infinity
  })
]

const defaultTextStyle = [
  new ol.style.Style({
    text: new ol.style.Text({
      font: '600 0.8rem "VIC-Regular", "Arial", "Helvetica", "sans-serif"',
      rotateWithView: false,
      placement: 'point',
      overflow: true,
      fill: new ol.style.Fill({
        color: defaultTextFillColour
      }),
      stroke: new ol.style.Stroke({
        color: defaultTextStrokeColour,
        width: 3
      })
    })
  })
]

const createDefaultStyleFunction = (labelAttribute, labelOnly, selected) => {
  return (feature, resolution) => {
    let geomType = feature.getGeometry().getType()
    let styles

    if (labelOnly) {
      styles = []
    } else {
      switch (geomType) {
        case ol.geom.GeometryType.POINT:
        case ol.geom.GeometryType.MULTI_POINT:
          styles = selected ? selectedMarkerStyle : defaultMarkerStyle
          break
        case ol.geom.GeometryType.LINE_STRING:
        case ol.geom.GeometryType.MULTI_LINE_STRING:
          styles = selected ? selectedLineStyle : defaultLineStyle
          break
        case ol.geom.GeometryType.POLYGON:
        case ol.geom.GeometryType.MULTI_POLYGON:
          styles = selected ? selectedPolygonStyle : defaultPolygonStyle
          break
        case ol.geom.GeometryType.GEOMETRY_COLLECTION:
          styles = defaultPointStyle.concat(defaultLineStyle, defaultPolygonStyle)
          break
        default:
          styles = defaultPolygonStyle
      }
    }

    if (labelAttribute) {
      defaultTextStyle[0].getText().setText(feature.get(labelAttribute))
      styles = styles.concat(defaultTextStyle)
    } else {
      defaultTextStyle[0].getText().setText()
    }

    return styles
  }
}

const styleCluster = (features, size) => {
  const fontSizeInPx = '3.7'
  const clusterSizeText = features.length > 99 ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>` : features.length.toString()
  const backgroundColor = '#ffffff'
  const strokeColor = globalStyles.fillTertiary
  const textColor = globalStyles.fillTertiary

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
          stroke="${strokeColor}"
          fill="${backgroundColor}"
          stroke-width="1"
          cx="4"
          cy="4"
          r="3.5"/>
        <text
          x="50%"
          y="50%"
          dy="1.25"
          text-anchor="middle"
          fill="${textColor}"
          style="font-size: ${fontSizeInPx}px;
            font-weight: bold;
            font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
        >${clusterSizeText}</text>
      </svg>
    `)
}

const createDefaultClusteringStyleFunction = (features) => {
  const size = 30
  return [ol.createImageIconStyle(
    styleCluster(features, size),
    'anonymous',
    [size, size]
  )]
}

const createSelectedStyleFunction = (labelAttribute, labelOnly = false) => {
  return createDefaultStyleFunction(labelAttribute, labelOnly, true)
}

const styles = {
  defaultPointStyle,
  selectedPointStyle,
  defaultLineStyle,
  selectedLineStyle,
  defaultPolygonStyle,
  selectedPolygonStyle,
  defaultTextStyle,
  createDefaultStyleFunction,
  createSelectedStyleFunction,
  createDefaultClusteringStyleFunction
}

export default styles
