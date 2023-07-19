// import "@/utils/sso";
import { getConfig } from "@/config";
import NProgress from "@/utils/progress";
import { transformI18n } from "@/plugins/i18n";
import { sessionKey, type DataInfo } from "@/utils/auth";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { message } from "@/utils/message";
import { useUserStoreHook } from "@/store/modules/user";
import {
  Router,
  createRouter,
  RouteRecordRaw,
  RouteComponent
} from "vue-router";
import {
  ascending,
  initRouter,
  isOneOfArray,
  getHistoryMode,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes
} from "./utils";
import { buildHierarchyTree } from "@/utils/tree";
import { isUrl, openLink, storageSession } from "@pureadmin/utils";

import remainingRouter from "./modules/remaining";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 原始静态路由（未做任何处理） */
const routes = [];


Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(
  ...remainingRouter
);

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});

/** 创建路由实例 */
export const router: Router = createRouter({
  history: getHistoryMode(),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // 获取 el-scrollbar 组件的滚动位置
      const scrollbar = document.querySelector('.el-scrollbar__wrap');
      const scrollLeft = scrollbar.scrollLeft;
      const scrollTop = scrollbar.scrollTop;
      
      // 将滚动位置保存到目标路由的 meta 属性中
      to.meta.scrollPosition = { scrollLeft, scrollTop };
      // 返回一个 Promise，用于异步回滚到顶端
      return new Promise((resolve) => {
        // 滚动到顶端
        scrollbar.scrollLeft = 0;
        scrollbar.scrollTop = 0;
        // 在回滚完成后解析 Promise 
        setTimeout(() => {
          resolve({ left: 0, top: 0 });
        }, 0);
      });
      
    }
  }
});

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name, meta } = route;
    if (name && router.hasRoute(name) && meta?.backstage) {
      router.removeRoute(name);
      router.options.routes = formatTwoStageRoutes(
        formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
      );
    }
  });
  usePermissionStoreHook().clearAllCachePage();
}

/** 路由白名单 */
// const whiteList = ["/","/home","/search","/browse","/download","/contact"];
const whiteList = ["/","/browse"];

router.beforeEach((to: toRouteType, _from, next) => {
  useUserStoreHook().loginByUsername({ username: "admin", password: "admin123" }).then(res => {
    if (res.success) {
      // 获取后端路由
      initRouter().then(() => {
      });
    }
  });
  if (to.meta?.keepAlive) {
    const newMatched = to.matched;
    handleAliveRoute(newMatched, "add");
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "Redirect") {
      handleAliveRoute(newMatched);
    }
  }
  const userInfo = storageSession().getItem<DataInfo<number>>(sessionKey);
  NProgress.start();
  const externalLink = isUrl(to?.name as string);
  if (!externalLink) {
    to.matched.some(item => {
      if (!item.meta.title) return "";
      const Title = getConfig().Title;
      if (Title)
        document.title = `${transformI18n(item.meta.title)} | ${Title}`;
      else document.title = transformI18n(item.meta.title);
    });
  }
  /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }

  if (userInfo) {
    // 无权限跳转403页面
    if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
      next({ path: "/error/403" });
    }
    if (_from?.name) {
      // name为超链接
      if (externalLink) {
        openLink(to?.name as string);
        NProgress.done();
      } else {
        toCorrectRoute();
      }
    } else {
      // 刷新
      if (
        usePermissionStoreHook().wholeMenus.length === 0 &&
        to.path !== "/"
      )
        initRouter().then((router: Router) => {
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const { path } = to;
            const route = findRouteByPath(
              path,
              router.options.routes[0].children
            );
            // query、params模式路由传参数的标签页不在此处处理
            if (route && route.meta?.title) {
              useMultiTagsStoreHook().handleTags("push", {
                path: route.path,
                name: route.name,
                meta: route.meta
              });
            }
          }
          next(_from.fullPath)
          // router.push(to.fullPath);
        });
      toCorrectRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(to.fullPath)
        useUserStoreHook().loginByUsername({ username: "admin", password: "admin123" }).then(res => {
          if (res.success) {
            // 获取后端路由
            initRouter().then(() => {
              // next(_from.fullPath)
              // router.push("/");
              // message("登录成功", { type: "success" });
            });
          }
        });
        // next({ path: "/login" });
      }
    } else {
      // console.log("to7",to);
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
