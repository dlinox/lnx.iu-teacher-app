import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "group/:id",
    name: "Group",
    component: () => import("@/app/modules/Group/views/GroupView.vue"),
  },
];

export default routes;
