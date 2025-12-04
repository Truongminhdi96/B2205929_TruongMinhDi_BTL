<template>
  <div class="auth-container d-flex justify-content-center align-items-center">

    <div class="auth-card shadow p-4">
      <h3 class="text-center fw-bold mb-3">Đăng ký tài khoản</h3>

      <form @submit.prevent="register">

        <div class="row">
          <div class="col-md-6 mb-3">
            <label>Họ lót</label>
            <input v-model="HoLot" class="form-control" required />
          </div>

          <div class="col-md-6 mb-3">
            <label>Tên</label>
            <input v-model="Ten" class="form-control" required />
          </div>
        </div>

        <div class="mb-3">
          <label>Ngày sinh</label>
          <input v-model="NgaySinh" type="date" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Giới tính</label>
          <select v-model="Phai" class="form-control" required>
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div class="mb-3">
          <label>Địa chỉ</label>
          <input v-model="DiaChi" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Điện thoại</label>
          <input v-model="DienThoai" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Email</label>
          <input v-model="Email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Mật khẩu</label>
          <input v-model="Password" type="password" class="form-control" required />
        </div>

        <button class="btn btn-success w-100 mt-3">Đăng ký</button>
      </form>

      <p class="text-center mt-3">
        Đã có tài khoản?
        <router-link to="/login">Đăng nhập</router-link>
      </p>

    </div>

  </div>
</template>

<script>
import API from "../api/api";

export default {
  data() {
    return {
      HoLot: "",
      Ten: "",
      NgaySinh: "",
      Phai: "",
      DiaChi: "",
      DienThoai: "",
      Email: "",
      Password: ""
    };
  },
  methods: {
    async register() {
      try {
        await API.post("/auth/register", {
          HoLot: this.HoLot,
          Ten: this.Ten,
          NgaySinh: this.NgaySinh,
          Phai: this.Phai,
          DiaChi: this.DiaChi,
          DienThoai: this.DienThoai,
          Email: this.Email,
          Password: this.Password
        });

        alert("Đăng ký thành công!");
        this.$router.push("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Đăng ký thất bại");
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: #eef3ff;
}
.auth-card {
  width: 460px;
  border-radius: 14px;
  background: #fff;
}
</style>
