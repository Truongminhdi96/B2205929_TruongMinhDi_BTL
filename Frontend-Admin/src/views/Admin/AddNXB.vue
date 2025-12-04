<template>
  <div class="add-nxb p-3">
    <h3>Thêm Nhà Xuất Bản mới</h3>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Tên NXB</label>
        <input v-model="TenNXB" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Địa Chỉ</label>
        <input v-model="DiaChi" type="text" class="form-control" required />
      </div>
      <button class="btn btn-success" type="submit">Thêm NXB</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddNXB",
  data() {
    return {
      TenNXB: "",
      DiaChi: "",
    };
  },
  methods: {
    handleSubmit() {
      const token = localStorage.getItem("token"); // lấy token đã login
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      axios
        .post(
          "http://localhost:5000/api/nxb",
          {
            TenNXB: this.TenNXB,
            DiaChi: this.DiaChi,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // gửi token trong header
            },
          }
        )
        .then((res) => {
          alert("Thêm NXB thành công!");
          this.$router.push("/admin/nxb"); // quay về danh sách
        })
        .catch((err) => {
          console.error("Lỗi khi thêm NXB:", err.response?.data || err);
          alert("Không thể thêm NXB!");
        });
    },
  },
};
</script>
