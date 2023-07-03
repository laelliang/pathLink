export default class Point {
  type = 'point'
  key = undefined
  constructor(position) {
    this.key = Date.now() + position
    const divElement = document.createElement('div')
    divElement.className = 'point'
    divElement.style.border = '1px solid blue'
    divElement.style.backgroundColor = '#FFF'
    divElement.style.height = '10px'
    divElement.style.width = '10px'
    divElement.style.position = 'absolute'
    divElement.addEventListener('mouseover', function() {
      divElement.style.backgroundColor = 'blue';
    });
    divElement.addEventListener('mouseout', function() {
      divElement.style.backgroundColor = '#FFF';
    });
    divElement.addEventListener('mousedown', function(ev) {
      ev.stopPropagation();
    })
    if (position === 'left') {
      divElement.style.left = '0'
      divElement.style.top = '50%'
      divElement.style.transform = 'translate(-50%, -50%)'

    } else if (position === 'right') {
      divElement.style.right = '0'
      divElement.style.top = '50%'
      divElement.style.transform = 'translate(50%, -50%)'

    } else if (position === 'top') {
      divElement.style.left = '50%'
      divElement.style.top = '0'
      divElement.style.transform = 'translate(-50%, -50%)'

    } else if (position === 'bottom') {
      divElement.style.bottom = '0'
      divElement.style.left = '50%'
      divElement.style.transform = 'translate(-50%, 50%)'
    }
    this.dom = divElement
  }
}