const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/wfs?SERVICE=wfs&VERSION=1.0.0&REQUEST=GetFeature'
const BASE_REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

export const createRequestUrl = (areaId, areaType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:rgn&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_REQUEST + requestPart
  return request
}
