<template>
  <div class="admin-nxb p-3">
    <h3 class="mb-3">📋 Quản lý Nhà Xuất Bản</h3>

   

    <!-- Danh sách NXB -->
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã NXB</th>
          <th>Tên NXB</th>
          <th>Địa Chỉ</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nxb, index) in nxbList" :key="nxb._id">
          <td>{{ index + 1 }}</td>
          <td>{{ nxb._id }}</td>
          <td>{{ nxb.TenNXB }}</td>
          <td>{{ nxb.DiaChi }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" @click="editNXB(nxb)">Sửa</button>
         
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="nxbList.length === 0" class="text-muted">Chưa có NXB nào!</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminNXB",
  data() {
    return {
      nxbList: [],
      newTenNXB: "",
      newDiaChi: "",
    };
  },
  methods: {
    getToken() {
      return localStorage.getItem("token");
    },

    fetchNXB() {
      const token = this.getToken();
      axios
        .get("http://localhost:5000/api/nxb", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => {
          this.nxbList = res.data;
        })
        .catch((err) => {
          console.error("Lỗi tải NXB:", err.response?.data || err);
          alert("Không thể tải danh sách NXB!");
        });
    },

    addNXB() {
      const token = this.getToken();
      if (!this.newTenNXB || !this.newDiaChi) {
        alert("Vui lòng điền đầy đủ tên và địa chỉ NXB!");
        return;
      }

      axios
        .post(
          "http://localhost:5000/api/nxb",
          { TenNXB: this.newTenNXB, DiaChi: this.newDiaChi },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert("Thêm NXB thành công!");
          this.newTenNXB = "";
          this.newDiaChi = "";
          this.fetchNXB();
        })
        .catch((err) => {
          console.error("Lỗi thêm NXB:", err.response?.data || err);
          alert("Không thể thêm NXB!");
        });
    },

    editNXB(nxb) {
      const token = this.getToken();
      const newTen = prompt("Sửa tên NXB:", nxb.TenNXB);
      const newDiaChi = prompt("Sửa địa chỉ NXB:", nxb.DiaChi);
      if (newTen && newDiaChi) {
        axios
          .put(
            `http://localhost:5000/api/nxb/${nxb._id}`,
            { TenNXB: newTen, DiaChi: newDiaChi },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert("Cập nhật NXB thành công!");
            this.fetchNXB();
          })
          .catch((err) => {
            console.error("Lỗi cập nhật NXB:", err.response?.data || err);
            alert("Không thể cập nhật NXB!");
          });
      }
    },

    deleteNXB(id) {
      const token = this.getToken();
      if (!confirm("Bạn có chắc muốn xóa NXB này?")) return;

      axios
        .delete(`http://localhost:5000/api/nxb/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Xóa NXB thành công!");
          this.fetchNXB();
        })
        .catch((err) => {
          console.error("Lỗi xóa NXB:", err.response?.data || err);
          alert("Không thể xóa NXB!");
        });
    },
  },
  mounted() {
    this.fetchNXB();
  },
};
</script>

<style scoped>
.admin-nxb {
  padding: 20px;
}
.me-1 {
  margin-right: 5px;
}
</style>
