<template>
  <div class="p-4">

    <h3 class="mb-4">📚 Quản Lý Theo Dõi Mượn Sách</h3>

    <table class="table table-bordered table-striped align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Độc Giả</th>
          <th>Sách</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả Dự Kiến</th>
          <th>Ngày Trả Thực Tế</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in records" :key="row._id">
          <td>{{ index + 1 }}</td>
          <td>{{ row.MaDocGia?.name }}<br>({{ row.MaDocGia?.Email }})</td>
          <td>{{ row.MaSach?.TenSach }}</td>
          <td>{{ format(row.NgayMuon) }}</td>
          <td>{{ format(row.NgayTra) }}</td>
          <td>{{ row.NgayTraThucTe ? format(row.NgayTraThucTe) : "—" }}</td>

          <td>
            <span class="badge bg-warning text-dark" v-if="row.TrangThai==='Đang xét duyệt'">
              Đang xét duyệt
            </span>
            <span class="badge bg-primary" v-else-if="row.TrangThai==='Đã mượn'">
              Đã mượn
            </span>
            <span class="badge bg-success" v-else>
              Đã trả
            </span>
          </td>

          <td>
            <!-- Duyệt mượn -->
            <button 
              class="btn btn-sm btn-success me-2"
              v-if="row.TrangThai === 'Đang xét duyệt'"
              @click="approve(row)"
            >
              Duyệt
            </button>

            <!-- Trả sách -->
            <button 
              class="btn btn-sm btn-primary"
              v-if="row.TrangThai === 'Đã mượn'"
              @click="returnBook(row)"
            >
              Xác nhận trả
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { records: [] };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/theodoi", {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.records = res.data;
    },

    format(dateStr) {
      return new Date(dateStr).toLocaleDateString("vi-VN");
    },

    async approve(row) {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/theodoi/approve/${row._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Duyệt mượn thành công!");
      this.loadData();
    },

    async returnBook(row) {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/theodoi/return/${row._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Trả sách thành công!");
      this.loadData();
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
}
</style>
