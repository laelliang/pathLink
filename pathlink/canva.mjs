import Line from "./line.mjs"
import { getPointCentral } from "./utils.mjs"

export default class Canva {
  type = 'canva'
  dom = undefined
  rectChild = []
  lineChild = []
  activeRect = undefined
  activeLineList = []

  constructor(dom) {
    // dom.addEventListener('ondragenter', function(ev) {ev.preventDefault()});
    // dom.addEventListener('ondragover', function(ev) {ev.preventDefault()});

    
    dom.style.position = 'relative'
    this.dom = dom
    this.init()
  }

  init() {
    const mousemove = (ev) => {

      // 移动rect
      if (this.activeRect){
        const {clientX, clientY} = ev
        const rectDom = this.activeRect.dom
        const mouseOffset = this.activeRect.mouseOffset
        const {left, top} = this.dom.getBoundingClientRect()
        rectDom.style.left = `${clientX - left - mouseOffset[0]}px`
        rectDom.style.top = `${clientY - top - mouseOffset[1]}px`
      }

      // 连接线
      if (this.activeLineList.length > 0) {
        const {clientX, clientY} = ev
        const canvaRect = this.dom.getBoundingClientRect()

        this.activeLineList.forEach(line => {
          const centralPosition1 = getPointCentral(line.startPoint)
          const start1X = centralPosition1[0] - canvaRect.left
          const end1Y = centralPosition1[1] - canvaRect.top
  
  
  
          if (line.endPoint) {
            const centralPosition2 = getPointCentral(line.endPoint)
            const start2X = centralPosition2[0] - canvaRect.left
            const end2Y = centralPosition2[1] - canvaRect.top
            line.setPosition([start1X, end1Y], [start2X, end2Y])
  
          } else {
            
            line.setPosition([start1X, end1Y], [clientX - canvaRect.left, clientY - canvaRect.top])
  
          }
        })
      }
    }
    this.dom.addEventListener('mousemove', mousemove);
  }
  
  add(obj, position) {
    obj.dom.style.position = 'absolute'
    obj.dom.style.left = `${position[0]}px`
    obj.dom.style.top = `${position[1]}px`
    this.rectChild.push(obj)
    this.dom.appendChild(obj.dom)

        
    const mousedown = (ev) => {
      const {clientX, clientY} = ev
      if (ev.button == 0) {
        const { left, top } = obj.dom.getBoundingClientRect();
        obj.mouseOffset = [clientX - left, clientY - top]
        this.activeRect = obj
        this.activeLineList = this.lineChild.filter(line => obj.points.find(point => point.key === line.startPoint.key || point.key === line.endPoint.key))
      }
    }


    const mouseup = (ev) => {
      obj.mouseOffset = [0,0]
      this.activeRect = undefined
      this.activeLineList = []
    }
    obj.dom.addEventListener('mousedown', mousedown);
    obj.dom.addEventListener('mouseup', mouseup);

    obj.points.forEach(point => {
      point.dom.addEventListener('mousedown', (ev) => {
        const centralPosition = getPointCentral(point)
        const canvaRect = this.dom.getBoundingClientRect()
        const startX = centralPosition[0] - canvaRect.left
        const endY = centralPosition[1] - canvaRect.top

        const line = new Line([startX, endY], [startX, endY], this.dom)
        line.startPoint = point
        this.activeLineList.push(line)

        this.lineChild.push(line)
        
      })
      point.dom.addEventListener('mouseup', (ev) => {
        const centralPosition = getPointCentral(point)
        const canvaRect = this.dom.getBoundingClientRect()
        const startX = centralPosition[0] - canvaRect.left
        const endY = centralPosition[1] - canvaRect.top
        if (this.activeLineList.length > 0) {
          this.activeLineList.forEach(line => {
            line.setPosition(undefined, [startX, endY])
            line.endPoint = point
          })
        }
        this.activeLineList = []
      })
    })
  }
}