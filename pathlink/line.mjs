export default class Line {
  type = 'line'
  startPoint = undefined
  endPoint = undefined
  svg = undefined

  constructor(startPosition, endPosition, mountPosition) {
    this.startPosition = startPosition
    this.endPosition = endPosition
    
    const controlPoint1X = startPosition[0] + (endPosition[0] - startPosition[0]) / 3
    const controlPoint2X = startPosition[0] + (endPosition[0] - startPosition[0]) * 2 / 3

    const d = `M${startPosition.join(',')} C${controlPoint1X},${startPosition[1]} ${controlPoint2X},${endPosition[1]} ${endPosition.join(',')}`

    
    this.dom = this.createPath(d)
    const svg = document.getElementById('svg1')

    if (svg) {
      this.svg = svg
    } else {
      this.svg = this.createSvg()
      mountPosition.appendChild(this.svg)
    }
    this.svg.appendChild(this.dom)

  }

  setPosition(startXY = this.startPosition, endXY = this.endPosition) {
    const controlPoint1X = startXY[0] + (endXY[0] - startXY[0]) / 3
    const controlPoint2X = startXY[0] + (endXY[0] - startXY[0]) * 2 / 3

    if (this.dom) {
      this.dom.setAttribute('d', `M${startXY.join(',')} C${controlPoint1X},${startXY[1]} ${controlPoint2X},${endXY[1]} ${endXY.join(',')}`)
    }
  }

  createSvg() {
    // 创建 SVG 元素
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('id', 'svg1');
    svg.setAttribute('style', 'z-index: 1000');
    svg.setAttribute('height', '100%');
    return svg;
  }
  
  createPath(d) {
    // 创建 path 元素
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'black');
    return path;
  }
}