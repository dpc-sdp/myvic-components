import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorLayer from 'ol/layer/Vector'
import VectorTileSource from 'ol/source/VectorTile'
import VectorSource from 'ol/source/Vector'
import XYZSource from 'ol/source/XYZ'
import ClusterSource from 'ol/source/Cluster'
import TileWMSSource from 'ol/source/TileWMS'
import OSMSource, { ATTRIBUTION as OSMAttribution } from 'ol/source/OSM'
import WMTSSource, { optionsFromCapabilities as WMTSOptionsFromCapabilities } from 'ol/source/WMTS'
import TileArcGISRestSource from 'ol/source/TileArcGISRest'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Icon from 'ol/style/Icon'
import Circle from 'ol/style/Circle'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import GeoJSON from 'ol/format/GeoJSON'
import EsriJSON from 'ol/format/EsriJSON'
import MVT from 'ol/format/MVT'
import WFS from 'ol/format/WFS'
import { bbox, tile } from 'ol/loadingstrategy'
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster'
import {
  defaults as DefaultInteractions,
  DragPan,
  KeyboardPan,
  DoubleClickZoom,
  PinchZoom,
  KeyboardZoom,
  MouseWheelZoom,
  DragZoom,
  DragRotate,
  PinchRotate,
  Select
} from 'ol/interaction'
import { click } from 'ol/events/condition'
import {
  defaults as DefaultControls,
  Zoom,
  Attribution,
  FullScreen,
  Control
} from 'ol/control'
import proj4 from 'proj4'
import { get as getProjection } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import TileGrid from 'ol/tilegrid/TileGrid'
import {
  createXYZ
} from 'ol/tilegrid'
import {
  Point,
  Polygon,
  MultiPolygon,
  Circle as CircleGeometry
} from 'ol/geom'
import { circular as circularPolygon } from 'ol/geom/Polygon'
import * as Color from 'ol/color'
import { createEmpty, extend, getCenter } from 'ol/extent'
import { easeOut } from 'ol/easing'
import Geolocation from 'ol/Geolocation'

const doFeaturesShareSameLocation = features => {
  if (features.length <= 1) return true
  const [x1, y1] = features[0].getGeometry().getCoordinates()
  for (let i = 1; i < features.length; i++) {
    const [x2, y2] = features[i].getGeometry().getCoordinates()
    if (x1 !== x2 || y1 !== y2) return false
  }
  return true
}

const createImageIconStyle = (src, crossOrigin, size) => {
  return new Style({
    image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
      crossOrigin,
      src,
      imgSize: size
    }))
  })
}

const getRgbaFromString = (colorString, opacity) => {
  // convert shorthand hex color to 6 digits
  colorString = colorString ? colorString.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
    return r + r + g + g + b + b
  }) : ''

  // split hex string with regex
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorString)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    opacity
  ] : [0, 0, 0, opacity]
}

const registerCustomProjections = () => {
  // Register GDA94 Projection (EPSG:4283) with OpenLayers
  // Adapted from https://spatialreference.org/ref/epsg/4283/proj4js/, with +axis=neu added to switch axis order
  proj4.defs('EPSG:4283', '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +axis=neu +no_defs')
  register(proj4)
  let proj4283 = getProjection('EPSG:4283')
  proj4283.setExtent([ 108.0000, -45.0000, 155.0000, -10.0000 ])
}

const createTileGrid = (mapView, zoomLevels, tileSize) => {
  // Calculate resolutions for each zoom level
  let resolutions = [mapView.getResolution()]
  for (let i = 1; i < zoomLevels; i++) {
    resolutions.push(resolutions[0] / Math.pow(2, i))
  }
  return new TileGrid({
    extent: mapView.getProjection().getExtent(),
    resolutions: resolutions,
    tileSize: tileSize
  })
}

const ol = {
  doFeaturesShareSameLocation,
  createImageIconStyle,
  getRgbaFromString,
  registerCustomProjections,
  createTileGrid,
  Map: Map,
  View: View,
  Overlay: Overlay,
  control: {
    defaults: DefaultControls,
    Zoom,
    Attribution,
    FullScreen,
    Control
  },
  layer: {
    Tile: TileLayer,
    Vector: VectorLayer,
    VectorTile: VectorTileLayer
  },
  source: {
    Vector: VectorSource,
    VectorTileSource,
    XYZ: XYZSource,
    ClusterSource,
    AnimatedCluster,
    TileWMS: TileWMSSource,
    WMTS: WMTSSource,
    WMTSOptionsFromCapabilities,
    OSM: OSMSource,
    OSMAttribution,
    TileArcGISRest: TileArcGISRestSource
  },
  style: {
    Style,
    Text,
    Fill,
    Stroke,
    Icon,
    Circle,
    Color
  },
  format: {
    MVT,
    WFS,
    GeoJSON,
    EsriJSON
  },
  loadingstrategy: {
    bbox,
    tile
  },
  Feature: Feature,
  interaction: {
    defaults: DefaultInteractions,
    DragPan,
    KeyboardPan,
    DoubleClickZoom,
    PinchZoom,
    KeyboardZoom,
    MouseWheelZoom,
    DragZoom,
    DragRotate,
    PinchRotate,
    Select
  },
  events: {
    condition: {
      click
    }
  },
  proj: {
    getProjection
  },
  tilegrid: {
    TileGrid,
    createXYZ
  },
  geom: {
    Point,
    Polygon,
    MultiPolygon,
    CircleGeometry,
    circularPolygon
  },
  extent: {
    createEmpty,
    extend,
    getCenter
  },
  easing: {
    easeOut
  },
  Geolocation
}

export default ol
