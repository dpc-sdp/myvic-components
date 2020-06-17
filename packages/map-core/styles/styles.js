import ol from '../lib/ol'
import globalStyles from '@dpc-sdp/yourvic-global/styles/export.scss'

const defaultStrokeColour = globalStyles.fillDefault
const selectedStrokeColour = globalStyles.strokeLine1
const defaultFillColour = ol.getRgbaFromString(globalStyles.fillTertiary, 0.2)
const selectedFillColour = ol.getRgbaFromString(globalStyles.strokeLine1, 0.2)
const defaultLineColour = globalStyles.fillSecondaryHover
const selectedLineColour = globalStyles.strokeLine1
const defaultMarkerColour = ol.getRgbaFromString(globalStyles.fillSecondaryHover, 1)
const selectedMarkerColour = ol.getRgbaFromString(globalStyles.strokeLine1, 1)
const defaultTextColour = globalStyles.titleColor

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

let markerSvg = `<svg width="12" height="16" viewBox="0 0 12 16"  xmlns="http://www.w3.org/2000/svg">
  <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 10.41 6 16 6 16C6 16 12 10.41 12 6C12 2.7492 9.31714 0 6 0C2.68286 0 0 2.7492 0 6ZM3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />
</svg>`

const defaultMarkerStyle = [
  new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      src: 'data:image/svg+xml;utf8,' + markerSvg,
      scale: 1.2,
      color: defaultMarkerColour
    })
  })
]

const selectedMarkerStyle = [
  new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      src: 'data:image/svg+xml;utf8,' + markerSvg,
      scale: 1.2,
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
      width: 2
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
      width: 2
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
      font: 'normal 0.8rem "VIC-Regular", "Arial", "Helvetica", "sans-serif"',
      rotateWithView: false,
      placement: 'point',
      overflow: true,
      fill: new ol.style.Fill({
        color: defaultTextColour
      }),
      stroke: new ol.style.Stroke({
        color: defaultTextColour,
        width: 1
      })
    })
  })
]

const createDefaultStyleFunction = (labelAttribute, selected) => {
  return (feature, resolution) => {
    let geomType = feature.getGeometry().getType()
    let styles
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

    if (labelAttribute) {
      defaultTextStyle[0].getText().setText(feature.get(labelAttribute))
      styles = styles.concat(defaultTextStyle)
    } else {
      defaultTextStyle[0].getText().setText()
    }

    return styles
  }
}

const createSelectedStyleFunction = (labelAttribute) => {
  return createDefaultStyleFunction(labelAttribute, true)
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
  createSelectedStyleFunction
}

export default styles
