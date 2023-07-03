import Point from "./point.mjs"
export default class Rect {
  type = 'rect'
  points = []

  constructor(dom, options) {
    this.dom = dom
    this.showDot = options.showDot

    if (options.showDot) {
      options.showDot.forEach(showPosition => {
        const point = new Point(showPosition)
        this.points.push(point)
        this.dom.appendChild(point.dom)
      })
    }
  }


}