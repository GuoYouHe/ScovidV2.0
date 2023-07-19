<template>
  <div class="bodyimg" v-loading="loading" element-loading-text="Loading...">
    <el-row class="imgaeWord imagecontent" :gutter="0">
      <el-col :span="10" class="title_left">
        <div v-for="(item, i) in data.shwoImg" :key="i">
          <img
            class="img-item-null"
            v-if="item.isborder"
            :src="item.src"
            alt=""
          />
        </div>
        <!-- //人体组织 -->
        <div
          :style="
            data.shwoImg[0].isborder ? 'display:block;' : 'display: none;'
          "
        ></div>
      </el-col>
      <el-col :span="14">
        <div
          v-loading="loading"
          element-loading-text="Loading..."
          class="boxechart"
          id="tissuepie"
          style="width: 100%; height: 500px"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入图片的css
import "@/style/homeimage.css";
import * as echarts from "echarts";
import "@/assets/jquery/jquery-3.6.4.min.js";
import { ref, onMounted } from "vue";
import { homoTissue } from "../hook";
const { data, clickText, tobrowse } = homoTissue();
const loading = ref(true);
setTimeout(() => {
  loading.value = !loading.value;
}, 800);

onMounted(() => {
  echartpie("tissuepie", []);
});

function echartpie(id, DataList) {
  var option = {
    tooltip: {
      trigger: "item"
    },
    grid: {
      left: 2
    },
    // legend: {
    //   top: "5%",
    //   left: "center"
    // },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 5,
      top: "15%",
      bottom: 20
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["35%", "70%"],
        right: "20%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 20, name: "heart" },
          { value: 10, name: "large-intestine" },
          { value: 50, name: "small-intestine" },
          { value: 44, name: "spleen" },
          { value: 30, name: "kidney" },
          { value: 30, name: "lung" },
          { value: 30, name: "liver" },
          { value: 18, name: "blood" },
          { value: 35, name: "brain" },
          { value: 50, name: "eye" },
          { value: 48, name: "nose" },
          { value: 30, name: "pancreas" },
          { value: 30, name: "placenta" },
          { value: 30, name: "Stomach" }
        ]
      }
    ]
  };
  var chartDom = document.getElementById(id);
  let myChart = echarts.init(chartDom);
  if (chartDom == null) {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(chartDom);
  } else {
    myChart.dispose();
    myChart = echarts.init(chartDom);
  }
  myChart.clear();
  myChart.setOption(option, true);
}
</script>

<style scoped>
.tissueImages {
  opacity: 0.6;
  width: 45px;
  height: 45px;
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
  height: 95%;
  width: 95%;
  /* margin-left: 13%; */
}
.imagecontent {
  margin-top: 40px;
}
</style>
