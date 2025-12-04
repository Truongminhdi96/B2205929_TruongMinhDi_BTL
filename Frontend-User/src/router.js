import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import SachDetail from './views/SachDetail.vue';
import UserBorrow from './views/User/UserBorrow.vue';
import AdminSach from './views/Admin/AdminSach.vue';
import NotFound from './views/NotFound.vue';
import BookList from './views/User/BookList.vue';
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/sach/:id', name: 'SachDetail', component: SachDetail },
  { path: '/user/borrow', name: 'UserBorrow', component: UserBorrow, meta: { requiresAuth: true } },
  { path: '/admin/sach', name: 'AdminSach', component: AdminSach, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // fallback 404
  { path: '/books', component: BookList },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // admin/user

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Login' });
  }

  if (to.meta.requiresAdmin && role !== 'admin') {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
