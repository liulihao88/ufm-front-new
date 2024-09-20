<template>
  <div id="spinnerBox" class="spinner-globle-box">
    <a-spin size="large" class="spinner" />
  </div>
</template>
<script>
export default {
  components: {},
  directives: {},
  data() {
    return {
      variants: ['primary'],
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
#spinnerBox {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
