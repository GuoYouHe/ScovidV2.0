<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { getTreeList } from "@/api/browse";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  ref,
  computed,
  watch,
  onMounted,
  getCurrentInstance,
  nextTick,
  defineEmits
} from "vue";

import Dept from "@iconify-icons/ri/git-branch-line";
import Reset from "@iconify-icons/ri/restart-line";
import Search from "@iconify-icons/ep/search";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import LocationCompany from "@iconify-icons/ep/add-location";
import ExpandIcon from "../svg/expand.svg?component";
import UnExpandIcon from "../svg/unexpand.svg?component";

interface Tree {
  id: number;
  name: string;
  highlight?: boolean;
  children?: Tree[];
}

// const emit = defineEmits(['clickChild'])
const treeRefother = ref();
const treeData = ref([]);
const isExpand = ref(true);
const searchValue = ref("");
const highlightMap = ref({});
const height = ref(1);
const { proxy } = getCurrentInstance();
const defaultProps = {
  children: "children",
  label: "name"
};
const buttonClass = computed(() => {
  return [
    "!h-[20px]",
    "reset-margin",
    "!text-gray-500",
    "dark:!text-white",
    "dark:hover:!text-primary"
  ];
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.name.includes(value);
};

function nodeClick(value) {
  const nodeId = value.$treeNodeId;
  highlightMap.value[nodeId] = highlightMap.value[nodeId]?.highlight
    ? Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
      highlight: false
    })
    : Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
      highlight: true
    });
  Object.values(highlightMap.value).forEach((v: Tree) => {
    if (v.id !== nodeId) {
      v.highlight = false;
    }
  });
  if (value.type == 2) {
    nextTick(() => {
      const treeNodeName = value.accession;
      const treeNodeValue = true;
      emitter.emit("treescroll", {
        treeNodeName,
        treeNodeValue
      });
      // emit('clickChild',params)
    });
  }
}

function toggleRowExpansionAll(status) {
  isExpand.value = status;
  const nodes = (proxy.$refs["treeRefother"] as any).store._getAllNodes();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = status;
  }
}

/** 重置状态（选中状态、搜索框值、树初始化） */
function onReset() {
  highlightMap.value = {};
  searchValue.value = "";
  toggleRowExpansionAll(true);
}

watch(searchValue, val => {
  treeRefother.value!.filter(val);
});


const loading = ref<boolean>(true);

onMounted(async () => {
  const params: object = {
    datasettype: "othervirus"
  };
  const { resultSet } = await getTreeList(params);
  treeData.value = resultSet;
  loading.value = !loading.value;
  // console.log(treeData);
  setTimeout(() => {
    const nodes = ((
      proxy.$refs["treeRefother"] as any
    ).store._getAllNodes()[0].expanded = true);
    emitter.on("othertreeexpand", ({ expandname, expandstatus }) => {
      setTimeout(() => {
        const nodes = (proxy.$refs["treeRefother"] as any).store.getNode({
          name: expandname
        }).expanded = expandstatus;
      }, 50);
    });
  }, 50);
});




defineExpose({
  nodeClick,
  height
});
</script>
<!-- default-expand-all -->
<template>
  <div class="h-full h-[700px] bg-bg_color overflow-auto">
    <div class="flex items-center h-[34px]">
      <!-- <p class="flex-1 ml-2 font-bold text-base truncate" title="部门列表">
        tissue
      </p> -->
      <el-input style="flex: 2" size="small" v-model="searchValue" placeholder="search by name" clearable>
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline v-show="searchValue.length === 0" :icon="Search" />
          </el-icon>
        </template>
      </el-input>
      <el-dropdown :hide-on-click="false">
        <IconifyIconOffline class="w-[28px] cursor-pointer" width="18px" :icon="More2Fill" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button :class="buttonClass" link type="primary"
                :icon="useRenderIcon(isExpand ? ExpandIcon : UnExpandIcon)"
                @click="toggleRowExpansionAll(isExpand ? false : true)">
                {{ isExpand ? "Fold" : "Expand" }}
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button :class="buttonClass" link type="primary" :icon="useRenderIcon(Reset)" @click="onReset">
                Reset
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-divider />
    <!-- :default-expanded-keys="[32]" -->
    <el-tree ref="treeRefother" :data="treeData" node-key="name" size="small" :props="defaultProps" default-expand-all
      :expand-on-click-node="false" :filter-node-method="filterNode" @node-click="nodeClick" v-loading="loading"
      element-loading-text="Loading...">
      <template #default="{ node, data }">
        <span :class="[
          'pl-1',
          'pr-1',
          'rounded',
          'flex',
          'items-center',
          'select-none',
          searchValue.trim().length > 0 &&
          node.label.includes(searchValue) &&
          'text-red-500',
          highlightMap[node.id]?.highlight ? 'dark:text-primary' : ''
        ]" :style="{
  background: highlightMap[node.id]?.highlight
    ? 'var(--el-color-primary-light-7)'
    : 'transparent'
}">
          <IconifyIconOffline :icon="data.type === 1
            ? OfficeBuilding
            : data.type === 2
              ? LocationCompany
              : Dept
            " />
          <span v-if="node.label.length < 25 ? true : false">
            {{ node.label }}
          </span>
          <span v-else>
            {{ node.label.substr(0, 25) }}
            <el-tooltip effect="light" :content="node.label" placement="right">
              ...
            </el-tooltip>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-divider) {
  margin: 0;
}

:deep(.el-input__inner) {
  font-family: "Times New Roman", Times, serif !important;
}
</style>
