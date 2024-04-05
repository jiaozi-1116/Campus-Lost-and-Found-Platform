<template>
  <div class="login">
    <h1>Register</h1>
    <form>
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="name" type="text" placeholder="姓名" required  />
      <input v-model="gender" type="text" placeholder="性别" required />
      <el-date-picker
          v-model="birth"
          type="date"
          placeholder="生日"
          :size="'large'"
      />
      <input v-model="email" type="text" placeholder="邮箱" required />
      <input v-model="phone" type="text" placeholder="电话" required />
      <button type="submit" @click="Register">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";

// 设置默认的用户名和密码
// 响应式数据
const username = ref('')
const password = ref('');
const name = ref('');
const gender = ref('');
const birth = ref(null);
const email = ref('');
const phone = ref('');

const router = useRouter();

const Register = async () => {
  // 收集表单数据
  const formData = {
    username: username.value,
    password: password.value,
    name: name.value,
    gender: gender.value,
    birth: birth.value,
    email: email.value,
    phone: phone.value,
  };

  axios.post('http://localhost:8080/user', formData)
      .then(response => {// 处理成功响应
        ElMessage({type: 'success',message: '注册成功!',})
        router.push({path:'/'})
        // getData(); // 在添加数据后调用获取数据的方法
      })
      .catch(error => {// 处理错误
        console.log(error);
        ElMessage({type: 'error',message: '注册失败!',})
      });
};


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
}

.login button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
