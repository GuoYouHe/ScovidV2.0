import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/statistic",
  name: "Statistic",
  component: Layout,
  redirect: "/statistic",
  meta: {
    icon: "pieChart",
    title: "Statistic",
    rank: 3
  },
  children: [
    {
      path: "/statistic",
      name: "Statistic",
      component: () => import("@/views/statistics/index.vue"),
      meta: {
        title: "Statistic"
      }
    }
  ]
} as RouteConfigsTable;
