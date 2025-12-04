<template>
  <div>
    <h3>{{ sach?.TenSach }}</h3>
    <p>Tác giả: {{ sach?.tacGia }}</p>
    <p>NXB: {{ sach?.MaNXB?.tenNXB }}</p>
    <p>Số quyển: {{ sach?.soQuyen }}</p>
    <button v-if="isLogged && isDocGia" class="btn btn-primary" @click="requestBorrow">Yêu cầu mượn</button>
    <p v-else-if="!isLogged">Đăng nhập để mượn</p>
  </div>
</template>

<script>
import API from '../api/api';
export default {
  data(){ return { sach: null } },
  computed(){
    const u = JSON.parse(localStorage.getItem('user'));
    return { isLogged: !!localStorage.getItem('token'), isDocGia: u && u.role === 'docgia' };
  },
  async mounted(){
    const res = await API.get(`/sach/${this.$route.params.id}`);
    this.sach = res.data;
  },
  methods:{
    async requestBorrow(){
      try{
        await API.post('/theodoi/request', { maSach: this.sach._id });
        alert('Yêu cầu đã gửi');
      }catch(err){ alert(err.response?.data?.message || err.message) }
    }
  }
}
</script>
