<template>
  <div class="user-borrow p-4">
    <h3>📖 Lịch Sử Mượn Sách</h3>

    <div v-if="borrows.length === 0" class="mt-3">
      Chưa có lịch sử mượn nào
    </div>

    <div class="table-responsive mt-3" v-else>
      <table class="table table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Tên Sách</th>
            <th>Tác Giả</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, index) in borrows" :key="b._id">
            <td>{{ index + 1 }}</td>
            <td>{{ b.MaSach?.TenSach || "Không có" }}</td>
            <td>{{ b.MaSach?.TacGia || "Không có" }}</td>
            <td>{{ formatDate(b.NgayMuon) }}</td>
            <td>{{ b.NgayTra ? formatDate(b.NgayTra) : "Chưa trả" }}</td>
            <td>
              <span v-if="b.NgayTra" class="badge bg-success">Đã trả</span>
              <span v-else class="badge bg-warning text-dark">Chưa trả</span>
            </td>
            <td>
              <button 
                class="btn btn-sm btn-primary" 
                v-if="!b.NgayTra" 
                @click="returnBook(b)"
              >
                Trả sách
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      borrows: [],
    };
  },
  mounted() {
    this.fetchBorrowHistory();
  },
  methods: {
    async fetchBorrowHistory() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
          alert("Vui lòng đăng nhập!");
          this.$router.push("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/theodoi/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.borrows = res.data;
      } catch (err) {
        console.error("Lỗi tải lịch sử mượn:", err.response || err);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN");
    },
    async returnBook(borrow) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `http://localhost:5000/api/theodoi/return/${borrow._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(res.data.message);
        this.fetchBorrowHistory(); // reload lại danh sách
      } catch (err) {
        console.error("Lỗi trả sách:", err.response || err);
        alert(err.response?.data?.message || "Trả sách thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.user-borrow h3 {
  font-weight: 600;
}
.badge {
  font-size: 0.9rem;
}
</style>
