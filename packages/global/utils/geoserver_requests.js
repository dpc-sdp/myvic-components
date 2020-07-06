import axios from 'axios'

const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const BASE_OWS_REQUEST = GEOSERVER_URL + '/myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature'
const BASE_WFS_REQUEST = GEOSERVER_URL + '/myvic/wfs?SERVICE=wfs&VERSION=1.0.0&REQUEST=GetFeature'

export const createOwsRequestUrl = (areaId, areaType, dataType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:${dataType}_${areaType}&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:${dataType}_${areaType}&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:${dataType}_rgn&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_OWS_REQUEST + requestPart
  return request
}

export const createWfsRequestUrl = (areaId, areaType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:rgn&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_WFS_REQUEST + requestPart
  return request
}

export const createLegendValuesRequestUrl = (layer, areaType) => {
  let areaPart = areaType === 'region' ? 'rgn' : areaType
  let requestPart = `&typeName=myvic:legend_values&viewparams=layer:${layer}_${areaPart}`
  const request = BASE_OWS_REQUEST + requestPart
  return request
}

export const fetchData = async (request) => {
  const { data } = await axios.get(request)
  return data
}

export const myVictoriaRotatingColours = {
  red: 'Red',
  blue: 'Blue',
  pink: 'Pink',
  teal: 'Teal',
  purple: 'Purple'
}

export const myVictoriaLayerStops = {
  population_suburb: [0, 75, 154, 170, 1591, 11870, 26620],
  population_lga: [803, 27209, 46101, 86647, 135436, 182735, 252381],
  population_rgn: [47399, 101693, 157864, 232896, 475157, 784806, 874963],
  population_growth_suburb: [-8.19, -1.98, 3.73, 6.74, 7.19, 13.10, 23.97],
  population_growth_lga: [-8.19, -1.98, 3.73, 6.74, 7.19, 13.10, 23.97],
  population_growth_rgn: [-1.79, 1.40, 5.47, 7.63, 10.21, 13.06, 24.85],
  income_personal_suburb: [75, 443, 574, 657, 678, 774, 997],
  income_personal_lga: [377, 472, 532, 597, 674, 758, 902],
  income_personal_rgn: [442.5, 464.5, 503, 546.5, 596, 765.5, 883],
  income_personal_growth_suburb: [-6.46, 1.56, 4.67, 8.01, 11.66, 17.23, 28.23],
  income_personal_growth_lga: [-6.46, 1.56, 4.67, 8.01, 11.66, 17.23, 28.23],
  income_personal_growth_rgn: [-0.55, 3.12, 5.22, 7.88, 9.59, 11.05, 21.63],
  income_household_suburb: [225, 811, 1128, 1375, 1440, 1757, 2068],
  income_household_lga: [685, 838, 1022, 1214, 1331, 1551, 1842],
  income_household_rgn: [815, 931, 1062, 1208.5, 1414, 1672, 2013.5],
  income_household_growth_suburb: [-14.69, -7.17, -3.11, 0.52, 5.00, 11.01, 24.81],
  income_household_growth_lga: [-14.69, -7.17, -3.11, 0.52, 5.00, 11.01, 24.81],
  income_household_growth_rgn: [-5.36, -1.60, 3.26, 5.03, 7.71, 11.18, 19.09],
  rent_suburb: [13, 126, 166, 201, 251, 298, 378],
  rent_lga: [80, 160, 210, 250, 300, 331, 391],
  rent_rgn: [140, 180, 225, 290, 315, 344.5, 403],
  mortgage_suburb: [175, 980, 1202, 1351, 1518, 1734, 2156],
  mortgage_lga: [650, 997, 1248, 1315, 1582, 1798, 2147],
  mortgage_rgn: [780, 1053.5, 1266.5, 1570, 1800, 2167, 2350],
  house_price_suburb: [55000, 255000, 630000, 865000, 944000, 1562500, 3600000],
  education_suburb: [0, 6.12, 19.75, 26.46, 32.47, 40.01, 53.54],
  education_lga: [21.38, 25.59, 31.38, 39.72, 49.83, 60.24, 69.96],
  education_rgn: [27.13, 29.60, 31.55, 36.19, 49.37, 69.34, 74.12],
  employment_lga: [47.78, 52.58, 54.07, 54.24, 56.25, 57.96, 58.96, 59.08, 59.81, 64.8, 68],
  employment_rgn: [52.96, 54.16, 54.9, 55.48, 56.9, 57.37, 57.62, 57.92, 58.66, 59.61, 63.83],
  employment_suburb: [15.79, 40.91, 46.25, 49.15, 52.04, 56.09, 59.41, 61.02, 61.41, 67.46, 84.62]
}

export const buildMyVictoriaMapboxStyle = async (colour, stops, property, sourceLayer) => {
  let { data: glStyle } = await axios.get(`${GEOSERVER_URL}/rest/styles/${colour}.MBStyle`)
  let fillStops = glStyle.layers[0].paint['fill-color'].stops
  fillStops.forEach((stop, idx) => {
    stop[0] = parseFloat(stops[idx])
  })
  glStyle.layers[0].paint['fill-outline-color']['property'] = property
  glStyle.layers[0].paint['fill-color']['property'] = property
  glStyle.layers[0]['source-layer'] = sourceLayer
  glStyle.sources = {
    [colour]: {
      type: 'vector'
    }
  }
  return glStyle
}
