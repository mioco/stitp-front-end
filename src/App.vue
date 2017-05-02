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
    Bus.$on('code-source', (code) => {
      this.code = code
    })
    Bus.$on('get-btn', () => {
      let url = '/api/index.php/index/index/codeSource'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: this.code
        })
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) return res
        else {
          alert('something happened')
        }
      })
      .then((res) => {
        return res.json()
      })
      .then((btns) => {
        this.btnList = JSON.parse(btns)
        Bus.$emit('btn-render')
      })
      .catch((err) => {
        alert(err)
      })
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
