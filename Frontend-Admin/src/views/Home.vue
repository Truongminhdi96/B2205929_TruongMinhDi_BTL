<template>
  <div class="admin-dashboard container py-4">

    <h1 class="mb-4 text-center fw-bold">📊 Admin Dashboard</h1>

    

    <!-- Quản lý sách -->
    <section class="mb-5">
      <h3 class="mb-3">📚 Quản lý Sách</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-primary" @click="goTo('admin/sach/add')">Thêm sách mới</button>
        <button class="btn btn-secondary" @click="goTo('admin/sach')">Xem danh sách sách</button>
      </div>
      <p>Quản lý thông tin sách và số lượng (SốQuyen)</p>
    </section>

    <!-- Quản lý Nhà Xuất Bản -->
    <section class="mb-5">
      <h3 class="mb-3">🏢 Quản lý Nhà Xuất Bản</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-primary" @click="goTo('admin/nxb/add')">Thêm NXB mới</button>
        <button class="btn btn-secondary" @click="goTo('admin/nxb')">Xem danh sách NXB</button>
      </div>
      <p>Thêm, sửa, xóa NXB và liên kết sách với NXB qua MaNXB</p>
    </section>

    <!-- Quản lý độc giả -->
    <section class="mb-5">
      <h3 class="mb-3">👤 Quản lý Độc Giả</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-primary" @click="goTo('admin/docgia')">Xem danh sách độc giả</button>
      </div>
      <p>Xem thông tin chi tiết độc giả</p>
    </section>

    <!-- Theo dõi mượn -->
    <section class="mb-5">
      <h3 class="mb-3">📘 Theo dõi mượn sách</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-primary" @click="goTo('admin/theodoi')">Xem theo dõi mượn sách</button>
      </div>
      <p>Ghi nhận và theo dõi mượn trả. Thống kê số lượt mượn theo thời gian.</p>
    </section>
    <!-- Thống kê -->
    <section class="mb-5">
      <h3 class="mb-3">📈 Thống kê tổng quan</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-primary" @click="goTo('admin/stats')">Xem thống kê</button>
      </div>
      <p>Xem tổng số sách, tổng độc giả, lượt mượn theo tháng và biểu đồ trực quan.</p>
    </section>

  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  methods: {
    goTo(path) {
      this.$router.push(`/${path}`);
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  background: #f8f9fa;
  min-height: 100vh;
  border-radius: 14px;
  padding: 2rem;
}
section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.05);
}
button {
  min-width: 140px;
}
</style>
