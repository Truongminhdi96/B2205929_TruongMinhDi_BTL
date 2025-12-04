<template>
  <div class="auth-container d-flex justify-content-center align-items-center">

    <div class="auth-card shadow p-4">
      <h3 class="text-center fw-bold mb-3">Đăng nhập</h3>
      <p class="text-center text-muted mb-4">Chào mừng quay trở lại!</p>

      <form @submit.prevent="login">

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Nhập email..." required/>
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu..." required/>
        </div>

        <button class="btn btn-primary w-100 mt-3">Đăng nhập</button>
      </form>

      <p class="text-center mt-3">
        Chưa có tài khoản?
        <router-link to="/register">Đăng ký ngay</router-link>
      </p>

    </div>

  </div>
</template>

<script>
import API from "../api/api";

export default {
  data() {
    return { email: "", password: "" };
  },

  methods: {
    async login() {
      try {
        const res = await API.post("/auth/login", {
          Email: this.email,      // ✔ Gửi lên đúng tên backend cần
          Password: this.password
        });

        let user = res.data.user;

        // ✔ Chuẩn hóa Email → email (frontend dùng chữ thường)
        if (user.Email) {
          user.email = user.Email;
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        this.$router.push("/");
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi đăng nhập");
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: #f2f6ff;
}
.auth-card {
  width: 380px;
  border-radius: 14px;
  background: #fff;
}
</style>
