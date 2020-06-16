import ol from '../lib/ol'
import globalStyles from '@dpc-sdp/yourvic-global/styles/export.scss'

const defaultStrokeColour = globalStyles.fillDefault
const selectedStrokeColour = globalStyles.strokeLine1
const defaultFillColour = ol.getRgbaFromString(globalStyles.fillTertiary, 0.2)
const selectedFillColour = ol.getRgbaFromString(globalStyles.strokeLine1, 0.2)
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

const defaultLineStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: defaultStrokeColour,
      width: 2
    })
  })
]

const selectedLineStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: selectedStrokeColour,
      width: 2
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
        styles = selected ? selectedPointStyle : defaultPointStyle
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

const createSelectedStyleFunction = () => {
  return createDefaultStyleFunction('name', true)
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
