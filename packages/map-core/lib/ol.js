import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZSource from 'ol/source/XYZ'
import ClusterSource from 'ol/source/Cluster'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import MVT from 'ol/format/MVT'
import WFS from 'ol/format/WFS'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import Icon from 'ol/style/Icon'
import GeoJSON from 'ol/format/GeoJSON'
import { bbox } from 'ol/loadingstrategy'
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
  PinchRotate
} from 'ol/interaction'
import {
  defaults as DefaultControls,
  Zoom,
  Attribution,
  FullScreen
} from 'ol/control'

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

const ol = {
  doFeaturesShareSameLocation,
  createImageIconStyle,
  Map: Map,
  View: View,
  Overlay: Overlay,
  control: {
    defaults: DefaultControls,
    Zoom,
    Attribution,
    FullScreen
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
    VectorLayer,
    AnimatedCluster
  },
  style: {
    Style,
    Text,
    Fill,
    Stroke,
    Icon
  },
  format: {
    MVT,
    WFS,
    GeoJSON
  },
  loadingstrategy: {
    bbox
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
    PinchRotate
  }
}

export default ol
