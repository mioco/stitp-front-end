<template>
  <div class="menu-btn" @click="menuItem.options ? showOptions = !showOptions : menuItem.method(menuItem.api)">
    <span>{{ menuItem.title }}</span>
    <small v-if="menuItem.options">▲</small>
    <div v-if="showOptions">
      <div v-for="item in menuItem.options" @click.stop="item.method">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menubtn',
  props: ['menuItem'],
  data () {
    return {
      showOptions: false
    }
  },
  methos: {
    isEmptyObj (item) {
      return JSON.stringify(item).length <= 2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
