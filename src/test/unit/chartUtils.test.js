import utils from '../../../packages/global/utils/charts'
import styles from '../../../packages/global/styles/export.scss'

describe('getStyleArray', () => {
  /* eslint-disable indent */
  test.each`
    varName                             | length | expected
    ${'fill'}                        | ${1}   | ${['fill1']}
    ${'fillHover'}                   | ${3}   | ${['fillHover1', 'fillHover2', 'fillHover3']}
  `('returns $expected for $varName, $length', ({ varName, length, expected }) => {
    expect(utils.getStyleArray(styles, varName, length)).toStrictEqual(expected)
  })
  /* eslint-enable indent */
})
