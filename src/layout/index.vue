<script setup lang="ts">
import "animate.css";
// 引入 src/components/ReIcon/src/offlineIcon.ts 文件中所有使用addIcon添加过的本地图标
import "@/components/ReIcon/src/offlineIcon";
import { setType } from "./types";
import { emitter } from "@/utils/mitt";
import { useLayout } from "./hooks/useLayout";
import { useAppStoreHook } from "@/store/modules/app";
import { useSettingStoreHook } from "@/store/modules/settings";
import { deviceDetection, useDark, useGlobal } from "@pureadmin/utils";
import { h, reactive, computed, onMounted, defineComponent, ref } from "vue";

import appMain from "./components/appMain.vue";
import Horizontal from "./components/sidebar/horizontal.vue";
import backTop from "@/assets/svg/back_top.svg?component";
import { useTranslationLang } from "./hooks/useTranslationLang";
const menuRef = ref();
const { translationEn } = useTranslationLang(menuRef);

const { isDark } = useDark();
const { layout } = useLayout();
const isMobile = deviceDetection();
const pureSetting = useSettingStoreHook();
const { $storage } = useGlobal<GlobalPropertiesApi>();

const set: setType = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar;
  }),

  device: computed(() => {
    return useAppStoreHook().device;
  }),

  fixedHeader: computed(() => {
    return pureSetting.fixedHeader;
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === "mobile"
    };
  }),

  hideTabs: computed(() => {
    return $storage?.configure.hideTabs;
  })
});

function setTheme(layoutModel: string) {
  window.document.body.setAttribute("layout", layoutModel);
  $storage.layout = {
    layout: `${layoutModel}`,
    theme: $storage.layout?.theme,
    darkMode: $storage.layout?.darkMode,
    sidebarStatus: $storage.layout?.sidebarStatus,
    epThemeColor: $storage.layout?.epThemeColor
  };
}

function toggle(device: string, bool: boolean) {
  useAppStoreHook().toggleDevice(device);
  useAppStoreHook().toggleSideBar(bool, "resize");
}

toggle("desktop", false);
setTheme(useAppStoreHook().layout);

// 判断是否可自动关闭菜单栏
// let isAutoCloseSidebar = true;

// // // 监听容器
// emitter.on("resize", ({ detail }) => {
// if (isMobile) return;
// const { width } = detail;
// width <= 760 ? setTheme("vertical") : setTheme(useAppStoreHook().layout);
// /** width app-wrapper类容器宽度
//  * 0 < width <= 760 隐藏侧边栏
//  * 760 < width <= 990 折叠侧边栏
//  * width > 990 展开侧边栏
//  */
// if (width > 0 && width <= 760) {
//   toggle("mobile", false);
//   isAutoCloseSidebar = true;
// } else if (width > 760 && width <= 990) {
//   if (isAutoCloseSidebar) {
//     toggle("desktop", false);
//     isAutoCloseSidebar = false;
//   }
// } else if (width > 990) {
//   if (!set.sidebar.isClickCollapse) {
//     toggle("desktop", true);
//     isAutoCloseSidebar = true;
//   }
// }
// });

onMounted(() => {
  translationEn();
});
</script>

<template>
  <div :class="['app-wrapper']" v-resize>
    <div :class="['main-container']">
      <Horizontal />
      <app-main :fixed-header="set.fixedHeader" />
    </div>
  </div>
</template>

<style lang="scss">
p,
span,
h4,
h5,
h6,
h3,
td {
  font-family: "Times New Roman", Times, serif !important;
}

con-leftCon-titleone-pic {
  text-align: center;
  margin: 0 10%;
}

:deep(.el-tabs__item) {
  font-family: "Times New Roman", Times, serif !important;
}
</style>

<style lang="scss" scoped>
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  height: 100vh;
}

.app-wrapper {
  @include clearfix;

  position: relative;
  width: 100%;


  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  min-height: 50px !important;
}

.app-main {
  // padding-left: 10%;
  // padding-right: 10%;
  width: 100%;
  height: 90vh;
}

.app-mask {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.re-screen {
  margin-top: 12px;
}
</style>
