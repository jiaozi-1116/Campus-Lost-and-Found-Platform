<template>
  <div>
    <h2>添加用户</h2>
    <form @submit.prevent="addUser">
      <div>
        <label for="username">用户名:</label>
        <input id="username" type="text" v-model="username" required>
      </div>
      <div>
        <label for="email">邮箱:</label>
        <input id="email" type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input id="password" type="password" v-model="password" required>
      </div>
      <button type="submit">添加</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const addUser = () => {
      const newUser = { username: username.value, email: email.value, password: password.value };
      axios.post('/api/users', newUser)
          .then(() => {
            alert('添加用户成功！');
            username.value = '';
            email.value = '';
            password.value = '';
          })
          .catch((err) => {
            console.log(err);
            alert('添加用户失败，请检查输入信息！');
          });
    };

    return { username, email, password, addUser };
  },
};
</script>
