<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import { usenetworkechart } from "./networkechart";
import { getbrowsecommunication } from "@/api/browse";
const { echart } = usenetworkechart();
interface PropsType {
  DataSet: string;
  type: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "", // 默认值
  type: ""
});

const loading = ref<boolean>(true);
let params: object = {};
params = {
  dataset: props.DataSet,
  type: props.type
};

onMounted(async () => {
  if (props.DataSet != "") {
    loading.value = true;
    const { resultSet } = await getbrowsecommunication(params);
    nextTick(() => {
      setTimeout(() => {
        echart(
          "communicationechart",
          resultSet,
          "communication_" + props.DataSet
        );
      }, 550);
      loading.value = !loading.value;
    });
  }
});
</script>

<template>
  <div class="Con-table">
    <div v-loading="loading" element-loading-text="Loading...">
      <div
        id="communicationechart"
        style="width: 100%; height: 700px; margin: auto"
      />
    </div>
    <div class="con-leftCon-titleone-pic">
      <span>Figure 1. Two-dimensional UMAP plot.</span>
      <span>
        The colors of points represent the cell types which cells belong to.
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}
img {
  width: 400px;
  height: 390px;
  margin: auto;
}
</style>
