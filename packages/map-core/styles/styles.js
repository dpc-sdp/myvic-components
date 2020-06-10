import ol from '../lib/ol'
import globalStyles from '@dpc-sdp/yourvic-global/styles/export.scss'

const defaultPointStyle = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 4,
      stroke: new ol.style.Stroke({
        color: globalStyles.fillDefault,
        width: 2
      }),
      fill: new ol.style.Fill({
        // color: globalStyles.fillDefaultHoverLight // throws assertion error during tests
        color: [0, 169, 224, 0.2]
      })
    })
  })
]

const defaultLineStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: globalStyles.fillDefault,
      width: 3
    })
  })
]

const defaultPolygonStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: globalStyles.fillDefault,
      width: 3
    }),
    fill: new ol.style.Fill({
      color: globalStyles.fillDefaultHoverLight
    })
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
        color: globalStyles.titleColor
      }),
      stroke: new ol.style.Stroke({
        color: globalStyles.titleColor,
        width: 1
      })
    })
  })
]

const createDefaultStyleFunction = (labelAttribute) => {
  return (feature, resolution) => {
    let geomType = feature.getGeometry().getType()
    let styles
    switch (geomType) {
      case ol.geom.GeometryType.POINT:
      case ol.geom.GeometryType.MULTI_POINT:
        styles = defaultPointStyle
        break
      case ol.geom.GeometryType.LINE_STRING:
      case ol.geom.GeometryType.MULTI_LINE_STRING:
        styles = defaultLineStyle
        break
      case ol.geom.GeometryType.POLYGON:
      case ol.geom.GeometryType.MULTI_POLYGON:
        styles = defaultPolygonStyle
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

const styles = {
  defaultPointStyle,
  defaultLineStyle,
  defaultPolygonStyle,
  defaultTextStyle,
  createDefaultStyleFunction
}

export default styles
