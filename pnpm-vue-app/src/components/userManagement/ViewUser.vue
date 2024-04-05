<template>
  <div>
    <h2>用户列表</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>用户名</th>
        <th>邮箱</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userList" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <router-link :to="{ name: 'EditUser', params: { id: user.id }}">编辑</router-link>
          <button @click="deleteUser(user.id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const userList = ref([]); // 用户列表

    const fetchUserList = () => {
      axios.get('/api/users')
          .then((res) => {
            userList.value = res.data;
          })
          .catch((err) => {
            console.log(err);
            alert('获取用户列表失败，请稍后再试！');
          });
    };

    const deleteUser = (id) => {
      if (confirm(`你确定要删除用户 ${id} 吗？`)) {
        axios.delete(`/api/users/${id}`)
            .then(() => {
              alert(`删除用户 ${id} 成功！`);
              fetchUserList();
            })
            .catch((err) => {
              console.log(err);
              alert(`删除用户 ${id} 失败，请稍后再试！`);
            });
      }
    };

    return { userList, fetchUserList, deleteUser };
  },
  mounted() {
    this.fetchUserList();
  },
};
</script>
