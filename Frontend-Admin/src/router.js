// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// User pages
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import SachDetail from './views/SachDetail.vue';
import UserBorrow from './views/User/UserBorrow.vue';
import UserProfile from './views/User/UserProfile.vue';

// Admin pages
import AdminSach from './views/Admin/AdminSach.vue';
import AddBook from './views/Admin/AddBook.vue';
import BookList from './views/Admin/BookList.vue';
import AdminDocGia from './views/Admin/AdminDocGia.vue';
import AdminStats from './views/Admin/AdminStats.vue';
import AdminSachEdit from './views/Admin/AdminSachEdit.vue';
// Admin NXB
import AdminNXB from './views/Admin/AdminNXB.vue';
import AddNXB from './views/Admin/AddNXB.vue';

// 📌 Thêm trang Theo dõi mượn sách
import AdminTheoDoi from './views/Admin/AdminTheoDoi.vue';

const routes = [
  // User routes
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/sach/:id', component: SachDetail },
  { path: '/user/borrow', component: UserBorrow, meta: { requiresAuth: true } },
  { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },

  // Admin sách
  { path: '/admin/sach', component: AdminSach, meta: { requiresAuth: true } },
  { path: '/admin/sach/add', component: AddBook, meta: { requiresAuth: true } },
  { path: '/admin/sach/list', component: BookList, meta: { requiresAuth: true } },
 { path: '/admin/stats', component: AdminStats, meta: { requiresAuth: true } },
 { path: '/admin/sach/edit/:id', component: AdminSachEdit, props: true },

  // Admin đọc giả
  { path: '/admin/docgia', component: AdminDocGia, meta: { requiresAuth: true } },

  // Admin NXB
  { path: '/admin/nxb', component: AdminNXB, meta: { requiresAuth: true } },
  { path: '/admin/nxb/add', component: AddNXB, meta: { requiresAuth: true } },

  // 📌 Admin Theo dõi mượn sách (MỚI THÊM)
  { path: '/admin/theodoi', component: AdminTheoDoi, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
