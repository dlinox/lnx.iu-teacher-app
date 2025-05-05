import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "groups",
    name: "GroupsView",
    component: () => import("@/app/modules/Group/views/GroupView.vue"),
  },
  {
    path: "group/:id",
    name: "GroupDetailsView",
    component: () => import("@/app/modules/Group/views/GroupDetailsView.vue"),
  },
];

export default routes;
