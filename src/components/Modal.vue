<template>
  <section>
    <div class="modal-container">
      <div class="modal-header">
        <span class="modal-header-title">{{ detail.title || 'Modal' }}</span>
        <span class="modal-header-icon" @click="modalToggle">×</span>
      </div>
      <div class="modal-body">
        {{ detail.content }}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['detail', 'modalToggle']
}
</script>
<style scoped>
  section {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 5;
  }
  .modal-container {
    width: 30%;
    min-height: 3rem;
    background-color: #fff;
    border: 1px solid #ddd;
    margin: auto;
    border-radius: .3rem;
    animation: show .5s;
  }
  .modal-container>div {
    padding: .5rem 1rem;
  }
  .modal-header {
    border-bottom: 1px solid #ddd;
  }
  .modal-header-icon {
    float: right;
    cursor: default;
    font-size: 2rem;
    color: #717171;
    margin-top: -.6rem;
  }
  .modal-header-icon:hover {
    color: #ddd;
  }
  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(-10rem);
    }
    70% {
      opacity: 0.5;
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
