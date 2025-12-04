<template>
  <div class="auth-container d-flex justify-content-center align-items-center">

    <div class="auth-card shadow p-4">
      <h3 class="text-center fw-bold mb-3">Đăng nhập Admin</h3>
      <p class="text-center text-muted mb-4">Nhập MSNV và mật khẩu để đăng nhập</p>

      <form @submit.prevent="login">

        <div class="mb-3">
          <label class="form-label">MSNV</label>
          <input v-model="msnv" type="text" class="form-control" placeholder="Nhập MSNV..." required/>
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu..." required/>
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button class="btn btn-primary w-100 mt-3">Đăng nhập</button>
      </form>
    </div>

  </div>
</template>

<script>
import API from "../api/api";

export default {
  data() {
    return {
      msnv: "",
      password: "",
      error: ""  // lưu lỗi login
    };
  },

 methods: {
  async login() {
    this.error = ""; // reset lỗi
    if (!this.msnv || !this.password) {
      this.error = "Vui lòng nhập MSNV và mật khẩu!";
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        MSNV: this.msnv,      // gửi đúng field backend
        Password: this.password
      });

      let user = res.data.user;

      // Chuẩn hóa tên trường cho frontend
      if (user.HoTenNV) user.name = user.HoTenNV;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển tới Home.vue
      this.$router.push("/");
    } catch (err) {
      // Hiển thị lỗi từ backend hoặc mặc định
      this.error = err.response?.data?.message || "Đăng nhập thất bại!";
    }
  },
}

};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: #f2f6ff;
}
.auth-card {
  width: 400px;
  border-radius: 14px;
  background: #fff;
}
</style>
