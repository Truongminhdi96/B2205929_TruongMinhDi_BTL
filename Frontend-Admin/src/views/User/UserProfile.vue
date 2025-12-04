<template>
  <div class="profile p-4">
    <h3>👤 Thông tin cá nhân</h3>

    <div class="card p-3 mt-3" style="max-width: 500px;">
      <div class="text-center">
        <img :src="avatarUrl" class="rounded-circle mb-3" style="width: 100px; height: 100px;" />
      </div>
      <p><strong>Họ tên:</strong> {{ user.HoTenNV || user.name }}</p>
      <p v-if="user.Chucvu"><strong>Chức vụ:</strong> {{ user.Chucvu }}</p>
      <p v-if="user.SoDienThoai"><strong>Số điện thoại:</strong> {{ user.SoDienThoai }}</p>
      <p v-if="user.Diachi"><strong>Địa chỉ:</strong> {{ user.Diachi }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    avatarUrl() {
      if (this.user && this.user.avatar) return this.user.avatar;
      const letter = (this.user?.HoTenNV || this.user?.name || 'U')[0].toUpperCase();
      return `https://ui-avatars.com/api/?name=${letter}&background=random`;
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) this.$router.push('/login'); // nếu chưa login, chuyển về login
  },
};
</script>

<style scoped>
.profile img {
  border: 2px solid #ddd;
  object-fit: cover;
}
</style>
