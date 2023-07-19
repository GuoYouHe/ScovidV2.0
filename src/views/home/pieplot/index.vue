<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";

const loading = ref<boolean>(false);

let tableData = [
  { Datatype: "Tissue types", Singlecell: "15", Bulk: "12", Othercoronaviruses: "-" },
  { Datatype: "Datasets", Singlecell: "45", Bulk: "62", Othercoronaviruses: "7" },
  { Datatype: "Samples", Singlecell: "538 cases\n251 controls", Bulk: "1,132 cases\n556 controls", Othercoronaviruses: "40 cases\n 25controls" },
  { Datatype: "Cells", Singlecell: "3,544,360", Bulk: "-", Othercoronaviruses: "-" },
];

onMounted(() => {
  loading.value = true;
  loading.value = false;
});

</script>
<template>
  <div class="Con-table">
    <div v-loading="loading" element-loading-text="Loading..." class="umap-img">
      <el-row :gutter="10">
        <div class="card-body">
          <vxe-table border size="mini" :row-config="{ isHover: true, height: 40 }" :data="tableData">
            <vxe-column field="Datatype" title="Data type"></vxe-column>
            <vxe-column field="Singlecell" title="Single-cell"></vxe-column>
            <vxe-column field="Bulk" title="Bulk"></vxe-column>
            <vxe-column field="Othercoronaviruses" title="Other coronaviruses"></vxe-column>
          </vxe-table>
        </div>
      </el-row>
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
