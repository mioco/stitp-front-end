<template>
  <aside class="stitp-sidebar">
    <div class="stitp-sidebar-header">
      <div><h2>在线程序切片系统</h2></div>
      <div><small>大学生创新创业训练计划项目</small> </div>
    </div>
    <div class="stitp-sidebar-menu">
      <sideMenu class="stitp-sidebar-menu-item" 
        v-for="(key, index) in sidebarMenu" 
        :menuItem="key"
        key="index"
        >{{ key.title }}
      </sideMenu>
    </div>
    <input type="file" hidden ref="fileUpload" @change="fileReader">
    <search 
    :className="'stitp-sidebar-search'" 
    :codeSlices="codeSlices" 
    :getLine="getLine"></search>
  </aside>
</template>

<script>
import Search from './Search'
import MenuBtn from './MenuBtn'
import { Bus } from '../bus.js'

export default {
  name: 'aside',
  components: {
    'search': Search,
    'sideMenu': MenuBtn
  },
  props: ['getLine', 'codeSlices'],
  data () {
    return {
      sidebarMenu: [
        {title: '添加代码', method: this.addFile},
        {
          title: '获取切片',
          options: [
              {method: this.fetchWrap('fetch-btns', {'direction': 'Fwd'}), title: '前向切片'},
              {method: this.fetchWrap('fetch-btns', {'direction': 'Bwd'}), title: '后向切片'}
          ]
        },
        {method: this.fetchWrap('fetch-graph'), title: '获取Graph'}
      ]
    }
  },
  methods: {
    fetchWrap: function (api, data) {
      return () => {
        Bus.$emit(api, data)
      }
    },
    addFile: function () {
      this.$refs.fileUpload.click()
    },
    fileReader: function (e) {
      let file = e.target.files[0]
      if (file instanceof File) {
        let reader = new FileReader()

        reader.onload = () => {
          Bus.$emit('code-source', reader.result)
          Bus.$emit('btn-render', [])
        }
        reader.readAsText(file)
      }
    }
  }
}

</script>

<style scoped>
  h2 {
    margin: .5rem 0;
  }
  .stitp-sidebar {
    background-color: #abc;
    min-width: 16rem;
    height: 100vh;
  }
  .stitp-sidebar > * {
    margin: 2rem;
  }
</style>
