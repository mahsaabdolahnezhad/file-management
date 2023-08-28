// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import LoginForm from "./components/LoginForm.vue";
import EmptyPage from "./components/DashBoard.vue"; 
import RouteIndex1 from "./components/RouteIndex1.vue";
import RouteIndex2 from "./components/RouteIndex2.vue"; 

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dash", component: EmptyPage },
  { path: "/RouteIndex1", name: "RouteIndex1", component: RouteIndex1 },
  { path: "/RouteIndex2", name: "RouteIndex2", component: RouteIndex2 },
  // You can add more routes here
];

const router = new VueRouter({
  routes,
});

export default router;
