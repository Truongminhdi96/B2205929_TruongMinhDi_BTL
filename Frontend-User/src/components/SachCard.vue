<template>
  <div class="card h-100 p-3">

    <h5 class="fw-bold">{{ sach.TenSach }}</h5>

    <p class="text-muted mb-1">✍️ Tác giả: {{ sach.tacGia }}</p>
    <p class="text-muted mb-1">📅 Năm XB: {{ sach.namXuatBan }}</p>
    <p class="fw-semibold">📦 Số quyển: {{ sach.soQuyen }}</p>

    <router-link
      :to="'/sach/' + sach._id"
      class="btn btn-outline-primary btn-sm mt-3"
    >
      👁 Xem chi tiết
    </router-link>

  </div>
</template>

<style scoped>
.card {
  border-radius: 14px;
  transition: 0.25s;
}

.card:hover {
  transform: translateY(-4px);
}
</style>
