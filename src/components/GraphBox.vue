<template>
  <section class="stitp-graphBox" @click="graphToggle">
    <div class="stitp-graphBox-graph" v-html="graph"></div>
  </section>
</template>

<script>
import { Bus } from '../bus'

export default {
  name: 'graphbox',
  data () {
    return {
      graph: Bus.storage.fetch('graph')
    }
  },
  created () {
    Bus.$on('graph-render', graph => {
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
  @keyframes show {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
  .stitp-graphBox > .stitp-graphBox-graph {
    margin: auto;
    overflow: auto;
    max-width: 90vw;
    padding: 1rem;
    background-color: #fff;
    animation: .3s show;
  }
</style>
