<template>
  <div>
    <h2>删除用户</h2>
    <p>你确定要删除用户 {{ user.username }} 吗？</p>
    <button @click="showDeleteModal = true">删除</button>

    <!-- 确认删除的弹窗 -->
    <div v-if="showDeleteModal">
      <div class="modal">
        <h3>确认删除</h3>
        <p>你确定要删除用户 {{ user.username }} 吗？</p>
        <button @click="deleteUser">确认</button>
        <button @click="showDeleteModal = false">取消</button>
      </div>
      <div class="overlay" @click="showDeleteModal = false"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const userId = ref(''); // 要删除的用户ID
    const user = reactive({}); // 当前用户信息
    const showDeleteModal = ref(false); // 是否显示确认删除的弹窗

    const fetchUser = () => {
      axios.get(`/api/users/${userId.value}`)
          .then((res) => {
            user.username = res.data.username;
            user.email = res.data.email;
            user.password = res.data.password;
          })
          .catch((err) => {
            console.log(err);
            alert('获取用户信息失败，请稍后再试！');
          });
    };

    const deleteUser = () => {
      axios.delete(`/api/users/${userId.value}`)
          .then(() => {
            alert('删除用户成功！');
            showDeleteModal.value = false;
          })
          .catch((err) => {
            console.log(err);
            alert('删除用户失败，请稍后再试！');
          });
    };

    return { userId, user, showDeleteModal, fetchUser, deleteUser };
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0px 2px 10px gray;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
