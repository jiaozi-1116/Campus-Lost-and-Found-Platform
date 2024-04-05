<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="1" @click="navigateToHome">LOGO</el-menu-item>

    <el-menu-item index="3"  style="margin-left: 30px"  @click="navigateToLostItems">寻物</el-menu-item>
    <el-menu-item index="4"  style="margin-left: 30px" @click="navigateToFoundItems">招领</el-menu-item>

    <div class="space"></div> <!-- 这是用于增加距离的空白元素 -->

    <div class="search-container">
      <el-input
          @click="handleSearch"
          v-model="searchText"
          placeholder="请输入搜索内容"
          @keyup.enter.native="handleSearch"
          style="height: 40px;width: 400px"
      />

      <el-button type="primary" @click="handleSearch" style="height: 40px;margin-left: 30px">搜索</el-button>
    </div>

    <div class="flex-grow" />

    <el-menu-item index="5"   style="margin-right: 60px">欢迎来到 yy失物招领平台</el-menu-item>

    <el-sub-menu index="2"  style="margin-right: 60px">
      <template #title>发布</template>
      <el-menu-item index="2-1" @click="handleAdd">寻物启事</el-menu-item>
      <el-menu-item index="2-2" @click="handleAdd1">失物招领</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>我的</template>
      <el-menu-item index="3-1" @click="handlePer">个人信息</el-menu-item>
      <el-menu-item index="3-2" @click="handleEdit">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>


  <!--弹窗组件-->
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form :model="tableform">
      <el-form-item label="名称" :label-width="120">
        <el-input v-model="tableform.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获/丢失地点" :label-width="120">
        <el-input v-model="tableform.address" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获/丢失日期" :label-width="120">
        <el-date-picker
            v-model="tableform.time"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="描述" :label-width="120">
        <el-input v-model="tableform.des" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="图片" :label-width="120">
<!--        <el-upload-->
<!--            ref="upload"-->
<!--            action="http://localhost:8080/upload"-->
<!--        :on-success="handleUploadSuccess"-->
<!--            :before-upload="beforeUpload"-->
<!--        :file-list="fileList"-->
<!--        list-type="picture-card"-->
<!--        :auto-upload="false"-->
<!--        :show-file-list="false"-->
<!--        >-->
<!--        <i class="el-icon-plus"></i>-->
<!--        </el-upload>-->
        <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:8080/upload"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            @success="handleUploadSuccess"
        >
          <template #trigger>
            <el-button type="primary" style="margin-right: 5px">选择文件</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload">
            上传文件
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="类别" :label-width="120">
        <el-input v-model="tableform.category" autocomplete="off"/>
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
</template>




<script lang="ts" setup>
import {computed, ref} from 'vue'
import axios from "axios";
import {ElMessage, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {genFileId} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const searchText = ref([])



const handleSearch = (val) => {
  if(val.length>0){
    axios.get(`http://localhost:8080/foundByName/${val}`).then(response=>{
      data.value=response.data
    }).catch(error=>{
      console.error(error)
    })
  }else {
    getData()
  }
}

// 导航到寻物页面
const navigateToLostItems = () => {
  router.push({ path: 'lost' });
};

const navigateToFoundItems = () => {
  router.push({ path: 'found' });
}

const navigateToHome = () => {
  router.push({ path: 'itemHome' });
};

const handleEdit = () => {
  router.push('/');
};

const handlePer = () => {
  router.push({path:'person'});
};

const data = ref([]);
const upload = ref<UploadInstance>()

// const tableform = ref({});
const fileList = ref([]);

const getData = () => {
  axios.get('http://localhost:8080/found')
      .then(response => {
        data.value= response.data; // 将数据库中的内容赋值给cardContent
        // this.cardImage = response.data.imageURL; // 将数据库中的图片URL赋值给cardImage
        // this.cardDate = response.data.date;      // 将数据库中的日期赋值给cardDate
      })
      .catch(error => {
        console.error(error);
      });
};

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({})//初始化弹窗表单数据
let dialogType = ref('lost')//初始化弹窗类型为增加弹窗

const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'lost' ? '发布寻物启示' : '发布失物招领'
})

const handleAdd = () => { //箭头函数
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  dialogType.value = 'lost' // 设置对话框的类型为 "add"
  tableform.value = {} // 清空表单数据
}

const handleAdd1 = () => { //箭头函数
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  dialogType.value = 'found' // 设置对话框的类型为 "add"
  tableform.value = {} // 清空表单数据
}
//创建弹窗确定按钮事件dialogOk
const dialogOk = () => {
  // tableform.value.image = fileList.value[0].response.url; // 将图片的 URL 存储到 tableform 对象中的 image 属性中

  // axios.post('http://localhost:8080/upload')
  //     .then(response => {
  //       // 处理成功响应
  //       tableform.value.image= response.data; // 获取后端接口返回的数据
  //       console.log(tableform.value.image); // 打印响应数据
  //       // 其他操作...
  //     })
  //     .catch(error => {
  //       // 处理错误
  //       console.log(error);
  //     });

  tableform.value.status = "未领取"
  dialogFormVisible.value = false
  if (dialogType.value === 'lost') {
    const newUser = { ...tableform.value }
    console.log(newUser)
    axios.post('http://localhost:8080/lost/add', newUser)
        .then(response => {// 处理成功响应
          ElMessage({type: 'success',message: '添加成功!',})
          getData(); // 在添加数据后调用获取数据的方法
        })
        .catch(error => {// 处理错误
          console.log(error);
        });
  }else {
    const newUser = { ...tableform.value }
    console.log(newUser)
    axios.post('http://localhost:8080/found/add', newUser)
        .then(response => {// 处理成功响应
          ElMessage({type: 'success',message: '添加成功!',})
          getData(); // 在添加数据后调用获取数据的方法
        })
        .catch(error => {// 处理错误
          console.log(error);
        });
  }
}

const handleUploadSuccess = (response, file, fileList) => {
  // 上传成功回调函数
  // fileList.value = fileList;
  console.log(response);
  tableform.value.image = response;
};





</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space {
  margin-left: 90px; /* 调整为您需要的距离值 */
}
</style>
