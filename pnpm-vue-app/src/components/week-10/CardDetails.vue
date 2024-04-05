<template>
  <div style="margin-left: 30px">
    <h1 style="margin-top: 50px;font-size: 2em;">Card Details</h1>
    <div>
      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px;">物品ID：{{ cardData.id }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px">物品名称：{{ cardData.name }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px">拾取地址：{{ cardData.address }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px">拾取时间：{{ cardData.time }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px">描述：{{ cardData.des }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text style="font-size: 20px">图片：</el-text>
        <img
            style="width: 600px"
            v-if="cardData"
            :src= getImageUrl(cardData.image)
        />
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="cardData" style="font-size: 20px">状态：{{ cardData.status }}</el-text>
      </div>

      <p>----------------------</p>

      <div style="margin-bottom: 20px">
        <el-text v-if="users" style="font-size: 20px">发布者ID：{{ users.id }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="users" style="font-size: 20px">发布者姓名：{{ users.name }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="users" style="font-size: 20px">发布者邮箱：{{ users.email }}</el-text>
      </div>

      <div style="margin-bottom: 20px">
        <el-text v-if="users" style="font-size: 20px">发布者电话：{{ users.phone }}</el-text>
      </div>

      </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";

const router = useRouter();
const route = useRoute();


onMounted(() => {
  fetchData()

});

const getImageUrl = (imagePath) => {
  const timestamp = Date.now();
  return `http://localhost:8080/image/${encodeURIComponent(imagePath)}` +  '?timestamp=' + timestamp;
};

const cardData = ref(null);
const fetchData = async () => {
  try {
    const cardId = route.params.id;
    const response = await axios.get(`http://localhost:8080/foundShow/${cardId}`)
        .then(res => {
          return res;
        }).catch(error => {
          console.log(error);
        });
    const data = response.data;
    console.log(data);
    cardData.value = data;
    getUserData();
  } catch (error) {
    console.log(error)
  }
}

// fetchData();

// async function fetchData() {
//   try {
//
//     cardData.value = response.data;
//     // console.log(cardData.value.id); // 确保在获取数据后访问
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// fetchData();

const users = ref(null)


// async function userData() {
//   try {
//     const Id = cardData.value.userId
//     const response = await axios.get(`http://localhost:8080/userById/${Id}`);
//     users.value = response.data;
//     console.log(cardData.value); // 确保在获取数据后访问
//   } catch (error) {
//     // console.error(error);
//   }
// }
//
// userData();

// onMounted(() => {
//   getUserData()
// });
const getUserData = () => {
  console.log('cardData.value:', cardData.value);

  if (cardData.value && cardData.value.userId) {
    const Id = cardData.value.userId;
    // 调用后端接口获取用户数据
    axios.get(`http://localhost:8080/userById/${Id}`)
        .then(response => {
          console.log('response.data:', response.data);
          users.value = response.data;
          console.log('users.value:', users.value);
        })
        .catch(error => {
          console.error(error);
        });
  }
};


</script>

<style scoped>

</style>