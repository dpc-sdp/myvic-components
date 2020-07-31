import axios from 'axios'

const ARCGIS_SERVER_URL = 'https://geo.mapshare.vic.gov.au/arcgis'
const SERVICE_PATH = 'rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer'
const SUGGEST_REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_PATH}/suggest?f=json&text=`
const ADDRESS_REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_PATH}/findAddressCandidates?f=json&outSR=4326&magicKey=`

const MAPBOX_GEOCODER_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
// const MAPBOX_GEOCODER_PARAMS = '+victoria.json?country=AU&bbox=139,-40,151,-33&access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
const MAPBOX_GEOCODER_PARAMS = '+victoria.json?country=AU&proximity=144.9,-37.8&access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'

const fetchData = async (request) => {
  const response = await axios.get(request)
  return response
}

export const getAddressSuggestions = async (provider, query) => {
  if (provider === 'DELWP') {
    const response = await fetchData(SUGGEST_REQUEST + query)
    const addresses = response.data.suggestions.map(x => (
      {
        name: capitalize(x.text),
        magicKey: x.magicKey
      }
    ))
    return addresses
  } else if (provider === 'Mapbox') {
    const response = await fetchData(MAPBOX_GEOCODER_API + query + MAPBOX_GEOCODER_PARAMS)
    const addresses = response.data.features.map(x => (
      {
        ...x,
        name: capitalize(x.place_name)
      }
    ))
    return addresses
  } else {
    return []
  }
}

export const getAddress = async (provider, item) => {
  if (provider === 'DELWP') {
    const response = await fetchData(ADDRESS_REQUEST + item.magicKey)
    return response.data.candidates[0]
  } else if (provider === 'Mapbox') {
    return {
      ...item,
      address: item.place_name,
      location: {
        x: item.geometry.coordinates[0],
        y: item.geometry.coordinates[1]
      }
    }
  } else {
    return {}
  }
}

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=true} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str, lower = true) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
