<script setup lang="ts">
import tree from "./components/tree.vue";
// import homotissues from "./components/homotissuespie.vue";
import homotissues from "./components/tissuepie/index.vue";
import detailtable from "./components/detailtable.vue";
import abundance from "./components/detailabundance.vue";
import umap from "./components/detailumap.vue";
import BrowseImg from "./components/detailheatmapandtrajectory.vue";
import detailcommunication from "./components/detailcommunication.vue";
import volcano from "./components/detailvolcano.vue";
import { h, ref, computed, shallowRef, nextTick, defineComponent,onMounted } from "vue";
import { emitter } from "@/utils/mitt";
defineOptions({
  name: "Singlecell"
});

const el = shallowRef<HTMLElement>();
const browsefiesttable = ref<boolean>(false);
const treeref = ref<InstanceType<typeof tree> | null>(null);
const loading = ref<boolean>(false);
const dataset = ref();
const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});

const getData = (val: any) => {
  loading.value = val;
};

emitter.on("treescroll", ({ treeNodeName, treeNodeValue }) => {
  loading.value = true;
  dataset.value = treeNodeName;
  browsefiesttable.value = false;
  nextTick(() => {
    el.value =
      document.querySelector<HTMLElement>(".app-main .el-scrollbar__wrap") ??
      undefined;
    loading.value = false;
    browsefiesttable.value = true;
  });
  setTimeout(() => {
    document.querySelector<HTMLElement>(".body_contant").style.minHeight =
      "880px";
    el.value?.scrollTo({ top: 800, behavior: "smooth" });
  }, 50);
});

const treeload = ref<boolean>(false);
onMounted(() => {
  setTimeout(() => {
    treeload.value = true
  }, 500);
})
</script>

<template>
  <div class="contentheight">
    <el-row :gutter="24" class="mb-[18px]" v-loading="loading" element-loading-text="Loading...">
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-motion :initial="{
        opacity: 0,
        x: -100
      }" :enter="{
  opacity: 1,
  x: 0,
  transition: {
    // type: 'spring',
    stiffness: '50',
    delay: 200
  }
}">
        <el-card shadow="never" class="min-h-[780px]">
          <template #header>
            <span class="cardheardtitle">Browse</span>
          </template>
          <!-- <el-skeleton animated :rows="7"  :loading="loading"> -->
          <template #default>
            <tree v-if="treeload" ref="treeref" class="w-[100%] float-left" />
          </template>
          <!-- </el-skeleton> -->
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="mb-[18px]" style="margin-bottom: 0px; height: 100%"
        v-motion :initial="{
          opacity: 0,
          x: 100
        }" :enter="{
  opacity: 1,
  x: 0,
  transition: {
    // type: 'spring',
    stiffness: '50',
    delay: 200
  }
}">
        <el-card shadow="never" class="min-h-[780px]">
          <template #header>
            <span class="cardheardtitle">Coronaviruses datasets</span>
          </template>
          <template #default>
            <homotissues class="w-[100%] float-left" />
          </template>
        </el-card>
      </el-col>
    </el-row>
    <div v-show="browsefiesttable" class="body_contant">
      <el-row :gutter="24" class="umap mb-[18px]">
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
          <detailtable v-if="browsefiesttable" :DataSet="dataset" />
        </el-col>
      </el-row>

      <el-row :gutter="24" class="umap mb-[18px]">
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
          <abundance v-if="browsefiesttable" :DataSet="dataset" />
        </el-col>
      </el-row>

      <el-row :gutter="24" class="umap mb-[18px]">
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
          <volcano v-if="browsefiesttable" :DataSet="dataset" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card__header) {
  height: 43px;
  line-height: 32px;
  padding: 5px 10px !important;
  background-color: #e0e0e0;
}

:deep(.el-tabs__item) {
  font-family: "Times New Roman", Times, serif !important;
}

.main-content {
  margin: 15px;
}

.cardheardtitle {
  font-size: 16px;
  font-weight: 700;
}

.contentheight {
  min-height: 717px;
  margin-top: 50px !important;
}
</style>
