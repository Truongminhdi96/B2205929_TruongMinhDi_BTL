// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// User pages
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import SachDetail from './views/SachDetail.vue';
import UserBorrow from './views/User/UserBorrow.vue';

// Admin pages
import AdminSach from './views/Admin/AdminSach.vue';
import AddBook from './views/Admin/AddBook.vue';
import BookList from './views/Admin/BookList.vue';
import AdminDocGia from './views/Admin/AdminDocGia.vue';
import UserProfile from './views/User/UserProfile.vue';
// NXB pages
import AdminNXB from './views/Admin/AdminNXB.vue';
import AddNXB from './views/Admin/AddNXB.vue';

const routes = [
  // User routes
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/sach/:id', component: SachDetail },
  { path: '/user/borrow', component: UserBorrow },

  // Admin sách
  { path: '/admin/sach', component: AdminSach, meta: { requiresAuth: true } },
  { path: '/admin/sach/add', component: AddBook, meta: { requiresAuth: true } },
  { path: '/admin/sach/list', component: BookList, meta: { requiresAuth: true } },
  { path: '/admin/docgia', component: AdminDocGia, meta: { requiresAuth: true } },
   { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },

  // Admin NXB
  { path: '/admin/nxb', component: AdminNXB, meta: { requiresAuth: true } },      // danh sách NXB
  { path: '/admin/nxb/add', component: AddNXB, meta: { requiresAuth: true } },    // thêm NXB
];

const router = createRouter({ 
  history: createWebHistory(), 
  routes 
});

// Route guard kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // giả sử token lưu ở localStorage
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // nếu chưa login, chuyển về trang login
  } else {
    next(); // nếu đã login hoặc không cần auth
  }
});

export default router;
