<template>
  <div class="img-container">
    <img
        style="margin-top: 50px;margin-right: 10px"
        src="./image/img1.png"
    />
    <img
        style="margin-top: 50px;height: 200px"
        src="./image/img2.png"
    />
  </div>

  <!--弹窗组件-->
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form :model="tableform">
      <el-form-item label="名称" :label-width="100">
        <el-input v-model="tableform.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获地点" :label-width="100">
        <el-input v-model="tableform.address" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="拾获日期" :label-width="100">
        <el-date-picker
            v-model="tableform.time"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="描述" :label-width="100">
        <el-input v-model="tableform.des" autocomplete="off"/>
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

<script setup>

import {computed, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({})//初始化弹窗表单数据
let dialogType = ref('lost')//初始化弹窗类型为增加弹窗

const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'lost' ? '发布寻物启示' : '发布失物招领'
})

const handleAdd = () => { //箭头函数
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  dialogType.value = 'add' // 设置对话框的类型为 "add"
  tableform.value = {} // 清空表单数据
}
//创建弹窗确定按钮事件dialogOk
const dialogOk = () => {
  dialogFormVisible.value = false
  if (dialogType.value === 'add') {
    const newUser = { ...tableform.value }
    console.log(newUser)
    axios.post('http://localhost:8080/found', newUser)
        .then(response => {// 处理成功响应
          ElMessage({type: 'success',message: '添加成功!',})
          // getData(); // 在添加数据后调用获取数据的方法
        })
        .catch(error => {// 处理错误
          console.log(error);
        });
  }else {
    const userId = tableform.value.id;
    const updatedUser = { ...tableform.value };
    axios.put(`http://localhost:8080/found/${userId}`, updatedUser)
        .then(response => {
          // 处理成功响应
          ElMessage({type: 'success',message: '修改成功!',})
          // getData();
        })
        .catch(error => {
          // 处理错误
          console.error('用户更新失败');
          console.error(error);
        });
  }
}

//修改编辑按钮点击事件handleEdit
function handleEdit(row) { // row 为当前行的数据
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...row} //表单数据设置为传入行数据
  dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
}

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