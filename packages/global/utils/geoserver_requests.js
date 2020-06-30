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
