<script setup lang="ts">
import { useColumns } from "./vxetable";
import { ref, onMounted } from "vue";
const {
  gridOptions,
  xGrid,
  params,
  searchEvent,
  formData,
  resetEvent,
  tableExpand
} = useColumns();

const loadingbox = ref<boolean>(true);

interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "" // 默认值
});
</script>
<template>
  <div>
    <vxe-grid
      ref="xGrid"
      v-bind="gridOptions"
      align="center"
      :expand-config="tableExpand"
    >
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input
                v-model="formData.searchname"
                type="text"
                placeholder="Input"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button
                type="submit"
                status="primary"
                content="search"
              ></vxe-button>
              <vxe-button type="reset" content="reset"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
      <template #content="{ row }">
        <div class="expand-wrapper">
          <el-row :gutter="24" class="mb-[18px]">
            <el-col
              :offset="2"
              :xs="24"
              :sm="24"
              :md="20"
              :lg="20"
              :xl="20"
              v-motion
              :initial="{
                opacity: 0,
                x: -100
              }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: {
                  // type: 'spring',
                  stiffness: '50',
                  delay: 200
                }
              }"
            >
            <div shadow="never" class="min-h-[400px]">
              <div
                    v-loading="row.childDataleftloading"
                    element-loading-text="Loading..."
                    class="boxechart"
                    :id="'volcanoref' + row.id"
                    style="width: 100%; height: 390px"
                  />
            </div>
              <!-- <el-card shadow="never" class="min-h-[480px]">
                <template #header>
                  <span class="cardheardtitle">Expression from each group</span>
                </template>
                <template #default>
                  <div
                    v-loading="row.childDataleftloading"
                    element-loading-text="Loading..."
                    class="boxechart"
                    :id="'volcanoref' + row.id"
                    style="width: 100%; height: 390px"
                  />
                </template>
              </el-card> -->
            </el-col>
          </el-row>
        </div>
      </template>
    </vxe-grid>
  </div>
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

.expand-wrapper{
  margin: auto;
}
</style>
