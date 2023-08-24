// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import LoginForm from "./components/LoginForm.vue";
import EmptyPage from "./components/DashBoard.vue"; 

const routes = [
  { path: "/", component: LoginForm },
  { path: "/dash", component: EmptyPage },
  // You can add more routes here
];

const router = new VueRouter({
  routes,
});

export default router;
