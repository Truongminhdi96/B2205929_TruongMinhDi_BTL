<template>
  <div class="container py-3">

    <h3 class="section-title">📖 Quản lý mượn – trả</h3>

    <div class="card p-3">
      <table class="table align-middle">
        <thead class="table-light">
          <tr>
            <th>Độc giả</th>
            <th>Sách</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="r in records" :key="r._id">

            <td class="fw-semibold">
              {{ r.maDocGia.hoLot }} {{ r.maDocGia.ten }}
            </td>

            <td>{{ r.maSach.tenSach }}</td>

            <td>{{ format(r.ngayMuon) }}</td>
            <td>{{ format(r.ngayTra) }}</td>

            <td>
              <span class="badge rounded-pill bg-warning" v-if="r.trangThai==='cho_duyet'">Chờ duyệt</span>
              <span class="badge rounded-pill bg-primary" v-if="r.trangThai==='da_duoc_muon'">Đang mượn</span>
              <span class="badge rounded-pill bg-success" v-if="r.trangThai==='da_tra'">Đã trả</span>
              <span class="badge rounded-pill bg-danger" v-if="r.trangThai==='bi_huy'">Hủy</span>
            </td>

            <td>
              <button 
                class="btn btn-success btn-sm me-2" 
                v-if="r.trangThai==='cho_duyet'"
                @click="confirmBorrow(r._id)">
                ✔ Duyệt
              </button>

              <button 
                class="btn btn-info btn-sm"
                v-if="r.trangThai==='da_duoc_muon'"
                @click="confirmReturn(r._id)">
                🔄 Trả sách
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
