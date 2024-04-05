<template>

  <el-card
      :body-style="{ padding: '0px'}"
      style="width: 900px;margin-top: 50px"
      v-if="data.length > 0"
      @click="handleCardClick(data[data.length - 1])"
  >
    <!--        v-bind:src="data[data.length - 1].photo"-->
    <img
        :src= getImageUrl(data[data.length-1].image)

        class="image"
        style="width: 900px;height: 400px"
    />
    <div style="padding: 14px">
      <!--          描述-->
      <span style="word-wrap: break-word;">{{data[data.length - 1].des}}</span>
      <div class="bottom">
        <!--            发布时间-->
        <time class="time">{{data[data.length - 1].time}}</time>
        <!--            状态-->
        <el-button text class="button">{{data[data.length - 1].status}}</el-button>
      </div>
    </div>
  </el-card>

  <h4 style="font-size: 2em;">
    Featured News
  </h4>

  <div class="card-container">
  <el-card
      v-for="cardata in currentCards"
      :key="cardata.id"
      :body-style="{ padding: '0px'}"
      style="width: 400px;margin: 30px 100px 0px 0px"
      @click="handleCardClick(cardata)"
  >
    <!--        v-bind:src="cardata.photo"-->
    <img
        :src= getImageUrl(cardata.image)
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
      </div>
    </div>
  </el-card>

    <el-pagination
        style="margin-top: 20px"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="data.length"
        @current-change="handlePageChange"
    ></el-pagination>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import axios from "axios";
import {useRouter} from "vue-router";

const currentPage = ref(1);
const pageSize = 6;

const currentCards = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.value.slice(startIndex, endIndex);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const getImageUrl = (imagePath) => {
  const timestamp = Date.now();
  return `http://localhost:8080/image/${encodeURIComponent(imagePath)}` +  '?timestamp=' + timestamp;
};

const data = ref([]);
const selectedCard = ref(null); // 当前选中的卡片对象
const showCardInfo = ref(false); // 控制弹窗的显示与隐藏

// const handleCardClick = (cardata) => {
//   selectedCard.value = cardata;
//   showCardInfo.value = true; // 显示弹窗
// };

const router = useRouter(); // 路由实例

const handleCardClick = (cardata) => {
  // 导航到目标页面，并传递选中的卡片对象作为参数
  router.push({ path: '/card/' + cardata.id });
  // router.push({ path: '/card/', query: { data: JSON.stringify(cardata) } });
};


onMounted(() => {
  // 从数据库获取内容，这里以异步请求为例
  axios.get('http://localhost:8080/found')
      .then(response => {
        data.value= response.data; // 将数据库中的内容赋值给cardContent
        // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
        // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
      })
      .catch(error => {
        console.error(error);
      });
})


</script>



<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 200px;
  display: block;
}

.card-container {
  display: flex;  /* 设置 display 属性值为 flex */
  flex-wrap: wrap;  /* 当子元素宽度超出父元素宽度时换行 */
}
.card-item {
  width: 50%;  /* 设置每个子元素占父元素的宽度为50% */
}
</style>
