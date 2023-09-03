// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
import LoginForm from "./components/LoginForm.vue";
import DashBoard from "./components/DashBoard.vue"; 
import RouteIndex1 from "./components/RouteIndex1.vue";
import RouteIndex2 from "./components/RouteIndex2.vue"; 

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dash", name: "Dashboard", component: DashBoard },
  { path: "/RouteIndex1", name: "RouteIndex1", component: RouteIndex1 },
  { path: "/RouteIndex2", name: "RouteIndex2", component: RouteIndex2 },
  // You can add more routes here
  {
    path: "/dash",
    name: "DashBoard", // This should match the route name in the ThemeSwitcher
    component: DashBoard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
