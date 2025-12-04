<template>
  <div class="admin-sach p-3">
    <h3 class="mb-3">📚 Danh sách Sách</h3>

    <button class="btn btn-success mb-2" @click="$router.push('/admin/sach/add')">
      Thêm Sách Mới
    </button>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
         
        
          <th>Tên Sách</th>
          <th>Tác Giả</th>
          <th>Đơn Giá</th>
          <th>Số Quyển</th>
          <th>Năm Xuất Bản</th>
          <th>Nhà Xuất Bản</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="book._id">
         
          
          <td>{{ book.TenSach }}</td>
          <td>{{ book.TacGia }}</td>
          <td>{{ book.DonGia }}</td>
          <td>{{ book.SoQuyen }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>{{ book.MaNXB ? book.MaNXB.TenNXB : "Chưa có NXB" }}</td>
          <td>
            <button class="btn btn-sm btn-warning" @click="editBook(book._id)">Sửa</button>
            
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="books.length === 0" class="text-muted">Không có sách nào!</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminSach",
  data() {
    return {
      books: [],
    };
  },
  methods: {
    fetchBooks() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/sach", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => {
          console.log("Danh sách sách:", res.data); // kiểm tra dữ liệu
          this.books = res.data;
        })
        .catch((err) => {
          console.error("Lỗi tải danh sách sách:", err.response?.data || err);
          alert("Không thể tải danh sách sách!");
        });
    },

    editBook(id) {
      this.$router.push(`/admin/sach/edit/${id}`);
    },

    deleteBook(id) {
      if (!confirm("Bạn có chắc muốn xóa sách này?")) return;

      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/sach/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Xóa sách thành công!");
          this.fetchBooks();
        })
        .catch((err) => {
          console.error("Lỗi xóa sách:", err.response?.data || err);
          alert("Không thể xóa sách!");
        });
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.admin-sach {
  padding: 20px;
}
</style>
