<template>
  <div :class="[className]">
    <input type="text" placeholder="搜索变量" v-model="filter">
    <ul :class="[className]+'-result'">
      <li :class="[className]+'-result-item'" class="default-btn" v-for="(value, key) in btns" @click="e => getLine(value, e)">
        {{ key }}
      </li>
    </ul>
  </div>
</template>

<script>
import Bus from '../bus'
import Vue from 'vue'
export default {
  props: ['className'],
  data () {
    return {
      filter: '',
      btns: Bus.storage.fetch('btns'),
      originBtns: Bus.storage.fetch('btns'),
      fileName: Bus.storage.fetch('codeFileName')
    }
  },
  created () {
    Bus.$on('btn-render', (data, filterStr) => {
      this.btns = {}
      for (let key in data) {
        if (filterStr !== undefined && key.indexOf(filterStr) === -1) { continue }
        Vue.set(this.btns, key, data[key])
      }
    })
  },
  watch: {
    filter: function (filterStr) {
      Bus.$emit('btn-render', this.originBtns, filterStr)
    }
  },
  methods: {
    getLine (lines, e) {
      let classList = e.target.classList
      Bus.$emit('get-line', lines[this.fileName], classList.contains('active'))
      classList.toggle('active')
    }
  }
}
</script>

<style>
  .default-btn {
    background-color: #fff;
  }
</style>
