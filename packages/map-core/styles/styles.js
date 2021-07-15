import ol from '../lib/ol'
import globalStyles from '@dpc-sdp/myvic-global/styles/stylesExport.js'
import { getSvg } from '@dpc-sdp/myvic-global/mapIcons/iconLibrary'

const defaultStrokeColour = globalStyles.fillSecondaryHover
const selectedStrokeColour = globalStyles.strokeLine1
const defaultFillColour = ol.getRgbaFromString(globalStyles.fillTertiary, 0.2)
const selectedFillColour = ol.getRgbaFromString(globalStyles.strokeLine1, 0.2)
const defaultLineColour = globalStyles.fillSecondaryHover
const selectedLineColour = globalStyles.strokeLine1
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

const createIePointStyle = (color) => {
  return [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        stroke: new ol.style.Stroke({
          color: color,
          width: 3
        }),
        fill: new ol.style.Fill({
          color: ol.getRgbaFromString(color, 0.6)
        })
      })
    })
  ]
}

const createIconStyle = (icon, size, color) => {
  const iconSvg = getSvg(icon, size, color)
  const anchor = icon.toLowerCase().includes('pin') ? [0.5, 0.92] : [0.5, 0.5]
  return [
    new ol.style.Style({
      image: new ol.style.Icon({
        anchor: anchor,
        opacity: 1,
        src: 'data:image/svg+xml;utf8,' + encodeURIComponent(iconSvg),
        scale: 1
      })
    })
  ]
}

const defaultPinStyle = createIconStyle('pinOuter', 's', globalStyles.fillSecondaryHover)
const selectedPinStyle = createIconStyle('pinOuter', 's', globalStyles.strokeLine1)

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
          styles = selected ? selectedPinStyle : defaultPinStyle
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

const createStylesFromIcon = (icon, color) => {
  const ie = createIePointStyle(color)
  const normal = createIconStyle(icon + 'Circle', 'm', color)
  const selectedMedium = createIconStyle(icon + 'Pin', 'm', color)
  const selectedLarge = createIconStyle(icon + 'Pin', 'l', color)
  return {
    ie,
    normal,
    selectedMedium,
    selectedLarge
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
  createStylesFromIcon,
  createDefaultClusteringStyleFunction
}

export default styles
