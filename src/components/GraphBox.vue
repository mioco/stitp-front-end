<template>
  <section class="stitp-graphBox" v-html="graph"></section>
</template>

<script>
import Bus from '../bus'

export default {
  name: 'graphbox',
  data () {
    return {
      graph: Bus.storage.fetch('graph')
    }
  },
  create () {
    Bus.$on('graph-render', graph => {
      console.log(graph)
      this.graph = graph
    })
  }
}
</script>

<style scoped>
  .stitp-graphBox {
    background-color: #fff;
  }
</style>
