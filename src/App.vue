<template>
  <div id="app">
    <sidebar></sidebar>
    <codebox :code="code"></codebox>
    <graphbox v-if="graphBoxShow"></graphbox>
    <modal 
    v-if="modalShow" 
    :detail="modalDetail" 
    :modalToggle="modalToggle"
    ></modal>
  </div>
</template>

<script>
import CodeBox from './components/CodeBox'
import GraphBox from './components/GraphBox'
import Aside from './components/Aside'
import Modal from './components/Modal'
import Bus from './bus'

// 保存在本地，界面刷新时加载
const STORAGE_KEY = 'stitp-1.0.0'
Bus.storage = {
  fetch: function (type) {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY + '-' + type) || (type === 'btns' ? '[]' : '""'))
  },
  save: function (type, option) {
    if (option === undefined) return false
    return sessionStorage.setItem(STORAGE_KEY + '-' + type, JSON.stringify(option))
  }
}

const getData = async (api, data, _this) => {
  try {
    let receive = await fetch(api, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    let parseReceive = await receive.json()
    // 如果服务器返回错误，添加提示模态框
    if (isError(parseReceive)) {
      _this.modalDetail.title = 'Error'
      _this.modalDetail.content = parseReceive['error']
      _this.modalShow = true
      return false
    }
    return parseReceive
  } catch (err) {
    console.log(err)
  }
}

const isError = (data) => {
  let error = data['error']
  if (error && typeof error === 'string') return true
  else return false
}

export default {
  name: 'app',
  components: {
    'sidebar': Aside,
    'codebox': CodeBox,
    'graphbox': GraphBox,
    'modal': Modal
  },
  data () {
    return {
      code: Bus.storage.fetch('codeSource'),
      graphBoxShow: false,
      modalShow: false,
      modalDetail: {}
    }
  },
  created () {
    Bus.$on('code-source', (code) => {
      this.code = code
      Bus.storage.save('codeSource', code)
    })
    Bus.$on('fetch-btns', (data) => {
      if (typeof data === 'object') {
        let btns = getData('/index.php/api/phpapi/slice', Object.assign({}, {code: Bus.storage.fetch('codeSource')}, data), this)
        btns.then(btns => {
          Bus.storage.save('btns', btns)
          Bus.$emit('btn-render', btns)
        })
      }
    })
    Bus.$on('fetch-graph', () => {
      if (this.graphBoxShow) {
        this.graphBoxShow = false
        return false
      } else {
        let graph = getData('/index.php/api/phpapi/call_graph', Bus.storage.fetch('codeSource'), this)
        graph.then(graph => {
          Bus.storage.save('graph', graph)
          Bus.$emit('graph-render', graph)
        })
        this.graphBoxShow = true
      }
    })
  },
  methods: {
    modalToggle () {
      this.modalShow = !this.modalShow
    }
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
