import { capitalize } from '../../../packages/AddressSearch/utils/getAddresses'

describe('capitalize', () => {
  /* eslint-disable indent */
  test.each`
    addressString                 | lower    | expected
    ${'22 edgar street rye 3941'} | ${true} | ${'22 Edgar Street Rye 3941'}
    ${'22 edGAr StrEET rYe 3941'} | ${true}  | ${'22 Edgar Street Rye 3941'}
    ${'22 edGAr StrEET rYe 3941'} | ${false} | ${'22 EdGAr StrEET RYe 3941'}
  `('returns $expected for $addressString, $lower', ({ addressString, lower, expected }) => {
    expect(capitalize(addressString, lower)).toStrictEqual(expected)
  })
  /* eslint-enable indent */
})
