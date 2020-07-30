import axios from 'axios'

const ARCGIS_SERVER_URL = 'https://geo.mapshare.vic.gov.au/arcgis'
const SERVICE_PATH = 'rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer'
const SUGGEST_REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_PATH}/suggest?f=json&text=`
const ADDRESS_REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_PATH}/findAddressCandidates?f=json&outSR=4326&magicKey=`

const fetchData = async (request) => {
  const response = await axios.get(request)
  return response
}

export const getAddressSuggestions = async (query) => {
  const response = await fetchData(SUGGEST_REQUEST + query)
  const addresses = response.data.suggestions.map(x => (
    {
      name: capitalize(x.text),
      magicKey: x.magicKey
    }
  ))
  return addresses
}

export const getAddress = async (magicKey) => {
  const response = await fetchData(ADDRESS_REQUEST + magicKey)
  return response.data.candidates[0]
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
