<template>
  <div :class="[className]">
    <input type="text" placeholder="搜索变量" v-model="filter">
    <ul :class="[className]+'-result'">
      <li :class="[className]+'-result-item'" class="default-btn" v-for="(value, key) in btns" @click="getLine(value)">
        {{ key }}
      </li>
    </ul>
  </div>
</template>

<script>
import Bus from '../bus'
import Vue from 'vue'
export default {
  props: ['className', 'codeSlices'],
  data () {
    return {
      filter: '',
      btns: Bus.storage.fetch('btns'),
      originBtns: Bus.storage.fetch('btns')
    }
  },
  created () {
    Bus.$on('btn-render', (data, filterStr) => {
      this.btns = {}
      for (let key in data) {
        if (filterStr !== undefined && key.indexOf(filterStr) === -1) { continue }
        Vue.set(this.btns, key, {
          name: key,
          lineArr: data[key][this.fileName]
        })
      }
    })
  },
  watch: {
    filter: function (filterStr) {
      Bus.$emit('btn-render', this.originBtns, filterStr)
    }
  }
}
</script>

<style>
  .default-btn {
    background-color: #fff;
  }
</style>
