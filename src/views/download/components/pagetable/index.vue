<script setup lang="ts">
import { useColumns } from "./vxetable";
import { ref } from "vue";
import { VxeGridPropTypes, VxeGridInstance } from "vxe-table";
import {
  getDownloadfile
} from "@/api/download";
import Download from "@iconify-icons/ic/outline-download-for-offline";
const {
  gridOptions,
  singlecellcolumn,
  subtypecolumn,
  bulkcolumn,
  searchEvent,
  formData,
  resetEvent,
  onMounted,
  params
} = useColumns();

interface PropsType {
  DataType: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  DataType: ""
});

const xGrid = ref<VxeGridInstance>()

onMounted(() => {
  switch (props.DataType) {
    case "singlecell":
      params["type"] = "singlecell";
      gridOptions.pagerConfig.pageSize = 5
      gridOptions.columns = singlecellcolumn as VxeGridPropTypes.Columns;
      break;
    case "bulk":
      params["type"] = "bulk";
      gridOptions.pagerConfig.pageSize = 10
      gridOptions.columns = bulkcolumn as VxeGridPropTypes.Columns;
      break;
    default:
      break;
  }
  setTimeout(() => {
    const $grid = xGrid.value;
    $grid.commitProxy("query");
    gridOptions.loading = false;
  }, 100);
});
const param: object = {
  accession: '',
  type: '',
  title: ''
}

async function downloadRowEvent(value, type, title) {
  const axiospath =
    `${window.$filldownload}` +
    "/dow/downloadfile?accession=" +
    value +
    "&type=" +
    type +
    "&title=" +
    title;
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = axiospath;
  document.body.appendChild(link);
  link.click();
}

async function downloadRowBulkEvent(value, type, title) {
  const axiospath =
    `${window.$filldownload}` +
    "/dow/downloadfile?accession=" +
    value +
    "&type=" +
    type +
    "&title=" +
    title;
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = axiospath;
  document.body.appendChild(link);
  link.click();
}


function expression(value, type) {
  console.log(value, type);
}
</script>
<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions" align="center" :column-config="{ resizable: true }"
      :row-config="{ isHover: true }">
      <template #operate="{ row, column }">
        <vxe-button content="Celltype" @click="downloadRowEvent(row.accession, 'celltype', column.title)"></vxe-button>
        <vxe-button content="Subtype" @click="downloadRowEvent(row.accession, 'subtype', column.title)"></vxe-button>
      </template>
      <template #operate2="{ row, column }">
        <vxe-button content="Rawdata" @click="downloadRowEvent(row.accession, 'rawdata', column.title)"></vxe-button>
        <vxe-button content="Metadata" @click="downloadRowEvent(row.accession, 'metadata', column.title)"></vxe-button>
      </template>
      <template #operatebulk="{ row, column }">
        <vxe-button class="vxe-icon-download" title="download" circle
          @click="downloadRowBulkEvent(row.accession, 'bulk', column.title)"></vxe-button>
      </template>
      <template #contentsourse="{ row }">
        {{ row.description == 'covid-19' ? 'COVID-19' : 'Other coronaviruses' }}
      </template>
      <!-- <template #content="{ row }">
        <a @click="expression(row, 'bulk')" style="color: #45a5f9">DEGs' expression profile</a>
      </template>
      <template #content2="{ row }">
        <a @click="expression(row, 'bulk')" style="color: #45a5f9">Difference of all genes</a>
      </template>
      <template #content3="{ row }">
        <a @click="expression(row, 'bulk')" style="color: #45a5f9">Difference of DEGs</a>
      </template> -->
      <template #header="{ column }">
        <span style="display: flex; justify-content: center">
          <span>{{ column.title }} </span>
          <IconifyIconOffline :icon="Download" style="margin-top: 0px; margin-left: 3px; height: 20px; width: 20px" />
        </span>
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
</style>
