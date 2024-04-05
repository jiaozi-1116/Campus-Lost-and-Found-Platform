<template>
  <div class="login">
    <h1>Login</h1>
    <select v-model="userType" id="userType" style="height: 30px;width: 60px;margin-bottom: 30px">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <form>
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" @click="login">Login</button>
      <button type="submit" @click="register">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
const store = useStore();

// 设置默认的用户名和密码
const username = ref('');
const password = ref('');
const router = useRouter();
const userType = ref('user'); // 默认选择用户登录

const login = async () => {
  if (userType.value === 'user'){
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username: username.value,
        password: password.value,
      });
      console.log(response.data); // 登录成功的响应
      const loginData = {
        username: username.value,
        password: password.value
      };
      localStorage.setItem("loginData",JSON.stringify(loginData))
      await store.dispatch('setUserName', username.value);
      ElMessage.success('登录成功！');

      await router.push({path: '/home'})
      // 处理登录成功的逻辑，如跳转到其他页面
    } catch (error) {
      console.error(error); // 输出完整的错误信息
      if (error.response && error.response.data) {
        console.error(error.response.data); // 登录失败的响应
      }

      ElMessage.error('登录失败！');
      // 处理登录失败的逻辑，如显示错误消息
      // let errorMessage;
      // errorMessage.value = '登录失败，请检查用户名和密码。'; // 将错误消息传递给页面显示
    }
  }else if (userType.value === 'admin'){
    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        username: username.value,
        password: password.value,
      });
      console.log(response.data); // 登录成功的响应
      const loginData = {
        username: username.value,
        password: password.value
      };
      localStorage.setItem("loginData",JSON.stringify(loginData))
      // await store.dispatch('setUserName', username.value);
      ElMessage.success('登录成功！');

      await router.push({path: '/admin'})
      // 处理登录成功的逻辑，如跳转到其他页面
    } catch (error) {
      console.error(error); // 输出完整的错误信息
      if (error.response && error.response.data) {
        console.error(error.response.data); // 登录失败的响应
      }

      ElMessage.error('登录失败！');
      // 处理登录失败的逻辑，如显示错误消息
      // let errorMessage;
      // errorMessage.value = '登录失败，请检查用户名和密码。'; // 将错误消息传递给页面显示
    }
  }




};
const register = async () => {
  await router.push({path: '/register'})
}

</script>

<style>
/*.login {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*  margin-top: 100px;*/
/*}*/

/*h1 {*/
/*  margin-bottom: 20px;*/
/*}*/

/*form {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/

/*input {*/
/*  margin-bottom: 10px;*/
/*  padding: 5px;*/
/*}*/

/*button {*/
/*  padding: 8px 16px;*/
/*}*/

/*.error {*/
/*  color: red;*/
/*  margin-top: 10px;*/
/*}*/

.login {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
  margin: 100px auto 0;
  background-image: url("../week-10/image/cool-background.png");
}

.login h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login input[type="text"],
.login input[type="password"] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login button[type="submit"] {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 20px;
}

.login button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
