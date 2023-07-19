<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { usebarechart } from "./statistics_echart.js";
const { echart } = usebarechart();

const loading = ref<boolean>(false);

onMounted(() => {
  loading.value = true;
  echart('statistic_bar')
  loading.value = false;
});

</script>
<template>
  <div class="Con-table">
    <div v-loading="loading" element-loading-text="Loading...">
      <div class="con-leftCon-titleone-pic " id="statistic_bar" style="width: 100%; height: 800px" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}

.con-leftCon-titleone-pic {
  margin-top: 10%;
  width: 55%;
  margin: auto;
}
</style>
