<template>
  <div class="add-book p-3">
    <h3>📚 Thêm Sách Mới</h3>
    <form @submit.prevent="handleSubmit">

      <div class="mb-3">
        <label>Tên Sách</label>
        <input v-model="TenSach" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Tác Giả</label>
        <input v-model="TacGia" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Đơn Giá</label>
        <input v-model.number="DonGia" type="number" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Số Quyển</label>
        <input v-model.number="SoQuyen" type="number" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Năm Xuất Bản</label>
        <input v-model.number="NamXuatBan" type="number" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Nhà Xuất Bản</label>
        <select v-model="selectedNXBId" class="form-control" required>
          <option value="" disabled>Chọn NXB</option>
          <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
            {{ nxb.TenNXB }}
          </option>
        </select>
      </div>

      <button class="btn btn-success" type="submit">Thêm Sách</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBook",
  data() {
    return {
      TenSach: "",
      TacGia: "",
      DonGia: 0,
      SoQuyen: 0,
      NamXuatBan: new Date().getFullYear(),
      selectedNXBId: "",
      nxbList: [],
    };
  },
  methods: {
    fetchNXB() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/nxb", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => {
          this.nxbList = res.data;
        })
        .catch((err) => {
          console.error("Lỗi tải danh sách NXB:", err.response?.data || err);
        });
    },

    handleSubmit() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }
      if (!this.selectedNXBId) {
        alert("Vui lòng chọn Nhà Xuất Bản!");
        return;
      }

      const bookData = {
        TenSach: this.TenSach,
        TacGia: this.TacGia,
        DonGia: this.DonGia,
        SoQuyen: this.SoQuyen,
        NamXuatBan: this.NamXuatBan,
        MaNXB: this.selectedNXBId,
      };

      axios
        .post("http://localhost:5000/api/sach", bookData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Thêm sách thành công!");
          this.$router.push("/admin/sach");
        })
        .catch((err) => {
          console.error("Lỗi khi thêm sách:", err.response?.data || err);
          alert("Không thể thêm sách!");
        });
    },
  },
  mounted() {
    this.fetchNXB();
  },
};
</script>
