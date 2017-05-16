<template>
  <div>
    <span>{{ target.key }}</span>
    <a v-for="item in target.lines" key="index" :href="'#'+item" @click="e => toLine(item, e)">{{ item }}</a>
  </div>
</template>
<script>
import { Bus, SetActive } from '../bus'

export default {
  data () {
    return {
      target: {
        key: '',
        lines: {}
      }
    }
  },
  created () {
    Bus.$on('target', (key, lines, isActive) => {
      if (isActive) {
        document.querySelector('.selected').classList.remove('selected')
        document.querySelector('a.active').classList.remove('active')
      } else {
        this.target.key = key
        this.target.lines = lines
      }
    })
  },
  methods: {
    toLine (line, e) {
      let active = new SetActive('a', e)
      let editor = {
        where: 'gutter',
        name: 'selected'
      }
      Bus.$emit('get-line', line, active.isActive, editor)
      active.remove()
      active.toggle()
      document.querySelector('.selected').setAttribute('id', line)
    }
  }
}
</script>
<style scoped>
div {
  text-align: center;
  padding-top: 2rem;
}
a {
    margin-left: 1rem;
    text-decoration: none;
    color: #000;
}
a.active {
  color: #abc;
}
</style>
