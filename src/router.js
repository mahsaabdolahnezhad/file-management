// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
import LoginForm from "./components/LoginForm.vue";
import DashBoard from "./components/DashBoard.vue"; 
import UserManage from "./components/UserManage.vue";
import UserGroupManage from "./components/UserGroupManage.vue";
import StorageSpace from "./components/StorageSpace.vue"; 
 import FileManagement from "./components/FileManagement.vue"; 
 

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dash", name: "Dashboard", component: DashBoard },
  { path: "/UserManage", name: "UserManage", component: UserManage },
  {
    path: "/UserGroupManage",
    name: "UserGroupManage",
    component: UserGroupManage,
  },
  { path: "/StorageSpace", name: "StorageSpace", component: StorageSpace },
  {
    path: "/FileManagement",
    name: "FileManagement",
    component: FileManagement,
  },
  {
    path: "/dash",
    name: "DashBoard",
    component: DashBoard,
  },
  {
    path: "/dashboard/file-management/:username", // Add a route parameter for the username
    name: "FileManagement",
    component: FileManagement,
  },
  {
    path: "/StorageSpace/:username",
    name: "StorageSpace",
    component: StorageSpace,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
