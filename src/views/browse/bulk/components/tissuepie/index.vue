<template>
  <div class="bodyimg" v-loading="loading" element-loading-text="Loading...">
    <div v-if="loadechart" class="boxechart" id="tissuepie" style="width: 100%; height: 690px" />
    <!-- <div class="infobox" /> -->
  </div>
</template>

<script setup lang="ts">
// 引入图片的css
import { getTreeList } from "@/api/browse";
import { nextTick } from "process";
import { ref, onMounted } from "vue";
import { usepiechart } from "./pieechart.js";
// import Veins_Medical from "@/assets/svg/tissuebody/Veins_Medical_Diagram_clip_art4.svg?component";

const { echart } = usepiechart();
const loading = ref(true);
const loadechart = ref(false);

onMounted(async () => {
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
    loadechart.value = true;
    nextTick(() => {
      echart("tissuepie", data, legend_data);
      loading.value = false;
    });
  }, 1000);
});
</script>

<style scoped>
.tissueImages {
  opacity: 0.6;
  width: 45px;
  height: 45px;
}

.infobox {
  z-index: 30;
  height: 200px;
  width: 330px;
  border: 2px dashed #e0e0e0;
  border-radius: 20px;
  position: absolute;
  bottom: 30px;
  right: 5%;
}

.bodybox {
  z-index: 30;
  height: 600px;
  width: 482px;
  position: absolute;
  bottom: 30px;
  left: 10%;
}

.content1 {
  margin-bottom: 40px;
}

.tissueImages:hover {
  opacity: 90;
  transform: scale(1.2);
  z-index: 1050;
}

.title_right_top img {
  width: 40px;
  height: 40px;
  margin: 0 0 0 0;
  opacity: 0.6;
}

.title_right_top_color td {
  opacity: 0.6;
}

.img-item-null {
  margin: 2px 0;
  width: 100%;
  height: 650px;
  position: relative;
}

.imgaeWord .clickTextLeft {
  cursor: pointer;
}

.homeImageChangeControl:hover {
  opacity: 90;
  transform: scale(1.2);
  z-index: 1050;
}

.title_right_top td {
  vertical-align: bottom;
  text-align: center;
  padding: 0;
}

.title_right_top table {
  margin: 0 0 0 85%;
  width: 15%;
}

.homeImageChangeControl.itemactive {
  opacity: 90;
}

.bodyimg {
  height: 680px;
  width: 100%;
  /* margin-left: 13%; */
}

.imagecontent {
  margin-top: 40px;
}</style>
