<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Tên sách</label>
      <input v-model="book.TenSach" required />
    </div>
    <div>
      <label>Số Quyển</label>
      <input type="number" v-model.number="book.SoQuyen" required />
    </div>
    <button type="submit">{{ isEdit ? "Cập nhật" : "Thêm sách" }}</button>
  </form>
</template>

<script>
export default {
  props: {
    isEdit: { type: Boolean, default: false },
    initialData: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      book: { ...this.initialData, TenSach: "", SoQuyen: 1 },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.book);
    },
  },
};
</script>
