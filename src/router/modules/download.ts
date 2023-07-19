import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/download",
  name: "Download",
  component: Layout,
  redirect: "/download",
  meta: {
    icon: "simCardDownloadOutline",
    title: "Download",
    rank: 4
  },
  children: [
    {
      path: "/download",
      name: "Download",
      component: () => import("@/views/download/index.vue"),
      meta: {
        title: "Download"
      }
    }
  ]
} as RouteConfigsTable;
