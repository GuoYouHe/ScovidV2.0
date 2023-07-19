<script setup lang="ts">
import { useColumns } from "./vxetable";
import { useboxechart } from "./boxechart";
import { emitter } from "@/utils/mitt";
import { ref, watch, reactive } from "vue";
import { VxeGridPropTypes, VxeGridInstance } from "vxe-table";

// const xGrid = ref<VxeGridInstance>();

const {
  xGrid,
  gridOptions,
  params,
  celltypecolumn,
  subtypecolumn,
  bulkcolumn,
  onMounted,
  tissueList,
  selectchange,
  placeholdername
} = useColumns();

const {
  // boxechartref
  // echart
} = useboxechart();

const loadingbox = ref<boolean>(true);

interface PropsType {
  DataList?: object;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataList: () => [{}] // 默认值
});

onMounted(() => {
  params["genelist"] = props.DataList[0].gene;
  params["type"] = props.DataList[0].type;
  params["pvaluestart"] = props.DataList[0].start;
  params["pvalueend"] = props.DataList[0].end;
  params["fcstart"] = props.DataList[0].fcstart;
  params["fcend"] = props.DataList[0].fcend;
  switch (props.DataList[0].type) {
    case "celltype":
      gridOptions.columns = celltypecolumn as VxeGridPropTypes.Columns;
      break;
    case "subtype":
      gridOptions.columns = subtypecolumn as VxeGridPropTypes.Columns;
      break;
    case "bulk":
      gridOptions.columns = bulkcolumn as VxeGridPropTypes.Columns;
      break;
    case "vir":
      gridOptions.columns = bulkcolumn as VxeGridPropTypes.Columns;
      break;
    default:
      break;
  }
  placeholdername.value = params['type'] == 'vir' ? "Select other coronaviruses" : "Select tissue"
  setTimeout(() => {
    const $grid = xGrid.value;
    $grid.commitProxy("reload"); // 触发查询 ajax.query，并清除表格所有状态，回到第一页
    gridOptions.loading = false;
  }, 50);

});
</script>
<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions" align="center">
      <template #toolbar_tools="{ data }">
        <vxe-select v-model="data.tissue" :placeholder="placeholdername" @change="selectchange" transfer>
          <vxe-option v-for="item in tissueList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
        </vxe-select>
      </template>
    </vxe-grid>
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

:deep(.vxe-grid--form-wrapper) {
  margin-bottom: -50px;
  z-index: 20;
  width: 50%;
}
</style>
