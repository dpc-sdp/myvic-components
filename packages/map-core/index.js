import MyvicMapCore from './index.vue'
import MyvicMapTileLayer from './MapTileLayer'
import MyvicMapVectorLayer from './MapVectorLayer'
import MyvicMapVectorTileLayer from './MapVectorTileLayer'
import MyvicMapLegend from './MapLegend'
import ol from './lib/ol'

const Style = ol.style.Style
const Text = ol.style.Text
const Fill = ol.style.Fill
const Stroke = ol.style.Stroke
const Icon = ol.style.Icon
const Circle = ol.style.Circle
const EsriJSON = ol.format.EsriJSON
const Feature = ol.Feature
const Point = ol.geom.Point
const Polygon = ol.geom.Polygon
const CircleGeometry = ol.geom.CircleGeometry
const circularPolygon = ol.geom.circularPolygon

export {
  MyvicMapCore,
  MyvicMapTileLayer,
  MyvicMapVectorLayer,
  MyvicMapVectorTileLayer,
  MyvicMapLegend,
  Style,
  Text,
  Fill,
  Stroke,
  Icon,
  Circle,
  EsriJSON,
  Feature,
  Point,
  Polygon,
  CircleGeometry,
  circularPolygon
}

export default MyvicMapCore
