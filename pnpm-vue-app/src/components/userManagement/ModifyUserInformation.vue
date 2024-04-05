<template>
  <div>
    <h2>修改用户信息</h2>
    <form @submit.prevent="updateUser">
      <div>
        <label for="username">用户名:</label>
        <input id="username" type="text" v-model="user.username" required>
      </div>
      <div>
        <label for="email">邮箱:</label>
        <input id="email" type="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input id="password" type="password" v-model="user.password" required>
      </div>
      <button type="submit">更新</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const userId = ref(''); // 要修改的用户ID
    const user = reactive({}); // 当前用户信息

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

    const updateUser = () => {
      axios.put(`/api/users/${userId.value}`, user)
          .then(() => {
            alert('更新用户信息成功！');
          })
          .catch((err) => {
            console.log(err);
            alert('更新用户信息失败，请检查输入信息！');
          });
    };

    return { userId, user, fetchUser, updateUser };
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
