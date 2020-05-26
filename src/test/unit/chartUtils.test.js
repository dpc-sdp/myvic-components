import utils from '../../../packages/global/utils/charts'
import styles from '../../../packages/global/styles/export.scss'

describe('getStyleArray', () => {
  /* eslint-disable indent */
  test.each`
    varName                             | length | expected
    ${'fillPie'}                        | ${1}   | ${['fillPie1']}
    ${'fillPieHover'}                   | ${3}   | ${['fillPieHover1', 'fillPieHover2', 'fillPieHover3']}
  `('returns $expected for $varName, $length', ({ varName, length, expected }) => {
    expect(utils.getStyleArray(styles, varName, length)).toStrictEqual(expected)
  })
  /* eslint-enable indent */
})
