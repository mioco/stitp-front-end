<template>
  <div :class="{ 'menu-btn': !menuItem.options }" @click="menuItem.options ? showOptions = !showOptions : menuItem.method(menuItem.api)">
    <span>{{ menuItem.title }}</span>
    <small v-if="menuItem.options">{{ showOptions ? '▲' : '▼' }}</small>
    <div v-if="showOptions">
      <div class="menu-btn" v-for="item in menuItem.options" @click.stop="item.method">{{ item.title }}</div>
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
  div {
    margin-top: 1rem;
    cursor: default;
  }
  .menu-btn:hover {
    color: rgba(44,62,80,0.5);
  }
</style>
