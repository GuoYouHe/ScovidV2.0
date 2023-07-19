import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
// import HomeFilled from "@iconify-icons/ep/home-filled";
import HomeFilled from "@iconify-icons/material-symbols/home-outline-rounded";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import OutlineSearch from '@iconify-icons/ic/outline-search';
import MonitorIcon from '@iconify-icons/ep/monitor';
import PieChart from '@iconify-icons/ep/pie-chart';
import SimCardDownloadOutline from '@iconify-icons/material-symbols/sim-card-download-outline';
import PostcardIcon from '@iconify-icons/ep/postcard';


addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("outlineSearch", OutlineSearch);
addIcon("monitorIcon", MonitorIcon);
addIcon("pieChart", PieChart);
addIcon("simCardDownloadOutline", SimCardDownloadOutline);
addIcon("postcardIcon", PostcardIcon);