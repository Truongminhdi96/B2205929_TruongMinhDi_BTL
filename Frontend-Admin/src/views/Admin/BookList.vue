<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">📚 Danh sách sách</h2>

    <!-- Loading spinner -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Đang tải danh sách sách...</p>
    </div>

    <!-- Table sách -->
    <div v-else>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>MaSach</th>
            <th>Tên sách</th>
            <th>Đơn giá</th>
            <th>Số Quyển</th>
            <th>Năm XB</th>
            <th>Mã NXB</th>
            <th>Tác giả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>{{ book.MaSach }}</td>
            <td>{{ book.TenSach }}</td>
            <td>{{ book.DonGia }}</td>
            <td>{{ book.SoQuyen }}</td>
            <td>{{ book.NamXuatBan }}</td>
            <td>{{ book.MaNXB }}</td>
            <td>{{ book.TacGia }}</td>
            <td>
              <button class="btn btn-danger btn-sm me-2" @click="handleDelete(book._id)">Xóa</button>
              <button class="btn btn-warning btn-sm" @click="handleEdit(book._id)">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="books.length === 0" class="text-center my-3">
        Không có sách nào.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'BookList',
  setup() {
    const router = useRouter();
    const books = ref([]);
    const loading = ref(true);

    const API_URL = 'http://localhost:5000/api'; // port backend đúng

    const fetchBooks = async () => {
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/sach`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        books.value = res.data;
      } catch (err) {
        console.error('Lỗi tải danh sách sách:', err.response || err);
        alert('❌ Lỗi tải danh sách sách! Kiểm tra console.');
      } finally {
        loading.value = false;
      }
    };

    const handleDelete = async (id) => {
      if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/sach/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Xóa sách thành công!');
        fetchBooks();
      } catch (err) {
        console.error('Lỗi xóa sách:', err.response || err);
        alert('❌ Xóa sách thất bại! Kiểm tra console.');
      }
    };

    const handleEdit = (id) => {
      router.push(`/admin/sach/edit/${id}`); // tạo page edit riêng
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      loading,
      handleDelete,
      handleEdit
    };
  }
};
</script>

<style scoped>
.table {
  background: #fff;
  border-radius: 12px;
}
</style>
