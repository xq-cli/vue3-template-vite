<template>
  <RouterView />
</template>
<script setup>
import { setTheme } from "@/theme/style";
import { RouterView } from "vue-router";
onBeforeMount(() => {
  setTheme("pramiry");
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.global-flex {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  & > div:first-of-type {
    flex-shrink: 0;
    margin-right: 8px;
  }
}
</style>
