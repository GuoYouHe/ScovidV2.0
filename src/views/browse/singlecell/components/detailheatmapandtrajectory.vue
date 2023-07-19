<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import downloadIcon from "@/assets/svg/download.svg?component";
import { getbrowsescheatmapandtrajectory } from "@/api/browse";

interface PropsType {
  DataSet: string;
  // type: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "", // 默认值
  // type: ""
});

const loading = ref<boolean>(true);
const heatmapstatus = ref<boolean>(true);
const heatmap = ref();
const heatmapcelltype = ref();
const heatmapsubtype = ref();
const trajectory = ref();
const communication = ref();
const communicationstatus = ref<boolean>(true);
const trajectorystatus = ref<boolean>(true);
const loadingactiveTab3_1 = ref<boolean>(true);
const loadingactiveTab3_2 = ref<boolean>(true);
const tabPosition = ref("celltype");
const abundanceChartRef1 = ref<HTMLDivElement | null>(null);
const abundanceChartRef2 = ref<HTMLDivElement | null>(null);

async function pan(targetName) {
  // loading.value = true;
  // let params: object = {};
  // const ChartRef = ref();
  // if (targetName.paneName == "subtype") {
  //   params = {
  //     dataset: props.DataSet,
  //     abundancetype: targetName.paneName
  //   };
  //   ChartRef.value = abundanceChartRef2.value
  // } else {
  //   params = {
  //     dataset: props.DataSet,
  //     abundancetype: targetName.paneName
  //   };
  //   ChartRef.value = abundanceChartRef1.value
  // }
  // const { resultSet } = await getbrowsescabundance(params);
  // nextTick(() => {
  // useechart(ChartRef, resultSet.third);
  // });
}

onMounted(async () => {
  if ((props.DataSet == 'GSE162086') || (props.DataSet == 'GSE166766')) {
    tabPosition.value = 'subtype'
  }

  if (props.DataSet != "") {
    loading.value = true;
    let params: object = {
      dataset: props.DataSet
    };
    const { resultSet } = await getbrowsescheatmapandtrajectory(params);
    nextTick(() => {
      setTimeout(() => {
        HeatmapAndTrajectory(resultSet);
        loading.value = false;
      }, 50);
    });
  }
});

function downLoadpng(var1: String, var2: String) {
  const axiospath =
    `${window.$filldownload}` +
    "/des/downloadpdf?dataset=" +
    var1 +
    "&filename=" +
    var2;
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = axiospath;
  document.body.appendChild(link);
  link.click();
}

function HeatmapAndTrajectory(data: any) {
  heatmapstatus.value = true;
  communicationstatus.value = true;
  trajectorystatus.value = true;
  loadingactiveTab3_1.value = true;
  heatmap.value = data.heatmap;
  heatmapcelltype.value = "data:image/png;base64," + data.heatmap[0].img;
  loadingactiveTab3_1.value = false;
  heatmapsubtype.value = "data:image/png;base64," + data.heatmap[1].img;
  loadingactiveTab3_2.value = false;
  var trajectorylist = data.trajectory;
  trajectorylist.forEach(item => {
    item.img = "data:image/png;base64," + item.img;
  });
  trajectory.value = trajectorylist;
  // var communicationlist = data.communication;
  // communicationlist.forEach(item => {
  //   item.img = "data:image/png;base64," + item.img;
  // });
  // communication.value = communicationlist;

  loading.value = false;
}

const commload = ref<boolean>(false);

const heatmapload = ref<boolean>(true);

const tabPosition3 = ref("heatmap");

async function pan3(targetName) {
  if (targetName.paneName == "heatmap") {
    heatmapload.value = true;
    commload.value = false;
  } else {
    heatmapload.value = false;
    commload.value = true;
  }
}
</script>

