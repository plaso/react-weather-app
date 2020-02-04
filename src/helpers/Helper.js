export const removeDecimals = number => {
  if (!number) throw new Error('Number is required')

  return number.toString().split('.')[0]
}