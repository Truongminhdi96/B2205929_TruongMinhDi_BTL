<template>
  <div class="book-list p-4">
    <h3>📚 Danh sách Sách</h3>

    <!-- Thanh tìm kiếm -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
        v-model="searchQuery"
      />
    </div>

    <div v-if="filteredBooks.length === 0">Chưa có sách nào</div>

    <div class="row g-3 mt-3">
      <div class="col-md-4" v-for="book in filteredBooks" :key="book._id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ book.TenSach }}</h5>
            <p class="card-text">Tác giả: {{ book.TacGia }}</p>
            <p class="card-text">Năm xuất bản: {{ book.NamXuatBan }}</p>
            <p class="card-text">Đơn giá: {{ formatPrice(book.DonGia) }}</p>
            <p class="card-text">Số lượng: {{ book.SoQuyen || 0 }}</p>

            <!-- Input chọn ngày trả -->
            <div class="mt-2">
              <label>Ngày trả:</label>
              <input
                type="date"
                v-model="book.NgayTra"
                class="form-control form-control-sm"
                :min="today"
              />
            </div>

            <div class="mt-3">
              <button class="btn btn-success btn-sm" @click="borrowBook(book)">
                Mượn
              </button>
            </div>

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
      books: [],
      searchQuery: "",
      today: new Date().toISOString().split("T")[0] // YYYY-MM-DD, dùng làm min cho input date
    };
  },
  mounted() {
    this.fetchBooks();
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) return this.books;
      const q = this.searchQuery.toLowerCase();
      return this.books.filter(
        book =>
          (book.TenSach && book.TenSach.toLowerCase().includes(q)) ||
          (book.TacGia && book.TacGia.toLowerCase().includes(q))
      );
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get("http://localhost:5000/api/sach");
        this.books = res.data;
      } catch (err) {
        console.error("Lỗi tải sách:", err);
      }
    },
    formatPrice(value) {
      if (!value) return "0 đ";
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    async borrowBook(book) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
          alert("Vui lòng đăng nhập trước khi mượn sách!");
          return;
        }

        if (user.role !== "docgia") {
          alert("Chỉ độc giả mới có thể mượn sách!");
          return;
        }

        if (!book.NgayTra) {
          alert("Vui lòng chọn ngày trả!");
          return;
        }

        const selectedDate = new Date(book.NgayTra);
        const now = new Date();
        now.setHours(0,0,0,0); // reset giờ
        if (selectedDate <= now) {
          alert("Ngày trả phải sau hôm nay!");
          return;
        }

        const res = await axios.post(
          "http://localhost:5000/api/muonsach",
          {
            MaDocGia: user.id,
            MaSach: book._id,
            NgayTra: book.NgayTra // gửi lên backend
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        alert(res.data.message);
        book.SoQuyen -= 1; // Cập nhật số lượng ngay frontend

      } catch (err) {
        console.error("Lỗi mượn sách:", err.response || err);
        alert(err.response?.data?.message || "Mượn sách thất bại!");
      }
    }
  }
};
</script>

<style scoped>
.book-list .card {
  border-radius: 12px;
  transition: 0.2s ease;
}
.book-list .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
}
</style>
