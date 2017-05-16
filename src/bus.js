import Vue from 'vue'

const Bus = new Vue()

function SetActive (eleType, e) {
  this.classList = e.target.classList
  this.query = eleType + '.active'
  this.activeEle = document.querySelector(this.query)
  this.isActive = this.classList.contains('active')
}
SetActive.prototype = {
  constructor: SetActive,
  remove: function () { if (this.activeEle) this.activeEle.classList.remove('active') },
  toggle: function () { this.classList.toggle('active', !this.isActive) }
}

export {Bus, SetActive}
