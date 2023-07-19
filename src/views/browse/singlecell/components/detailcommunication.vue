<script setup lang="ts">
import { ref, onMounted } from "vue";
import network from "./networkplot/index.vue";
import heatmap from "./heatmapplot/index.vue";
interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: ""
});

const heatmapload = ref<boolean>(true);

const commload = ref<boolean>(false);

const type = ref("celltype");

const tabPosition = ref("heatmap");

async function pan(targetName) {
  if (targetName.paneName == "heatmap") {
    type.value = "celltype";
    heatmapload.value = true;
    commload.value = false;
  } else {
    type.value = "subtype";
    heatmapload.value = false;
    commload.value = true;
  }
}
onMounted(() => {
  tabPosition.value = "heatmap"
  setTimeout(() => {
    if ((props.DataSet == 'GSE162086') || (props.DataSet == 'GSE166766')) {
      tabPosition.value = "network"
      commload.value = true;
    }
  }, 50);
})
</script>
<template>
  <el-card shadow="never" class="min-h-[780px]">
    <template #header>
      <span class="cardheardtitle">Cell communication</span>
    </template>
    <template #default>
      <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan">
        <el-tab-pane label="Cell type" name="heatmap"
          v-if="!(props.DataSet == 'GSE162086') && !(props.DataSet == 'GSE166766')">
          <el-carousel trigger="click" height="680px" :autoplay="false" indicator-position="outside">
            <el-carousel-item>
              <heatmap v-if="heatmapload" :DataSet="props.DataSet" :type="type" />
            </el-carousel-item>
            <el-carousel-item>
              <network v-if="heatmapload" :DataSet="props.DataSet" :type="type" />
            </el-carousel-item>
          </el-carousel>
          <div class="con-leftCon-titleone-pic" style="text-align: center;">
            <span>
              Figure 8A. The cell communication plots explain Cell-Cell interaction and interaction strength between
              different cell types.
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Sub type" name="network">
          <el-carousel trigger="click" height="680px" :autoplay="false" indicator-position="outside">
            <el-carousel-item>
              <heatmap v-if="commload" :DataSet="props.DataSet" :type="type" />
            </el-carousel-item>
            <el-carousel-item>
              <network v-if="commload" :DataSet="props.DataSet" :type="type" />
            </el-carousel-item>
          </el-carousel>
          <div class="con-leftCon-titleone-pic" style="text-align: center;">
            <span>
              Figure 8B. The cell communication plots explain Cell-Cell interaction and interaction strength between
              different cell sub types.
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-card>
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

.el-carousel {
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
}
</style>
