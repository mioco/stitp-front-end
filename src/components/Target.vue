<template>
  <div>
    <span>{{key}}</span>
    <a v-for="item in lines" key="index" :href="'#_'+item">{{ item }}</a>
  </div>
</template>
<script>
import Bus from '../bus'

export default {
  data () {
    return {
      key: '',
      lines: {}
    }
  },
  created () {
    Bus.$on('target', (key, lines) => {
      this.key = key
      this.lines = lines
    })
  }
}
</script>
<style scoped>
a {
}
</style>
