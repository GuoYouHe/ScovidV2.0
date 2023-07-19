<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { usepie2echart } from "./pie2echart";
import { getTreeList } from "@/api/browse";
const { echart2 } = usepie2echart();

const loading = ref<boolean>(false);
const loading1 = ref<boolean>(false);
const loading2 = ref<boolean>(false);

onMounted(() => {
  loading.value = true;
  loading1.value = true;
  loading2.value = true;
  homepieothervirus();
  homepiesc();
  homepiebulk();
});

async function homepieothervirus() {
  const params: object = {
    datasettype: "othervirus"
  };
  const { resultSet } = await getTreeList(params);

  const data = Object.keys(resultSet).map(v => {
    return {
      value: resultSet[v]["children"].length,
      name: `${resultSet[v].name}`
    };
  });
  //排序
  data.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  const legend_data = Object.keys(resultSet).map(v => {
    return {
      name: `${resultSet[v].name}`
    };
  });
  legend_data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  setTimeout(() => {
    nextTick(() => {
      echart2("homepieothervirus", data, legend_data, "Bulk|Other coronaviruses");
      loading2.value = false;
    });
  }, 500);
}

async function homepiesc() {
  const params: object = {
    datasettype: "singlecell"
  };
  const { resultSet } = await getTreeList(params);

  const data = Object.keys(resultSet).map(v => {
    return {
      value: resultSet[v]["children"].length,
      name: `${resultSet[v].name}`
    };
  });
  //排序
  data.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  const legend_data = Object.keys(resultSet).map(v => {
    return {
      name: `${resultSet[v].name}`
    };
  });
  legend_data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  setTimeout(() => {
    nextTick(() => {
      echart2("homepierefsc", data, legend_data, "Single-cell|COVID-19");
      loading.value = false;
    });
  }, 500);
}

async function homepiebulk() {
  const params: object = {
    datasettype: "bulk"
  };
  const { resultSet } = await getTreeList(params);

  const data = Object.keys(resultSet).map(v => {
    return {
      value: resultSet[v]["children"].length,
      name: `${resultSet[v].name}`
    };
  });
  //排序
  data.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  const legend_data = Object.keys(resultSet).map(v => {
    return {
      name: `${resultSet[v].name}`
    };
  });
  legend_data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  setTimeout(() => {
    nextTick(() => {
      echart2("homepierefbulk", data, legend_data, "Bulk|COVID-19");
      loading1.value = false;
    });
  }, 500);
}
</script>
<template>
  <div class="Con-table">
    <div class="umap-img">
      <el-row :gutter="1">
        <el-col :span="8">
          <div v-loading="loading" element-loading-text="Loading..." id="homepierefsc"
            style="width: 100%; height: 400px" />
        </el-col>
        <el-col :span="8">
          <div v-loading="loading1" element-loading-text="Loading..." id="homepierefbulk"
            style="width: 100%; height: 400px" />
        </el-col>
        <el-col :span="8">
          <div v-loading="loading2" element-loading-text="Loading..." id="homepieothervirus"
            style="width: 100%; height: 400px" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Con-table {
  min-height: 300px;
}
</style>