<template>
  <!-- 热图 -->
  <el-row :gutter="24" class="mb-[18px]">
    <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24" class="mb-[18px]" style="margin-bottom: 0px; height: 100%"
      v-motion :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 200
  }
}">
      <el-card shadow="never" class="min-h-[780px]">
        <template #header>
          <span class="cardheardtitle">Heatmap</span>
        </template>
        <template #default>
          <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan">
            <!-- abundance-->
            <el-tab-pane label="Cell type" name="celltype"
              v-if="!(props.DataSet == 'GSE162086') && !(props.DataSet == 'GSE166766')">
              <div class="oneExecls" v-loading="loading" element-loading-text="loading">
                <div class="rightCon-table">
                  <div class="downLoadpng" @click="
                    downLoadpng(heatmap[0].dataset, heatmap[0].imgpathname)
                    " title="Save as pdf" style="position: absolute; right: 20%">
                    <!-- <img src="@/assets/img/browse/downloadpng.png" alt="" /> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                      <path fill="currentColor"
                        d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z" />
                    </svg>
                  </div>
                  <img :src="heatmapcelltype" alt="" style="padding-top: 3%; height: 50%; width: 50%" />
                </div>
              </div>
              <div class="con-leftCon-titleone-pic">
                <span>Figure 6A. The heatmap that shows the expression profile of
                  high-variance genes in different cell types.
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Sub type" name="subtype">
              <div class="oneExecls" v-loading="loading" element-loading-text="loading">
                <div class="rightCon-table">
                  <div class="downLoadpng" @click="
                    downLoadpng(heatmap[1].dataset, heatmap[1].imgpathname)
                    " title="Save as pdf" style="position: absolute; right: 20%">
                    <!-- <img src="@/assets/img/browse/downloadpng.png" alt="" /> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                      <path fill="currentColor"
                        d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z" />
                    </svg>
                  </div>
                  <img :src="heatmapsubtype" alt="" style="padding-top: 3%; height: 50%; width: 50%" />
                </div>

              </div>
              <div class="con-leftCon-titleone-pic">
                <span>Figure 6B. The heatmap that shows the expression profile of
                  high-variance genes in different sub types.
                </span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </el-col>
  </el-row>
  <!-- 轨迹图 -->
  <el-row :gutter="24" class="mb-[18px]">
    <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24" class="mb-[18px]" style="margin-bottom: 0px; height: 100%"
      v-motion :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 200
  }
}">
      <el-card shadow="never" class="min-h-[700px]">
        <template #header>
          <span class="cardheardtitle">Cell differentiation</span>
        </template>
        <template #default>
          <el-carousel trigger="click" height="680px" :autoplay="false" v-loading="loading" element-loading-text="loading"
            indicator-position="outside">
            <el-carousel-item v-for="(item, index) in trajectory" :key="index">
              <div class="rightCon-table">
                <div class="downLoadpng" @click="downLoadpng(item.dataset, item.imgpathname)" title="Save as pdf"
                  style="position: absolute; right: 20%">
                  <!-- <img src="@/assets/img/browse/downloadpng.png" alt="" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                    <path fill="currentColor"
                      d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z" />
                  </svg>
                </div>
                <img :src="item.img" alt="" style="padding-top: 3%; height: 50%; width: 50%" />
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="con-leftCon-titleone-pic">
            <span>
              Figure 7. The cell differentiation plots show cell differentiation trajectories in different cell types.
            </span>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.umap-img {
  width: 80%;
  height: 700px;
  margin: 0 10%;
}

.con-leftCon-titleone-pic {
  text-align: center;
}

.downLoadpng {
  width: 100px;

  svg {
    margin: auto;
    opacity: 0.6;
  }

  p {
    margin: 0 17%;
    color: transparent;
  }

  p:hover {
    color: aqua;
  }
}

.downLoadpng:hover {
  color: #55A7CB;
}

img {
  margin: auto;
  width: 650px;
  height: 800px;
}

.downLoadpng {
  img {
    margin: auto;
    width: 24px;
    height: 24px;
  }
}

.oneExecls {
  min-height: 680px;
}


.el-carousel {

  // width: 500px;
  // .el-carousel__item:nth-child(2n) {
  //     background-color: #99a9bf;
  // }
  // .el-carousel__item:nth-child(2n+1) {
  //     background-color: #d3dce6;
  // }
  :deep(.el-carousel__indicators) {
    // 指示器
    left: unset;
    transform: unset;
    right: 2%;
  }

  :deep(.el-carousel__button) {
    // 指示器按钮
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  :deep(.is-active .el-carousel__button) {
    // 指示器激活按钮
    background: #3f8ec8;
  }
}</style>
