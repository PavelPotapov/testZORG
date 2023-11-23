import Collection from "./generic/collection";
import { setCSSVar } from "./utils/setCSSVar";
import { wait } from "./utils/wait";

const instance = '[data-js-spoiler]'

class Spoiler {

  els = {
    instance,
    summary: '[data-js-spoiler-toggle]',
    content: '[data-js-spoiler-content]'
  }

  states = {
    isOpened: false
  }

  stateClasses = {
    isOpened: 'is-opened',
    isOpening: 'is-opening',
    isClosing: 'is-closing',
    isTransition: 'is-transition'
  }

  attrs = {
    open: 'open'
  }

  cssVars = {
    contentHeight: '--contentHeight'
  }

  constructor (instance) {
    this.instance = instance
    this.summary = this.instance.querySelector(this.els.summary)
    this.content = this.instance.querySelector(this.els.content)
    this.contentHeight = 0;
    this.init()
  }

  init () {
    this.manageState()
    this.updateContentHeight()
    this.states.isOpened && this.instance.classList.add(this.stateClasses.isOpened)

    this.bindEvents()
  }

  getContentHeight () {
    return this.content.scrollHeight
  }

  updateContentHeight () {
    this.contentHeight = this.getContentHeight()
    this.setHeight(this.contentHeight)
  }

  setHeight (height) {
    setCSSVar(this.instance, this.cssVars.contentHeight, `${height}px`)
  }

  manageState () {
    this.states.isOpened = this.instance.hasAttribute(this.attrs.open) || this.instance.classList.contains(this.stateClasses.isOpened)
  }

  open () {
    this.states.isOpened = true
    this.instance.setAttribute(this.attrs.open, 'true')

    wait(100).then(() => {
      this.updateContentHeight()
      this.instance.classList.add(this.stateClasses.isOpening)
    })
  }

  close () {
    this.states.isOpened = false
    this.updateContentHeight()
    this.instance.classList.remove(this.stateClasses.isOpened)
    this.instance.classList.add(this.stateClasses.isClosing)

    wait(100).then(() => {
      this.instance.classList.remove(this.stateClasses.isClosing)
    })
  }

  isTransitioning () {
    return this.instance.classList.contains(this.stateClasses.isTransition)
  }

  toggle () {
    this.states.isOpened ? this.close() : this.open()
  }

  handleSummaryClick (e) {
    e.preventDefault()

    if (!this.isTransitioning()) {
      this.toggle()
    }

  }

  handleTransitionStart () {
    this.instance.classList.add(this.stateClasses.isTransition)
  }

  handleTransitionEnd () {
    this.instance.classList.remove(this.stateClasses.isTransition)
    if (!this.states.isOpened) {
      this.instance.removeAttribute(this.attrs.open)
    } else {
      this.instance.classList.remove(this.stateClasses.isOpening)
      this.instance.classList.add(this.stateClasses.isOpened)
    }
  }

  bindEvents () {
    this.summary.addEventListener('click', e => {
      this.handleSummaryClick(e)
    })
    this.content.addEventListener('transitionstart', () => {
      this.handleTransitionStart()
    })
    this.content.addEventListener('transitionend', () => {
      this.handleTransitionEnd()
    })
  }
}

export class SpoilerCollection extends Collection {

  constructor () {
    super(instance, Spoiler);
    this.init()
  }

  init (context = document) {
    context.querySelectorAll(instance).forEach(el => {
      this.collection = new Spoiler(el)
    })
  }
}
