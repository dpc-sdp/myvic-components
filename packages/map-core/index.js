import YourvicMapCore from './index.vue'
import YourvicMapTileLayer from './MapTileLayer'
import YourvicMapVectorLayer from './MapVectorLayer'
import ol from './lib/ol'

const Style = ol.style.Style
const Text = ol.style.Text
const Fill = ol.style.Fill
const Stroke = ol.style.Stroke
const Icon = ol.style.Icon
const Circle = ol.style.Circle

export {
  YourvicMapCore,
  YourvicMapTileLayer,
  YourvicMapVectorLayer,
  Style,
  Text,
  Fill,
  Stroke,
  Icon,
  Circle
}

export default YourvicMapCore
