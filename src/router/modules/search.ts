import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/search",
  name: "Search",
  component: Layout,
  redirect: "/search",
  meta: {
    icon: "outlineSearch",
    title: "Search",
    rank: 2
  },
  children: [
    {
      path: "/search",
      name: "Search",
      component: () => import("@/views/search/index.vue"),
      meta: {
        title: "Search"
      }
    }
  ]
} as RouteConfigsTable;
