import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/browse",
  name: "Browse",
  component: Layout,
  redirect: "/browse",
  meta: {
    icon: "monitorIcon",
    title: "Browse",
    rank: 1
  },
  children: [
    {
      path: "/browse/singlecell",
      name: "Singlecell",
      component: () => import("@/views/browse/singlecell/index.vue"),
      meta: {
        title: "Single-cell"
      }
    },
    {
      path: "/bulk",
      name: "Bulk",
      meta: {
        title: "Bulk"
      },
      children: [
        {
          path: "/browse/bulk",
          name: "Covid",
          component: () => import("@/views/browse/bulk/index.vue"),
          meta: {
            title: "COVID-19"
          }
        },
        {
          path: "/browse/other",
          name: "Others",
          component: () => import("@/views/browse/other/index.vue"),
          meta: {
            title: "Other coronaviruses"
          }
        }
      ]
    },
  ]
} as RouteConfigsTable;
