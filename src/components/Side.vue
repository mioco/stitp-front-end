<template>
  <div class="side-container">
    <div class="side-header">
      <div><h2>在线程序切片系统</h2></div>
      <div><small>大学生创新创业训练计划项目</small> </div>
    </div>
    <input type="file" hidden ref="fileUpload" @change="fileReader">
    <div class="side-btn" @click="addFile">{{ getFileName }}</div>
    <div class="side-btn" @click="sendCode">切片</div>
    <input class="side-form-control" placeholder="Search variate..." @keyup="btnFilter"/>
    <div class="btn-container">
      <btn v-for="item in btn" :btn="item" :class="[activeItem === item.name ? 'active' : null]"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Bus from '../Bus'

Vue.component('btn', {
  template: '<div @click="getLine" class="btn">{{btn.name}}</div>',
  props: ['btn', 'activeItem'],
  methods: {
    getLine: function () {
      let el = this.$el.classList.value.indexOf('active')
      Bus.$emit('get-line', this.btn.lineArr, el !== -1)
      Bus.$emit('set-active', this.btn.name)
    }
  }
})

export default {
  name: 'side',
  props: ['btnList'],
  created () {
    Bus.$on('set-active', (name) => {
      this.activeItem = this.activeItem === name ? '' : name
    })
    Bus.$on('btn-render', (filterStr) => {
      let btnArr = this.btnList['Bwd']
      this.btn = {}
      if (this.fileName !== undefined) {
        for (let key in btnArr) {
          if (filterStr !== undefined && key.indexOf(filterStr) === -1) { continue }
          Vue.set(this.btn, key, {
            name: key,
            lineArr: btnArr[key][this.fileName]
          })
        }
      }
    })
  },
  data () {
    return {
      activeItem: null,
      fileName: undefined,
      btn: {}
    }
  },
  computed: {
    getFileName: function () {
      return this.fileName === undefined ? '添加' : this.fileName
    }
  },
  methods: {
    addFile: function () {
      this.$refs.fileUpload.click()
    },
    fileReader: function (e) {
      let file = e.target.files[0]
      if (typeof file === 'object') {
        let reader = new FileReader()

        reader.onload = () => {
          this.fileName = file.name
          Bus.$emit('code-source', reader.result)
          this.btn = {}
        }
        reader.readAsText(file)
      }
    },
    sendCode: function () {
      Bus.$emit('get-btn')
    },
    btnFilter: function (e) {
      Bus.$emit('btn-render', e.target.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
.side-container {
  background-color: #35495e;
  color: #fff;
  width: 20rem;
  height: 100vh;
  padding: 2rem;
}

.side-container>div {
  margin-bottom: 2em;
}

.btn-container {
  margin-top: -2em;
}
.btn {
  background-color: #fff;
  color: #222;
  padding: .7rem 1rem;
  cursor: default;
}

.btn.active, .btn:hover {
  background: #b9cee3;
  color: #fff;
}
</style>
