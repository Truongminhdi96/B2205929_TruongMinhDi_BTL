import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import SachDetail from './views/SachDetail.vue';
import UserBorrow from './views/User/UserBorrow.vue';
import AdminSach from './views/Admin/AdminSach.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/sach/:id', component: SachDetail },
  { path: '/user/borrow', component: UserBorrow },
  { path: '/admin/sach', component: AdminSach }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
