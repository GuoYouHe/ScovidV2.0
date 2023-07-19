<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import pagetable from "./pagetable/index.vue";

interface PropsType {
  DataType: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataType: ""
});
const tableload = ref(true);
let DataList = {};
const loading = ref<boolean>(true);
</script>

<template>
  <div class="Con-table">
    <pagetable v-if="tableload" :DataType="props.DataType" />
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card__header) {
  height: 43px;
  line-height: 32px;
  padding: 5px 10px !important;
  background-color: #e0e0e0;
}
.main-content {
  margin: 15px;
}
.cardheardtitle {
  font-size: 16px;
  font-weight: 700;
}
</style>
