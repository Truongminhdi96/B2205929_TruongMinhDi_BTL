<template>
  <div class="container py-4">

    <h3 class="mb-4 text-center">📚 Quản lý Sách</h3>

    <!-- Form thêm sách -->
    <div class="card p-3 mb-4 shadow-sm">
      <h5 class="mb-3">➕ Thêm sách mới</h5>
      <form @submit.prevent="addBook">
        <div class="row g-3">

          <div class="col-md-3">
            <input v-model="form.MaSach" class="form-control" placeholder="Mã sách" required />
          </div>

          <div class="col-md-4">
            <input v-model="form.TenSach" class="form-control" placeholder="Tên sách" required />
          </div>

          <div class="col-md-3">
            <input v-model="form.TacGia" class="form-control" placeholder="Tác giả / Nguồn gốc" required />
          </div>

          <div class="col-md-2">
            <input v-model.number="form.NamXuatBan" class="form-control" type="number" placeholder="Năm XB" required />
          </div>

          <div class="col-md-2">
            <input v-model.number="form.SoQuyen" class="form-control" type="number" placeholder="Số quyển" required />
          </div>

          <div class="col-md-2">
            <input v-model.number="form.DonGia" class="form-control" type="number" placeholder="Đơn giá" required />
          </div>

          <div class="col-md-3">
            <input v-model="form.MaNXB" class="form-control" placeholder="Mã NXB" />
          </div>

          <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-primary mt-2">Thêm sách</button>
          </div>

        </div>
      </form>
    </div>

    <!-- Danh sách sách -->
    <div class="row g-3">
      <div class="col-md-4" v-for="item in sach" :key="item._id">
        <div class="card h-100 p-3 shadow-sm">
          <h5>{{ item.TenSach }} ({{ item.MaSach }})</h5>
          <p class="text-muted mb-1">Tác giả / Nguồn gốc: {{ item.TacGia || 'Chưa có' }}</p>
          <p class="text-muted mb-1">Đơn giá: {{ item.DonGia || 0 }}₫</p>
          <p class="text-muted mb-1">Năm XB: {{ item.NamXuatBan || 'Chưa có' }}</p>
          <p class="text-muted mb-1">Số quyển: {{ item.SoQuyen || 0 }}</p>
          <p class="text-muted mb-1">Mã NXB: {{ item.MaNXB || 'Chưa có' }}</p>

          <button class="btn btn-danger btn-sm mt-2" @click="removeBook(item._id)">
            🗑 Xóa
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "AdminSach",
  setup() {
    const sach = reactive([]);
    const form = reactive({
      MaSach: '',
      TenSach: '',
      TacGia: '',
      NamXuatBan: new Date().getFullYear(),
      SoQuyen: 1,
      DonGia: 0,
      MaNXB: ''
    });

    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sach');
        sach.splice(0, sach.length, ...res.data);
      } catch (err) {
        console.error('Lỗi tải danh sách sách:', err.response?.data || err);
        alert('❌ Lỗi tải danh sách sách!');
      }
    };

    const addBook = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5000/api/sach', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        sach.push(res.data);
        alert('✅ Thêm sách thành công!');
        // Reset form
        form.MaSach = '';
        form.TenSach = '';
        form.TacGia = '';
        form.NamXuatBan = new Date().getFullYear();
        form.SoQuyen = 1;
        form.DonGia = 0;
        form.MaNXB = '';
      } catch (err) {
        console.error('Lỗi thêm sách:', err.response?.data || err);
        alert('❌ Lỗi thêm sách!');
      }
    };

    const removeBook = async (id) => {
      if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/sach/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const index = sach.findIndex(b => b._id === id);
        if (index !== -1) sach.splice(index, 1);
        alert('✅ Xóa sách thành công!');
      } catch (err) {
        console.error('Lỗi xóa sách:', err.response?.data || err);
        alert('❌ Lỗi xóa sách!');
      }
    };

    onMounted(fetchBooks);

    return { sach, form, addBook, removeBook };
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
