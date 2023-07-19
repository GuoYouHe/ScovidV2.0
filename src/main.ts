import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus";
import { useI18n } from "@/plugins/i18n";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import { useEcharts } from "@/plugins/echarts";
import { injectResponsiveStorage } from "@/utils/responsive";
import { useTable } from './plugins/vxe-table'


// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'

// import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

// import $ from 'jquery';


import axios from "axios";
const { VITE_PORT } = import.meta.env;
//修改axios默认路径
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:80' : 'http://bio-annotation.cn/scovid2_api'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://bio-annotation.cn/scovid2_api' : 'http://bio-annotation.cn/scovid2_api'

// 配置访问本地资源路径,上传服务器后将路径改为服务器路径 即vue端口
const staticUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:' + `${VITE_PORT}` + "/" : 'http://bio-annotation.cn/scovid/'

//文件下载默认路径

const filldownload = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:80' : 'http://bio-annotation.cn/scovid2_api';

const app = createApp(App);

// 将变量挂载到vue实例上,全局使用
window.$staticUrl = staticUrl;
window.$filldownload = filldownload;
// 自定义指令
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);



// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);



// 使用animate.css的方式
import "animate.css/animate.min.css";
// 使用wow中animate的方式
import "wow.js/css/libs/animate.css";

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  app.use(MotionPlugin)
    .use(useI18n)
    .use(ElementPlus)
    .use(useEcharts)
    .use(useTable);
  // .use(VXETable);
  // .use(Table);
  // .use(PureDescriptions);
  app.mount("#app");
});
