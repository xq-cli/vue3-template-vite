<template>
  <div class="draw_container" @click="handleClose">
    <slot></slot>
  </div>
</template>

<script setup>
const emits = defineEmits(["close"]);
const handleClose = () => {
  emits("close");
};
</script>

<style lang="scss">
.draw_container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 19;
  box-sizing: border-box;
  padding-top: 80px;
}
</style>
