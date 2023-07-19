import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/submit",
  name: "Submit",
  component: Layout,
  redirect: "/submit",
  meta: {
    icon: "postcardIcon",
    title: "Submit",
    rank: 5
  },
  children: [
    {
      path: "/submit",
      name: "Submit",
      component: () => import("@/views/home/contact.vue"),
      meta: {
        title: "Submit"
      }
    }
  ]
} as RouteConfigsTable;
