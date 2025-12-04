<!-- src/views/Admin/AdminDocGia.vue -->
<template>
  <div class="admin-docgia p-3">
    <h3 class="mb-3">👤 Danh sách Độc Giả</h3>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ Lót</th>
          <th>Tên</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(docgia, index) in docgias" :key="docgia._id">
          <td>{{ index + 1 }}</td>
          <td>{{ docgia.HoLot }}</td>
          <td>{{ docgia.Ten }}</td>
          <td>{{ formatDate(docgia.NgaySinh) }}</td>
          <td>{{ docgia.Phai }}</td>
          <td>{{ docgia.DienThoai }}</td>
          <td>{{ docgia.Email }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="viewDetail(docgia)">Xem chi tiết</button>
          </td>
        </tr>
        <tr v-if="docgias.length === 0">
          <td colspan="8" class="text-center">Chưa có dữ liệu</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal chi tiết -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thông tin độc giả</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Họ Lót:</strong> {{ selectedDocGia.HoLot }}</p>
            <p><strong>Tên:</strong> {{ selectedDocGia.Ten }}</p>
            <p><strong>Ngày sinh:</strong> {{ formatDate(selectedDocGia.NgaySinh) }}</p>
            <p><strong>Giới tính:</strong> {{ selectedDocGia.Phai }}</p>
            <p><strong>Địa chỉ:</strong> {{ selectedDocGia.DiaChi }}</p>
            <p><strong>Điện thoại:</strong> {{ selectedDocGia.DienThoai }}</p>
            <p><strong>Email:</strong> {{ selectedDocGia.Email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgias: [],
      selectedDocGia: {}
    };
  },
  mounted() {
    this.fetchDocGias();
  },
  methods: {
    async fetchDocGias() {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Chưa có token, vui lòng đăng nhập');
          return;
        }

        const res = await axios.get("http://localhost:5000/api/docgia", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.docgias = res.data;
      } catch (err) {
        console.error("Lỗi tải danh sách độc giả:", err);
      }
    },
    viewDetail(docgia) {
      this.selectedDocGia = docgia;
      const modal = new bootstrap.Modal(document.getElementById("detailModal"));
      modal.show();
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("vi-VN");
    }
  }
};
</script>

<style scoped>
.admin-docgia {
  max-width: 1000px;
  margin: auto;
}
</style>
