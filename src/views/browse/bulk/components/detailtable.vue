<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getbrowsefirsttable } from "@/api/browse";

interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "" // 默认值
});

const loading = ref<boolean>(true);
let dialogDataFirst = reactive({
  datasetname: "",
  databaseid: "",
  accessionHtml: "",
  tissue: "",
  sample: "",
  groupdata: "",
  cellsnum: "",
  celltype: "",
  publication:"",
  publicationHtml: ""
});

onMounted(async () => {
  loading.value = true;
  const params: object = {
    dataset: props.DataSet
  };
  const { resultSet } = await getbrowsefirsttable(params);
  dialogDataFirst = resultSet.first;
  loading.value = !loading.value;
});
</script>
<template>
  <el-card shadow="never" class="min-h-[380px]">
    <template #header>
      <span class="cardheardtitle">Detailed description</span>
    </template>
    <template #default>
      <div
        class="Con-table"
        v-loading="loading"
        element-loading-text="Loading..."
      >
        <table width="100%" class="table">
          <thead></thead>
          <tr>
            <td width="180px">Dataset name</td>
            <td colspan="1">{{ dialogDataFirst.datasetname }}</td>
          </tr>
          <tr>
            <td width="180px">Database ID</td>
            <td colspan="1">{{ dialogDataFirst.databaseid }}</td>
          </tr>
          <tr>
            <td width="180px">Accession</td>
            <td colspan="1">
              <div class v-html="dialogDataFirst.accessionHtml"></div>
            </td>
          </tr>
          <tr>
            <td width="180px">Tissue</td>
            <td colspan="1">{{ dialogDataFirst.tissue }}</td>
          </tr>
          <tr>
            <td width="180px">Sample</td>
            <td colspan="1">{{ dialogDataFirst.sample }}</td>
          </tr>
          <tr>
            <td width="180px">Group</td>
            <td colspan="1">{{ dialogDataFirst.groupdata }}</td>
          </tr>
          <!-- <tr>
            <td width="180px">Number of cells</td>
            <td colspan="1">{{ dialogDataFirst.cellsnum }}</td>
          </tr> -->
          <!-- <tr>
            <td width="180px">Cell type</td>
            <td colspan="1">{{ dialogDataFirst.celltype }}</td>
          </tr> -->
          <tr>
            <td width="180px">Publication</td>
            <td colspan="1">
              <div v-if="dialogDataFirst.publication=='No'? true:false">{{ dialogDataFirst.publication}}</div>
              <div v-else class v-html="dialogDataFirst.publicationHtml"></div>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </el-card>
</template>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  // border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  td {
    border: 1px solid #c0c0c0;
    font-size: 16px;
    font-weight: 500;
    height: 30px;
    line-height: 25px;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    font-weight: normal;
    color: #0a0a0a;
    p {
      margin: 0;
      font-size: 20px;
    }
  }
}
:deep(a, a:focus, a:hover) {
  color: #409eff !important;
  // font-size:18px!important;
  // font-weight:500!important;
}
:deep(a:hover) {
  text-decoration: underline;
}

table th {
  border: 1px solid #c0c0c0;
  font-size: 16px;
  font-weight: 500;
  height: 42px;
  line-height: 42px;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-weight: normal;
  color: #0a0a0a;
}
table th {
  background-color: #e0e0e0;
  width: 100px;
}
// tbody tr {
//   /* height: 80px !important; */
//   // height: 40px !important;
//   // line-height: 40px !important;
// }
table tr:nth-child(odd) {
  background: #e0e0e0;
}
table tr:nth-child(even) {
  background: #fff;
}
</style>
