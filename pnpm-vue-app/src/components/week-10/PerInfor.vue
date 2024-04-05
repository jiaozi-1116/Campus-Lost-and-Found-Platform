<template>

  <div>
    <h1 style="margin-top: 50px;font-size: 2em;">Person Information</h1>
    <div v-if="userInfo">
      <div  style="margin-bottom: 20px"><el-text style="font-size: 20px;"> ID:{{ userInfo.id }}</el-text></div>
      <div style="margin-bottom: 20px"><el-text style="font-size: 20px;">姓名：{{ userInfo.name }}</el-text></div>
      <div style="margin-bottom: 20px"><el-text style="font-size: 20px;">性别：{{ userInfo.gender }}</el-text></div>
      <div style="margin-bottom: 20px"><el-text style="font-size: 20px;">生日：{{ userInfo.birth }}</el-text></div>
      <div style="margin-bottom: 20px"><el-text style="font-size: 20px;">邮箱：{{ userInfo.email }}</el-text></div>
      <div style="margin-bottom: 20px"><el-text style="font-size: 20px;">电话：{{ userInfo.phone }}</el-text></div>
    </div>

    <el-button style="margin-top: 20px" @click="handleEdit(userInfo)">修改信息</el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="dialogType">
    <el-form :model="tableform">
      <el-form-item label="名称" :label-width="120">
        <el-input v-model="tableform.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获/丢失地点" :label-width="120">
        <el-input v-model="tableform.gender" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获/丢失日期" :label-width="120">
        <el-date-picker
            v-model="tableform.birth"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="描述" :label-width="120">
        <el-input v-model="tableform.email" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="类别" :label-width="120">
        <el-input v-model="tableform.phone" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        确定
      </el-button>
    </span>
    </template>
  </el-dialog>

  <h1 style="margin-top: 50px;font-size: 2em;">我的发布</h1>

  <div>
    <el-card
        v-for="cardata in data"
        :key="cardata.id"
        :body-style="{ padding: '0px'}"
        style="margin-top: 20px"

    >
<!--      @click="handleCardClick(cardata)"-->
      <!--        v-bind:src="cardata.photo"-->
      <!--    :src= getImageUrl(cardata.image)-->
      <img
          class="image"
      />
      <div style="padding: 14px">
        <!--          描述-->
        <span style="word-wrap: break-word;">{{cardata.des}}</span>
        <div class="bottom">
          <!--            发布时间-->
          <time class="time">{{cardata.time}}</time>
          <!--            状态-->
          <el-button text class="button">{{cardata.status}}</el-button>
          <el-button @click="delect(cardata.id)">删除</el-button>
        </div>
      </div>

    </el-card>


  </div>



</template>

<script setup>
import { useStore } from 'vuex';

import {onMounted, ref} from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";

const data = ref([]);
const store = useStore();
// const userInfo = ref({});
const userInfo = ref(null); // 创建响应式的 userInfo 对象

const getData = () => {
  const username = store.state.username;
  axios.get(`http://localhost:8080/api/user/${username}`)
      .then(response => {
        userInfo.value= response.data; // 将数据库中的内容赋值给cardContent
        // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
        // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
      })
      .catch(error => {
        console.error(error);
      });
};

onMounted(async () => {
  // 获取存储的 username
  const username = store.state.username;

  try {
    // 发送请求到后端查询相关信息
    const response = await axios.get(`http://localhost:8080/api/user/${username}`);
    userInfo.value = response.data; // 返回的用户信息对象

    // 处理获取到的用户信息，将其显示在页面上
    console.log(userInfo);
  } catch (error) {
    console.error(error);
    // 处理错误情况
  }

  const useID = userInfo.value.id;
  axios.get(`http://localhost:8080/found/my/${useID}`)
      .then(response => {
        data.value= response.data; // 将数据库中的内容赋值给cardContent
        console.log(data)
        // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
        // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
      })
      .catch(error => {
        console.error(error);
      });

});

const  getData1 =()=>{
  const useID = userInfo.value.id;
  axios.get(`http://localhost:8080/found/my/${useID}`)
      .then(response => {
        data.value= response.data; // 将数据库中的内容赋值给cardContent
        console.log(data)
        // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
        // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
      })
      .catch(error => {
        console.error(error);
      });
}

const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({})//初始化弹窗表单数据
let dialogType = ref('修改信息')//初始化弹窗类型为增加弹窗

const handleAdd = () => { //箭头函数
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  tableform.value = {} // 清空表单数据
}

const dialogOk = () => {
  dialogFormVisible.value = false
  const userId = tableform.value.id;
  const updatedUser = { ...tableform.value };
  axios.put(`http://localhost:8080/user/${userId}`, updatedUser)
      .then(response => {
        // 处理成功响应
        ElMessage({type: 'success',message: '修改成功!',})
        getData();
      })
      .catch(error => {
        // 处理错误
        console.error('用户更新失败');
        console.error(error);
      });
}

function handleEdit(row) {// 处理编辑按钮点击事件
  dialogFormVisible.value = true
  tableform.value = {...row}
  dialogType.value = 'edit'
}


const delect=(row)=> {
  axios.delete(`http://localhost:8080/found/${row}`)
      .then(response => {
        // 处理删除成功后的逻辑，例如重新加载数据
        getData1();
      })
      .catch(error => {
        console.error(error);
      });
}

// onMounted(() => {
//   const username = store.state.username;
//   // 从数据库获取内容，这里以异步请求为例
//   axios.get(`http://localhost:8080/found/my/${username}`)
//       .then(response => {
//         data.value= response.data; // 将数据库中的内容赋值给cardContent
//         console.log(data)
//         // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
//         // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
//       })
//       .catch(error => {
//         console.error(error);
//       });
// })

</script>

<style scoped>

</style>