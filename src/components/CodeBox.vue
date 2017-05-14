<template>
  <section class="stitp-codebox codemirror">
    <codemirror ref="codemirror"
      :code="code" 
      :options="editorOption"
      @change="codeChange"
    ></codemirror>
  </section>
</template>

<script>
import Vue from 'vue'
import VCM from 'vue-codemirror'
import Bus from '../bus'

Vue.use(VCM)

export default {
  name: 'codeForm',
  props: ['code'],
  data () {
    return {
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        styleSelectedText: true,
        theme: 'neo',
        viewportMargin: Infinity
      }
    }
  },
  computed: {
    editor () { return this.$refs.codemirror.editor }
  },
  created () {
    Bus.$on('get-line', (lines, isActive) => {
      this.editor.eachLine((line) => {
        this.editor.removeLineClass(line, 'background', 'active-line')
      })
      if (!isActive) {
        lines.forEach((i) => {
          this.editor.addLineClass(i - 1, 'background', 'active-line')
        })
      }
    })
  },
  methods: {
    codeChange: function (val) {
      Bus.$emit('code-source', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
.codemirror {
  width: calc(100vw - 20rem - 4rem);
  height: 100vh;
}
.codemirror pre {
  font-size: 16px;
  padding: 2em 3em;
  box-sizing: border-box;
  margin-top: 0;
}
.codemirror pre code {
  background-color: transparent;
}
.codemirror pre code:focus {
  outline: none;
  width: 100%;
  height: 100%;
}
</style>
<style>
.CodeMirror {
  height: 100% !important;
}
.active-line {
  background-color: #b9cee3;
}
</style>
