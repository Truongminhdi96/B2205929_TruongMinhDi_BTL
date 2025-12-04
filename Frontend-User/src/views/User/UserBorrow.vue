<template>
  <div>
    <h3>Lịch sử mượn</h3>
    <table class="table">
      <thead><tr><th>Sách</th><th>Ngày yêu cầu</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
      <tbody>
        <tr v-for="r in records" :key="r._id">
          <td>{{ r.maSach.tenSach }}</td>
          <td>{{ new Date(r.ngayYeuCau).toLocaleDateString() }}</td>
          <td>{{ r.trangThai }}</td>
          <td>
            <button v-if="r.trangThai==='cho_duyet'" class="btn btn-danger btn-sm" @click="cancel(r._id)">Hủy</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import API from '../../api/api';
export default {
  data(){ return { records: [] } },
  async mounted(){
    const res = await API.get('/theodoi/my');
    this.records = res.data;
  },
  methods:{
    async cancel(id){ await API.post(`/theodoi/${id}/cancel`); this.records = this.records.filter(r=>r._id!==id); }
  }
}
</script>
