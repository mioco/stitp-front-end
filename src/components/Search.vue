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
import { Bus, SetActive } from '../bus'
import Vue from 'vue'
export default {
  props: ['className'],
  data () {
    return {
      filter: '',
      btns: Bus.storage.fetch('btns'),
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
      let originBtns = Bus.storage.fetch('btns')
      Bus.$emit('btn-render', originBtns, filterStr)
    }
  },
  methods: {
    getLine (lines, e) {
      let fileName = Bus.storage.fetch('codeFileName')
      let active = new SetActive('li', e)
      let editor = {
        where: 'background',
        name: 'active-line'
      }
      if (active.activeEle) active.activeEle.classList.remove('active')
      Bus.$emit('get-line', lines[fileName], active.isActive, editor)
      Bus.$emit('target', e.target.innerText, lines[fileName], active.isActive)
      active.remove()
      active.toggle()
    }
  }
}
</script>

<style scoped>
  .default-btn {
  }
  input {
    width: 100%;
    display: inline-block;
    padding: .7rem 2rem;
    margin-left: -2rem;
    margin-right: -2rem;
    border: none;
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
    background: none;
    outline: none;
    color: #222;
  }
  ul {
    padding: 0;
    max-height: 50vh;
    overflow-y: auto;
  }
  li {
    list-style: none;
    margin-bottom: .5rem;
    cursor: default;
  }
  li.active {
    padding-left: 1rem;
    border-left: 1px solid #222;
  }
  li:hover {
    color: rgba(44,62,80,0.5);
  }
</style>
