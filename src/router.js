// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
import LoginForm from "./components/LoginForm.vue";
import DashBoard from "./components/DashBoard.vue"; 
import RouteIndex1 from "./components/RouteIndex1.vue";
import RouteIndex2 from "./components/RouteIndex2.vue";
import RouteIndex3 from "./components/RouteIndex3.vue"; 
 import RouteIndex4 from "./components/RouteIndex4.vue"; 

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dash", name: "Dashboard", component: DashBoard },
  { path: "/RouteIndex1", name: "RouteIndex1", component: RouteIndex1 },
  { path: "/RouteIndex2", name: "RouteIndex2", component: RouteIndex2 },
  { path: "/RouteIndex3", name: "RouteIndex3", component: RouteIndex3},
  { path: "/RouteIndex4", name: "RouteIndex4", component: RouteIndex4 },
  {
    path: "/dash",
    name: "DashBoard",
    component: DashBoard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
