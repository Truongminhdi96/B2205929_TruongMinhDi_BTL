<template>
  <div>
    <h3>Lịch sử mượn sách</h3>

    <table class="table">
      <thead>
        <tr>
          <th>Sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in records" :key="r._id">
          <td>{{ r.maSach.tenSach }}</td>
          <td>{{ r.ngayMuon ? format(r.ngayMuon) : "-" }}</td>
          <td>{{ r.ngayTra ? format(r.ngayTra) : "-" }}</td>

          <td>
            <span class="badge text-bg-warning" v-if="r.trangThai === 'cho_duyet'">Đang chờ duyệt</span>
            <span class="badge text-bg-primary" v-if="r.trangThai === 'da_duoc_muon'">Đang mượn</span>
            <span class="badge text-bg-success" v-if="r.trangThai === 'da_tra'">Đã trả</span>
            <span class="badge text-bg-danger" v-if="r.trangThai === 'bi_huy'">Bị hủy</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import API from "../../api/api";

export default {
  data() {
    return {
      records: [],
    };
  },
  async mounted() {
    const res = await API.get("/theodoi/my");
    this.records = res.data;
  },
  methods: {
    format(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
