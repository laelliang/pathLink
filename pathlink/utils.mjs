export const getPointCentral = (point) => {
  const { width, height, left, top} = point.dom.getBoundingClientRect()
  const startX = left + width / 2
  const endY = top + height / 2
  return [startX, endY]
}