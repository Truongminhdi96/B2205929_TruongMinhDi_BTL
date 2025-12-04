<template>
  <div class="homepage">

    <!-- Banner -->
    <section class="banner d-flex align-items-center text-center text-white">
      <div class="container">
        <h1 class="display-4 fw-bold mb-3">📚 Hệ Thống Cho Mượn Sách</h1>
        <p class="lead mb-4">Tra cứu – mượn sách – quản lý dễ dàng & nhanh chóng</p>
        <router-link class="btn btn-light btn-lg px-4" to="/books">Xem Sách</router-link>
      </div>
    </section>

    <!-- Why Section -->
    <section class="container mt-5">
      <h3 class="text-center mb-4 fw-bold">Tính năng nổi bật</h3>

      <div class="row g-4">

        <div class="col-md-4">
          <div class="feature-card p-4 text-center shadow-sm">
            <h3>🔍</h3>
            <h5 class="fw-bold">Tra cứu nhanh</h5>
            <p>Tìm kiếm sách theo tên, tác giả hoặc năm xuất bản.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="feature-card p-4 text-center shadow-sm">
            <h3>📖</h3>
            <h5 class="fw-bold">Mượn – Trả dễ dàng</h5>
            <p>Gửi yêu cầu mượn chỉ với 1 thao tác, xem lịch sử theo thời gian thực.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="feature-card p-4 text-center shadow-sm">
            <h3>👨‍💼</h3>
            <h5 class="fw-bold">Nguồn sách đa dạng</h5>
            <p>99% sách đều có ở đây</p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.banner {
  background: linear-gradient(120deg, #0d6efd, #6610f2);
  height: 350px;
}
.feature-card {
  background: #fff;
  border-radius: 14px;
  transition: 0.25s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
}
</style>
