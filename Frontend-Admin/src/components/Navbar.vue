<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow-sm bg-white py-3">
    <div class="container">

      <router-link class="navbar-brand fw-bold fs-4" to="/">
        <span class="text-primary">Library</span>
      </router-link>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        
        <ul class="navbar-nav ms-auto align-items-center gap-3">

          <li class="nav-item">
            <router-link class="nav-link nav-item-custom" to="/">Home</router-link>
          </li>

          <!-- Chưa đăng nhập -->
          <template v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link nav-item-custom" to="/login">Login</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link nav-item-custom" to="/register">Register</router-link>
            </li>
          </template>

          <!-- Đã đăng nhập -->
          <template v-else>

            <!-- Avatar + Dropdown -->
            <li class="nav-item dropdown">
              <a 
                class="d-flex align-items-center user-menu" 
                href="#" 
                data-bs-toggle="dropdown"
              >
                <img 
                  :src="avatarUrl" 
                  class="user-avatar" 
                  alt="avatar"
                />
                <span class="ms-2 fw-semibold">{{ user.name || user.email }}</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <router-link class="dropdown-item" to="/profile">Hồ sơ</router-link>
                </li>

                <li v-if="isAdmin">
                  <router-link class="dropdown-item" to="/admin/sach"></router-link>
                </li>

                <li><hr class="dropdown-divider" /></li>

                <!-- Nút đăng xuất -->
                <li>
                  <button class="dropdown-item text-danger" @click="logout">
                    Đăng xuất
                  </button>
                </li>

              </ul>
            </li>

          </template>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return { 
      user: null 
    };
  },

  computed: {
    isAdmin() {
      return this.user && this.user.role === "admin";
    },

    avatarUrl() {
      if (this.user && this.user.avatar) {
        return this.user.avatar;
      }

      const letter = (this.user?.name || this.user?.email || "U")[0].toUpperCase();
      return `https://ui-avatars.com/api/?name=${letter}&background=random`;
    }
  },

  created() {
    this.loadUser();
    // Load lại user sau mỗi lần chuyển route
    this.$router.afterEach(() => this.loadUser());
  },

  methods: {
    loadUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login"); // chuyển về login sau khi logout
    }
  }
};
</script>

<style scoped>
.nav-item-custom {
  font-size: 1rem;
  font-weight: 500;
  color: #333 !important;
  transition: 0.2s ease;
}
.nav-item-custom:hover {
  color: #0d6efd !important;
  text-decoration: underline;
}

.user-menu {
  cursor: pointer;
  color: #333;
  text-decoration: none;
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
}
</style>
