import { createRouter, createWebHistory } from "vue-router";
// import DefaultLayout from './layouts/Default.vue'

import homePage from './pages/homePage.vue'
import loginPage from "./pages/loginPage.vue";
import signUp from "./pages/signUp.vue"

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/login",
    component: loginPage,
  },
  {
    path: "/signup",
    component: signUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
