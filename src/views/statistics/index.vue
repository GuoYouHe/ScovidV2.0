<script setup lang="ts">
defineOptions({
  name: "Statistics"
});
import pie from './pieplot/index.vue'
import bar from './barplot/index.vue'
</script>

<template>
  <div class="statistic">
    <el-card shadow="never" class="min-h-[320px] mb-[28px]">
      <template #header>
        <span class="cardheardtitle">Statistics of projects and samples among organisms</span>
      </template>
      <template #default>
        <!-- style="transform: translateY(15%)" -->
        <div class="demo">
          <div class="demo_first">
            <pie />
          </div>
          <div class="demo_second">
            <bar />
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card__header) {
  height: 43px;
  line-height: 32px;
  padding: 5px 10px !important;
  background-color: #e0e0e0;
}

:deep(.el-card__body) {
  min-height: 300px;
}

:deep(.el-select) {
  width: 50%;
}

.statistic {
  min-height: 717px;
  margin-top: 50px !important;
}

.demo_second{
  margin-top: 5vh;
}
</style>