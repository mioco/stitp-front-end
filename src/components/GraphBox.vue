<template>
  <section class="stitp-graphBox" @click="graphToggle">
    <div class="stitp-graphBox-graph" v-html="graph"></div>
  </section>
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
  },
  methods: {
    graphToggle () {
      Bus.$emit('fetch-graph')
    }
  }
}
</script>

<style scoped>
  .stitp-graphBox {
    background-color: rgba(0,0,0,.5);
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 4;
  }
  .stitp-graphBox > .stitp-graphBox-graph {
    margin: auto;
  }
</style>
