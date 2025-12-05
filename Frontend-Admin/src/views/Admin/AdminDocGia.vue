<template>
  <div class="admin-docgia p-3">
    <h3 class="mb-3">👤 Danh sách Độc Giả</h3>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ Lót</th>
          <th>Tên</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Đang mượn</th>
          
        </tr>
      </thead>

      <tbody>
        <tr v-for="(docgia, index) in docgias" :key="docgia._id">
          <td>{{ index + 1 }}</td>
          <td>{{ docgia.HoLot }}</td>
          <td>{{ docgia.Ten }}</td>
          <td>{{ docgia.DienThoai }}</td>
          <td>{{ docgia.Email }}</td>

          <!-- Số sách đang mượn -->
          <td>
            <span class="badge bg-primary">{{ docgia.soLuongDangMuon }}</span>
          </td>

         
        </tr>

        <tr v-if="docgias.length === 0">
          <td colspan="8" class="text-center">Chưa có dữ liệu</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgias: []
    };
  },

  mounted() {
    this.fetchDocGias();
  },

  methods: {
    // Lấy danh sách độc giả + số lượng sách đang mượn
    async fetchDocGias() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/docgia", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Gọi API đếm số sách đang mượn cho từng độc giả
        for (let dg of res.data) {
          const countRes = await axios.get(
            `http://localhost:5000/api/theodoi/countBorrow/${dg._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          dg.soLuongDangMuon = countRes.data.count;
        }

        this.docgias = res.data;
      } catch (err) {
        console.error("Lỗi tải danh sách độc giả:", err);
      }
    },

    // Khóa / Mở khóa tài khoản
    async toggleLock(docgia) {
      try {
        const token = localStorage.getItem("token");

        const newStatus = docgia.TrangThai === "Hoạt động" ? "Bị khóa" : "Hoạt động";

        await axios.put(
          `http://localhost:5000/api/docgia/lock/${docgia._id}`,
          { TrangThai: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert(`Đã cập nhật: ${newStatus}`);
        this.fetchDocGias();
      } catch (err) {
        alert("Không thể cập nhật trạng thái!");
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.admin-docgia {
  max-width: 1000px;
  margin: auto;
}
</style>
