import { removeDecimals } from '../../helpers/Helper'

describe('removeDecimals', () => {
  test('When a number has decimals, it should convert it split the number, remove them and returns a string', () => {
    expect(removeDecimals(20.23)).toBe('20')
    expect(typeof removeDecimals(20.23)).toBe('string')
    expect(removeDecimals(23.3)).toBe('23')
    expect(removeDecimals(0.23)).toBe('0')
  })

  test('If the number does not have decimals, it will return it as a string', () => {
    expect(removeDecimals(20)).toBe('20')
    expect(typeof removeDecimals(20)).toBe('string')
  })

  test('If number param is not passed it will throw an error', () => {
    expect(() => removeDecimals()).toThrow('Number is required')
  })
})