<template>
  <div id="app">
    <stitp-sidebar :getLine="getLine"></stitp-sidebar>
    <stitp-codebox :code="code"></stitp-codebox>
    <stitp-graphbox v-if="graphBoxShow"></stitp-graphbox>
  </div>
</template>

<script>
import CodeBox from './components/CodeBox'
import GraphBox from './components/GraphBox'
import Aside from './components/Aside'
import Bus from './bus'

const STORAGE_KEY = 'stitp-1.0.0'
// 保存在本地，界面刷新时加载
Bus.storage = {
  fetch: function (type) {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY + '-' + type) || (type === 'btns' ? '[]' : '""'))
  },
  save: function (type, option) {
    return sessionStorage.setItem(STORAGE_KEY + '-' + type, JSON.stringify(option))
  }
}

const getData = async (api, data) => {
  try {
    let receive = await fetch(api, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    let parseReceive = await receive.json()
    return parseReceive
  } catch (err) {
    console.log(err)
  }
}

export default {
  name: 'app',
  components: {
    'stitp-sidebar': Aside,
    'stitp-codebox': CodeBox,
    'stitp-graphbox': GraphBox
  },
  data () {
    return {
      code: Bus.storage.fetch('codeSource'),
      graphBoxShow: false
    }
  },
  methods: {
    sendCode (api) {
      let url = '/api/phpapi/' + api
      console.log(url)
    },
    getLine (lines) {
      console.log(lines)
    }
  },
  created () {
    Bus.$on('code-source', (code) => {
      this.code = code
      Bus.storage.save('codeSource', code)
    })
    Bus.$on('fetch-btns', (data) => {
      if (typeof data === 'object') {
        let btns = getData('/api/public/index.php/api/phpapi/slice', Object.assign({}, {code: Bus.storage.fetch('codeSource')}, data))
        btns.then(btns => {
          let codeSlices = JSON.parse(btns)[data.direction]
          Bus.storage.save('btns', codeSlices)
          Bus.$emit('btn-render', codeSlices)
        })
      }
    })
    Bus.$on('fetch-graph', () => {
      if (this.graphBoxShow) this.graphBoxShow = false
      else {
        let graph = getData('/api/public/index.php/api/phpapi/call_graph', Bus.storage.fetch('codeSource'))
        graph.then(graph => {
          Bus.storage.save('graph', graph)
          Bus.$emit('graph-render', graph)
        })
        this.graphBoxShow = true
      }
    })
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}
</style>
