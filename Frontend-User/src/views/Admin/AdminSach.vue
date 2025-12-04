<template>
  <div class="container py-3">

    <h3 class="section-title">📚 Quản lý sách</h3>

    <!-- Form thêm sách -->
    <div class="card p-3 mb-4">
      <h5 class="mb-3">Thêm sách mới</h5>

      <form @submit.prevent="add">
        <div class="row g-3">

          <div class="col-md-4">
            <input v-model="form.tenSach" class="form-control" placeholder="Tên sách" />
          </div>

          <div class="col-md-3">
            <input v-model="form.tacGia" class="form-control" placeholder="Tác giả" />
          </div>

          <div class="col-md-2">
            <input v-model="form.namXuatBan" class="form-control" placeholder="Năm XB" type="number" />
          </div>

          <div class="col-md-2">
            <input v-model="form.soQuyen" class="form-control" placeholder="Số quyển" type="number" />
          </div>

          <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-primary mt-2">➕ Thêm sách</button>
          </div>

        </div>
      </form>
    </div>

    <!-- Danh sách sách -->
    <div class="row g-3">
      <div class="col-md-3" v-for="item in sach" :key="item._id">
        <div class="card h-100 p-3">

          <h5>{{ item.tenSach }}</h5>
          <p class="text-muted mb-1">Tác giả: {{ item.tacGia }}</p>
          <p class="text-muted mb-1">Năm XB: {{ item.namXuatBan }}</p>
          <p class="fw-bold">Số quyển: {{ item.soQuyen }}</p>

          <button class="btn btn-danger btn-sm mt-2" @click="remove(item._id)">
            🗑 Xóa
          </button>

        </div>
      </div>
    </div>

  </div>
</template>
