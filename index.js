import { h, create, diff, patch } from 'virtual-dom'

class Widget {
  constructor() {
    this.type = 'Widget'  // must be the string 'Widget'
  }
}

class ACCWidget extends Widget {
  constructor(num) {
    super()

    this.num = num
  }

  init() {
    return create(
        h('div', String(this.num))
    )
  }

  update(previous) {
    this.num += previous.num
    return this.init()
  }
}

let $rootNode
let currentVTree
let newVTree

const newOnClick = (num) => () => {
  const nextVTree = newVTree(num)
  const patches = diff(currentVTree, nextVTree)

  patch($rootNode, patches)
  currentVTree = nextVTree
}

const onClickAdd = newOnClick(1)
const onClickSub = newOnClick(-1)

newVTree = (num) => {
  return h('div', [
    h('div', new ACCWidget(num)),
    h('button', {
      onclick: onClickAdd,
    }, '+'),
    h('button', {
      onclick: onClickSub,
    }, '-'),
  ])
}

currentVTree = newVTree(0)
$rootNode = create(currentVTree)

document.body.appendChild($rootNode)
