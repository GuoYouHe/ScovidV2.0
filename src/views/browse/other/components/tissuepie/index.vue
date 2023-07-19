<template>
  <div class="bodyimg" v-loading="loading" element-loading-text="Loading...">
    <!-- <div v-if="loadechart" class="boxechart" id="tissuepie" style="width: 100%; height: 690px" /> -->
    <!-- <img src="./svg/others.png" style="padding: 10%;" /> -->
    <el-row class="imgaeWord imagecontent" :gutter="40">
      <el-col :span="8" class="title_left">
        <img class="img-item-null" src="./svg/virus1.png" title="HCoV-229E" @click="Clicktitle('HCoV-229E')" alt="" />
      </el-col>
      <el-col :span="8" class="title_left">
        <img class="img-item-null" src="./svg/virus2.png" title="HCoV-OC43" @click="Clicktitle('HCoV-OC43')" alt="" />
      </el-col>
      <el-col :span="8" class="title_left">
        <img class="img-item-null" src="./svg/virus3.png" title="MERS-CoV" @click="Clicktitle('MERS-CoV')" alt="" />
      </el-col>
    </el-row>
    <!-- <div class="container">
      <div class="content" title="This is the title">Content</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// 引入图片的css
import { getTreeList } from "@/api/browse";
import { nextTick } from "process";
import { ref, onMounted } from "vue";
import { emitter } from "@/utils/mitt";
const loading = ref(true);
const loadechart = ref(false);

onMounted(async () => {
  setTimeout(() => {
    loadechart.value = true;
    nextTick(() => {
      loading.value = false;
    });
  }, 1000);
});

var expandstatus = false
var expandname

const status = {
  'HCoV-229E': true
  ,
  'HCoV-OC43': true
  ,
  'MERS-CoV': true
}


// 点击触发函数的示例
function Clicktitle(nodename) {
  var ss = status[nodename]
  expandstatus = !ss
  status[nodename] = expandstatus
  expandname = nodename
  emitter.emit("othertreeexpand", {
    expandname,
    expandstatus
  });
}
</script>

<style scoped>
.img-item-null {
  height: 320px;
  width: 320px;
  margin: auto;
  cursor: pointer;
  transition: all 0.3s;
}

.img-item-null {
  position: relative;
}

.img-item-null::after {
  content: attr(title);
  position: absolute;
  height: 30px;
  width: 30px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  visibility: hidden;
  /* opacity: 0; */
  transition: visibility 0s linear 0.3s, opacity 0.3s;
}

.img-item-null:hover::after {
  visibility: visible;
  opacity: 1;
}

.img-item-null:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.imagecontent {
  margin-top: 15%;
}
</style>
