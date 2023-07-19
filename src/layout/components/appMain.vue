<script setup lang="ts">
import { useGlobal } from "@pureadmin/utils";
import layoutFooter from "./footer.vue";
import backTop from "@/assets/svg/back_top.svg?component";
import {
  h,
  computed,
  Transition,
  defineComponent,
  onMounted,
  shallowRef
} from "vue";
import { usePermissionStoreHook } from "@/store/modules/permission";

const props = defineProps({
  fixedHeader: Boolean
});

const { $storage, $config } = useGlobal<GlobalPropertiesApi>();

const keepAlive = computed(() => {
  return $config?.KeepAlive;
});

const transitions = computed(() => {
  return route => {
    return route.meta.transition;
  };
});

const hideTabs = computed(() => {
  return $storage?.configure.hideTabs;
});

const layout = computed(() => {
  return $storage?.layout.layout === "vertical";
});

const getSectionStyle = computed(() => {
  return [
    hideTabs.value && layout ? "padding-top: 48px;" : "",
    !hideTabs.value && layout ? "padding-top: 85px;" : "",
    hideTabs.value && !layout.value ? "padding-top: 48px" : "",
    !hideTabs.value && !layout.value ? "padding-top: 85px;" : "",
    props.fixedHeader ? "" : "padding-top: 0;"
  ];
});

const transitionMain = defineComponent({
  render() {
    return h(
      Transition,
      {
        name:
          transitions.value(this.route) &&
            this.route.meta.transition.enterTransition
            ? "pure-classes-transition"
            : (transitions.value(this.route) &&
              this.route.meta.transition.name) ||
            "fade-transform",
        enterActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.enterTransition}`,
        leaveActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.leaveTransition}`,
        mode: "out-in",
        appear: true
      },
      {
        default: () => [this.$slots.default()]
      }
    );
  },
  props: {
    route: {
      type: undefined,
      required: true
    }
  }
});
</script>

<template>
  <section :class="['app-main']" style="padding-top: 2vh">
    <router-view>
      <template #default="{ Component, route }">
        <el-scrollbar style="width: 100%">
          <el-backtop title="回到顶部" target=".app-main .el-scrollbar__wrap">
            <backTop />
          </el-backtop>
          <transitionMain :route="route">
            <keep-alive v-if="keepAlive" :include="usePermissionStoreHook().cachePageList">
              <component :is="Component" :key="route.fullPath" class="main-content" />
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath" class="main-content" id="browsescorll" />
          </transitionMain>
          <footer style="background-color: #eef6fe; height: 60px; z-index: 1000">
            <div style="padding-top: 1px">
              <p>Copyright © College of Bioinformatics Science and Technology, Harbin Medical University.</p>
            </div>
          </footer>
        </el-scrollbar>
      </template>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  /* background-image: url(@/assets/img/home/blog-left-dec.jpg); */
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

.app-main-nofixed-header {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.main-content {
  margin: 24px;
  margin-top: 0px;
  padding: 0 10%;
  min-height: 83vh;
}

footer p {
  text-align: center;
  margin: 20px 0px 0px 20px;
  color: #000000;
}
</style>
