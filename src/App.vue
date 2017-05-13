<template>
  <div id='app'>
    <Side :btn-list="btnList"></Side>
    <CodeForm :code="code" :active-line="activeLine"></CodeForm>
  </div>
</template>

<script>
import Side from './components/Side'
import CodeForm from './components/CodeForm'
import 'whatwg-fetch'
import Bus from './Bus'

export default {
  name: 'app',
  components: {
    Side,
    CodeForm
  },
  data () {
    return {
      code: '请输入代码...',
      activeLine: [],
      btnList: {}
    }
  },
  created () {
    console.log('is run test')
    Bus.$on('code-source', (code) => {
      this.code = code
    })

    Bus.$on('fetch-btns', (data) => {
      if (typeof data === 'object') {
        let btns = getData('/index.php/api/phpapi/slice', Object.assign({}, {code: Bus.storage.fetch('codeSource')}, data))
        btns.then(btns => {
          let codeSlices = JSON.parse(btns)[data.direction]
          Bus.storage.save('btns', codeSlices)
          Bus.$emit('btn-render', codeSlices)
        })
      }
    })
    Bus.$on('fetch-graph', () => {
      if (this.graphBoxShow) {
        this.graphBoxShow = false
        return false
      } else {
        let graph = getData('/index.php/api/phpapi/call_graph', Bus.storage.fetch('codeSource'))
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
html, body, #app {
  height: 100%;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 74rem;
}
#app>div {
  float: left;
}
body {
  margin: 0;
  overflow: hidden;
}
h1, h2, h3, h4, h5 {
  margin: 0;
}
.side-CodeForm, .CodeForm {
  padding: 1em;
}
.side-btn {
  padding: 1em;
  background-color: #abc;
  text-align: center;
  border-radius: .2rem;
  cursor: default;
}
.side-form-control {
  width: 100%;
  border-radius: .2rem .2rem 0 0;
  padding: 1em;
  box-sizing: border-box;
  border: none;
  color: #34495e;
  outline: none;
  font-size: 15px;
  margin-bottom: 2em;
}
</style>
