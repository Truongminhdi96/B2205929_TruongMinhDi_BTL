<template>
  <div class="admin-sach-edit p-3">
    <h3 class="mb-3">✏️ Chỉnh sửa sách</h3>

    <form @submit.prevent="updateBook">
      <div class="mb-3">
        <label class="form-label">Tên Sách</label>
        <input type="text" class="form-control" v-model="book.TenSach" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Tác Giả</label>
        <input type="text" class="form-control" v-model="book.TacGia" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Đơn Giá</label>
        <input type="number" class="form-control" v-model="book.DonGia" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Số Quyển</label>
        <input type="number" class="form-control" v-model="book.SoQuyen" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Năm Xuất Bản</label>
        <input type="number" class="form-control" v-model="book.NamXuatBan" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Nhà Xuất Bản</label>
        <input type="text" class="form-control" v-model="TenNXB">
      </div>

      <button type="submit" class="btn btn-primary">Cập nhật</button>
      <button type="button" class="btn btn-secondary ms-2" @click="$router.push('/admin/sach')">Hủy</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      book: {},
      TenNXB: "", // field trung gian cho Nhà Xuất Bản
    };
  },
  mounted() {
    this.fetchBook();
  },
  methods: {
    async fetchBook() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/sach/${this.id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        this.book = res.data;
        this.TenNXB = this.book.MaNXB ? this.book.MaNXB.TenNXB : "";
      } catch (err) {
        console.error(err);
        alert("Không tải được thông tin sách!");
      }
    },
    async updateBook() {
      try {
        const token = localStorage.getItem("token");

        // Cập nhật TenNXB vào book trước khi gửi
        if (!this.book.MaNXB) this.book.MaNXB = {};
        this.book.MaNXB.TenNXB = this.TenNXB;

        await axios.put(`http://localhost:5000/api/sach/${this.id}`, this.book, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cập nhật thành công!");
        this.$router.push("/admin/sach");
      } catch (err) {
        console.error(err);
        alert("Cập nhật thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.admin-sach-edit {
  padding: 20px;
}
</style>
