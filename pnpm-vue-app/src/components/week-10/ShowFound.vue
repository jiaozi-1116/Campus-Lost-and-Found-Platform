<template>
  <div class="img-container">
    <img
        style="margin-top: 50px;margin-right: 10px"
        src="./image/img1.png"
    />
    <img
        style="margin-top: 50px;height: 200px"
        src="./image/img3.jpeg"
    />
  </div>

  <div style="display: flex;justify-content: center;margin-top: 20px">
    <el-card class="box-card">

      <template #header>
        <div class="card-header">
          <span>筛选条件</span>
          <el-button class="button" type="text" @click="filterItems">筛选</el-button>
        </div>
      </template>

      <div style="display: flex;flex-wrap: wrap;">
        <p>失物类别：</p>
        <el-select v-model="selectedValue" placeholder="请选择" style="margin-top: 10px;margin-right: 50px">
          <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>

        <p>拾获日期：</p>
        <div class="demo-range" style="margin-top: 10px;margin-right: 200px">

          <el-date-picker
              v-model="dateRange"
              is-range
              type="daterange"
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time"
              :picker-options="{firstDayOfWeek: 1}"
              @change="handleChange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
          />
        </div>

        <p>拾取地点：</p>
        <div>
          <el-input v-model="address" placeholder="Please input address" clearable style="margin-top: 10px;margin-right: 20px"/>
        </div>

        <p style="margin-left: 50px;margin-right: 20px">关键字：</p>
        <div>
          <el-input v-model="keyword" placeholder="Please input" clearable style="margin-top: 10px"/>
        </div>

      </div>

      <!--      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>-->
    </el-card>


  </div>

  <div class="card-container" style="margin-left: 60px">
    <el-card
        v-for="cardata in currentCards"
        :key="cardata.id"
        :body-style="{ padding: '0px'}"
        style="width: 400px;margin: 30px 100px 0px 0px"
        @click="handleCardClick(cardata)"
    >
      <!--        v-bind:src="cardata.image"-->
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
import { ElSelect, ElOption } from 'element-plus'
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

const options = [
  { label: '学习用品类', value: '学习用品类' },
  { label: '移动设备类', value: '移动设备类' },
  { label: '服饰类', value: '服饰类' },
  { label: '生活用品类', value: '生活用品类' },
  { label: '贵重物品类', value: '贵重物品类' },
  { label: '其他', value: '其他' },
]

const router = useRouter(); // 路由实例

const handleCardClick = (cardata) => {
  // 导航到目标页面，并传递选中的卡片对象作为参数
  router.push({ path: '/card/' + cardata.id });
  // router.push({ path: '/card/', query: { data: JSON.stringify(cardata) } });
};

const dateRange = ref([]);
const getImageUrl = (imagePath) => {
  const timestamp = Date.now();
  return `http://localhost:8080/image/${encodeURIComponent(imagePath)}` +  '?timestamp=' + timestamp;
};

function handleChange(range) {
  // if(!range || range.length === 0){
  //   dateRange.value = [];
  // }
  // console.log("选择的日期区间", range);
  // // 将日期区间转换为指定格式
  // const startDate = formatDate(new Date(range[0]));
  // const endDate = formatDate(new Date(range[1]));
  // console.log("开始时间", startDate);
  // console.log("结束时间", endDate);

  const DEFAULT_START_DATE = "2000-01-01";
  console.log("选择的日期区间", range);

  if (range && range.length >= 2) {
    const startDate = formatDate(new Date(range[0]));
    const endDate = formatDate(new Date(range[1]));
    console.log("开始时间", startDate);
    console.log("结束时间", endDate);
  } else {
    // dateRange.value[0] = ref([])
    // dateRange.value[1] = ref([])
    console.log(range);
    console.log("日期区间无效");
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

const address = ref('')
const selectedValue = ref('')
const keyword = ref('')

const data = ref([]);

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

const filterItems = () => {
  const filters = {
    category: selectedValue.value,
    // date: dateRange.value.join(' To '),
    startDate: dateRange.value[0],
    endDate: dateRange.value[1],
    location: address.value,
    keyword: keyword.value,
  };

  axios.post('http://localhost:8080/found/find', filters)
      .then(response => {
        data.value = response.data;
        // 处理返回的符合条件的失物数据
      })
      .catch(error => {
        // 处理请求错误
      });
};


</script>




<style scoped>

.img-container {
  display: flex;
  justify-content: center;
}

.img-container img {
  max-width: 100%;
  height: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1045px;
}

.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}

</style>