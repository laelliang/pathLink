export default class Drag {
  type = 'drag'
  offset = [0,0]
  dom = undefined
  constructor(dom, canva, createRect) {
    this.dom = dom
    this.targetCanva = canva
    this.createRect = createRect

    this.dom.addEventListener('mousedown', this.mousedown.bind(this));
  }

  mousemove(ev) {
    if (this.copyDom) {
      const {clientX, clientY} = ev
      this.copyDom.style.left = `${clientX - this.offset[0]}px`
      this.copyDom.style.top = `${clientY - this.offset[1]}px`
    }

  }

  mousedown(ev) {
    const {clientX, clientY} = ev
    if (ev.button == 0) {

      const {left, top} = this.dom.getBoundingClientRect()
      document.body.position = 'relative'

      this.offset = [clientX - left, clientY - top]
      const copyDom = this.dom.cloneNode(true)
      copyDom.setAttribute('id', 'copy_dom')
      this.copyDom = copyDom

      copyDom.addEventListener('mousemove', this.mousemove.bind(this));
      copyDom.addEventListener('mouseup', this.mouseup.bind(this));
      this.copyDom.style.position = 'absolute'
      this.copyDom.style.left = `${left}px`
      this.copyDom.style.top = `${top}px`
      document.body.appendChild(this.copyDom)
    }
  }

  mouseup(ev) {
    const {clientX, clientY} = ev

    const { left, top, width, height } = this.targetCanva.dom.getBoundingClientRect()

    if (clientX > left && clientX < left+width && clientY > top && clientY < top+height) {
      this.createRect(clientX, clientY)
    }
    const copy_dom = document.getElementById('copy_dom')

    if (copy_dom) {
      copy_dom.remove()
      this.copyDom = undefined
    }
  }
  
}