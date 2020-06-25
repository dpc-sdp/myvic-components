import axios from 'axios'

const ARCGIS_SERVER_URL = 'https://geo.mapshare.vic.gov.au/arcgis'
const SERVICE_REQUEST = 'rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer/suggest?f=json&text='
const REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async (request) => {
  const response = await axios.get(request)
  return response
}

export const getAddresses = async (query) => {
  const response = await fetchData(REQUEST + query)
  const addresses = response.data.suggestions.map(x => (
    {
      name: capitalize(x.text)
    }
  ))
  return addresses
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
