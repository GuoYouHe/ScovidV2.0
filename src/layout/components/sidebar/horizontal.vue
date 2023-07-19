<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import SidebarItem from "./sidebarItem.vue";
import { useNav } from "@/layout/hooks/useNav";
import { useTranslationLang } from "../../hooks/useTranslationLang";
import { usePermissionStoreHook } from "@/store/modules/permission";
import logo2 from "@/assets/svg/logo/logo2.svg?component";
import logo3 from "@/assets/svg/logo/logo3.svg?component";
import logo from "@/assets/svg/logo/logo.svg?component";

const menuRef = ref();

const { t, route, locale, translationCh, translationEn } =
  useTranslationLang(menuRef);
const {
  title,
  routers,
  logout,
  backHome,
  onPanel,
  menuSelect,
  username,
  avatarsStyle,
  getDropdownItemStyle,
  getDropdownItemClass
} = useNav();
import { router } from "@/router/index";
nextTick(() => {
  menuRef.value?.handleResize();
});

watch(
  () => route.path,
  () => {
    menuSelect(route.path, routers);
  }
);

function topath(val) {
  // console.log(val, routers);
  router.push(val);
  // menuSelect(val, routers);
}
</script>

<template>
  <div v-loading="usePermissionStoreHook().wholeMenus.length === 0" class="horizontal-header">
    <div class="horizontal-header-left">
      <img @click="topath('/home')" src="@/assets/svg/logo/logo.png" style="width: 263px; height: 60px; margin-bottom: 5px" />
      <!-- <logo2 style="width: 50px; height: 90px; margin-bottom: -30px" />
      <span style="
          color: black;
          font-family: 'Times New Roman';
          margin-bottom: -30px;
          font-size: 45px;
          font-weight: bold;
          padding: 0 0 0 5px;
        " @click="topath('/home')">SCovid v2.0</span>
      <logo3 style="width: 50px; height: 70px; margin-bottom: -28px" /> -->
    </div>
    <el-menu router ref="menuRef" mode="horizontal" class="horizontal-header-menu" menu-trigger="click"
      :default-active="route.path" @select="indexPath => menuSelect(indexPath, routers)">
      <sidebar-item v-for="route in usePermissionStoreHook().wholeMenus" :key="route.path" :item="route"
        :base-path="route.path" />
    </el-menu>
  </div>
</template>
<style>
.layout-theme-default body[layout="horizontal"] .horizontal-header .is-active>.el-sub-menu__title {
  color: #f7931e !important;
}

.layout-theme-default body[layout="horizontal"] .el-menu--horizontal .el-menu .el-sub-menu__title {
  background-color: #fff !important;
}

body[layout="horizontal"] .el-menu--horizontal .el-menu .el-sub-menu__title {
  font-size: 15px;
  min-width: 0 !important;
}

.layout-theme-default body[layout="horizontal"] .el-menu--horizontal .is-active>.el-sub-menu__title i,
.layout-theme-default body[layout="horizontal"] .el-menu--horizontal .is-active.submenu-title-noDropdown i {
  color: #f7931e !important;
}
</style>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.horizontal-header {
  padding-left: 10%;
  padding-right: 10%;
  width: 80%;
  height: 10vh !important;

  // max-height: 340px;
  .horizontal-header-left {
    width: 30% !important;
    height: 60px !important;
    margin-left: -30px !important;
  }

  .horizontal-header-menu {
    width: 70% !important;
    // height: 10% !important;
    justify-content: flex-end;

    li {
      font-size: 18px;
      height: 60px;
    }
  }
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  max-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    min-width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
  }
}

@keyframes liClassActive {
  from {
    padding-bottom: 21px;
    color: black;
  }

  to {
    padding-bottom: 0px;
    color: black;
  }
}

@keyframes deliClassActive {
  from {
    padding-bottom: 0px;
    color: #f7931e;
  }

  to {
    padding-bottom: 21px;
    color: #f7931e;
  }
}

@keyframes ani {

  /*这个动画的意思就是宽度从0-100*/
  from {
    width: 0;
  }

  to {
    width: 120px;
  }
}

@keyframes subani {

  /*这个动画的意思就是宽度从0-100*/
  from {
    width: 0;
  }

  to {
    width: 130px;
  }
}

.el-menu--horizontal .is-active {
  &>.el-sub-menu__title {
    color: #f7931e !important;
  }
}

.horizontal-header {
  .is-active {
    color: #f7931e !important;
    // color: #008000 !important;
  }
}

.el-menu--horizontal {
  .el-menu-item {
    border-bottom: 0px solid var(--el-menu-active-color);
    animation-name: liClassActive;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;

    &::after {
      /*伪类, 添加一个下划线, 但是不给宽度*/
      content: "";
      height: 1.8px;
      background-color: #f7931e;
      position: absolute;
      bottom: 0px;
      left: 52%;
      transform: translate(-50%);
    }

    &.is-active:after {
      /*hover的时候给一个动画*/
      animation-name: ani;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      /*动画停在最后100%时候的状态*/
      animation-direction: alternate;
    }

    &:hover {
      animation-name: deliClassActive;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
    }

    &.is-active {
      border-bottom: 0px solid var(--el-menu-active-color);
      background-color: #f7931e;
    }
  }

  .el-sub-menu {
    animation-name: liClassActive;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    position: relative;

    &:hover {
      animation-name: deliClassActive;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
    }

    &::after {
      /*伪类, 添加一个下划线, 但是不给宽度*/
      content: "";
      height: 2px;
      background-color: #f7931e;
      position: absolute;
      // top: 50px;
      // left: 50%;
      transform: translate(3%);
    }

    &.is-active:after {
      /*hover的时候给一个动画*/
      animation-name: subani;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      /*动画停在最后100%时候的状态*/
      animation-direction: alternate;
    }

    .el-sub-menu__title {
      padding-left: 10px;
    }
  }
}
</style>
