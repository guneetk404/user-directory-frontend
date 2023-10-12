import { createRouter, createWebHistory } from "vue-router";
// import DefaultLayout from './layouts/Default.vue'

import homePage from './pages/homePage.vue'
import loginPage from "./pages/loginPage.vue";
import signUp from "./pages/signUp.vue"
import adminPage from "./pages/adminPage.vue"
import userprofile from "./pages/userProfile.vue"
import TheNavbar from './components/TheNavbar.vue'
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
  {
    path:"/admin",
    component:adminPage
  },
  {
    path:'/profile',
    component:userprofile
  },
  {
    path:'/nav',
    component:TheNavbar
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
