<template>
<div style="padding: 20px;">
  <div class="topTool">
    <el-input v-model="sname" placeholder="请输入名称搜索"
              @input="handleSearchName" :prefix-icon="Search">
    </el-input>
    <el-button type="primary" :icon="Plus" @click="handleAdd"
               style="margin-left: 20px;">添加数据</el-button>
    <el-button type="danger" :icon="Delete" @click="handleDelList"
               v-if="multipleSelection.length>0">删除选中数据</el-button>
  </div>
</div>




  <el-table
      :data="myData"
      :header-cell-style="{ background: '#f6f9fa'}"
      style="width: 100%"
    @sort-change="handleSortChange"
    empty-text="暂无数据"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection"/>
    <el-table-column
        prop="id"
        label="编号"
        width="100"
        sortable>
    </el-table-column>
    <el-table-column
        prop="name"
        label="名称"
        width="100"
        sortable>
    </el-table-column>
    <el-table-column
        prop="address"
        label="拾获地点"
        width="130"
        sortable>
    </el-table-column>
    <el-table-column
        prop="time"
        label="拾获日期"
        width="180"
        sortable>
    </el-table-column>
    <el-table-column
        prop="des"
        label="描述"
        width="180"
        sortable>
    </el-table-column>
    <el-table-column
        prop="category"
        label="类别"
        width="150"
        sortable>
    </el-table-column>

    <el-table-column
        prop="status"
        label="状态"
        width="100"
        sortable>
    </el-table-column>

    <el-table-column
        label="操作"
        width="180">
      <template #default="{row}">
        <el-button type="primary" size="small" icon="Edit"
                   @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete"
                   @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!--  分页显示-->
  <el-pagination
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5,10,20]"
      :total="total"
      layout="prev, pager, next,sizes"
      @current-change="handleCurrentChange"
  />
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


<!--      <el-form-item label="类别" :label-width="100">-->
<!--        <el-input v-model="tableform.category" autocomplete="off"/>-->
<!--      </el-form-item>-->

      <el-form-item label="类别" :label-width="100">
        <el-select v-model="tableform.category" placeholder="请选择类别：" style="margin-left: 10px">
          <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
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
import {ref, reactive, onMounted, computed} from 'vue'
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus"; // 引入 Vue.js的 ref 函数
import axios from 'axios'

const myData = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const sname = ref('')//初始化搜索框的值

const options = [
  { label: '学习用品类', value: '学习用品类' },
  { label: '移动设备类', value: '移动设备类' },
  { label: '服饰类', value: '服饰类' },
  { label: '生活用品类', value: '生活用品类' },
  { label: '贵重物品类', value: '贵重物品类' },
  { label: '其他', value: '其他' },
]

onMounted(() => {
  getData()
})

const getData = () => {
  axios.get('http://localhost:8080/found/findByPage', {
    params: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
  })
      .then(response => {
        myData.value = response.data.records;
        total.value = response.data.total;
        console.log(currentPage.value+'a')
      })
      .catch(error => {
        console.error(error);
      });
};



//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};


// 定义 handleSortChange 方法，接收 sortData 参数   排序
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  myData.value = myData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}

//处理每页显示多少条事件
const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize;
  getData();
}


//按姓名搜索处理方法
const handleSearchName = (val) => {
  if(val.length>0){
    axios.get(`http://localhost:8080/foundByName/${val}`).then(response=>{
      myData.value=response.data
    }).catch(error=>{
      console.error(error)
    })
  }else {
    getData()
  }
}

//添加
//初始化数据
const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({})//初始化弹窗表单数据
let dialogType = ref('add')//初始化弹窗类型为增加弹窗

const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})
//创建添加数据按钮事件handleAdd
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
          getData(); // 在添加数据后调用获取数据的方法
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
          getData();
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

//删除行数据
const delrow = (row) => {
  const userId = row.id;
  axios.delete(`http://localhost:8080/found/${userId}`)
      .then(response => {
        // 处理删除成功后的逻辑，例如重新加载数据
        getData();
      })
      .catch(error => {
        console.error(error);
      });
};

//删除按钮点击事件方法handleDelete
const handleDelete=(row)=> {
  ElMessageBox.confirm(
      '您确定要删除姓名为【' + row.name + '】的数据吗?', '危险操作',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }
  )
      .then(() => {
        delrow(row)
        ElMessage({type: 'success', message: '完成删除！', })
      })
      .catch(() => {
        ElMessage({type: 'info', message: '取消删除!', })
      })
}

// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item) // 将选中的每一行数据存入multipleSelection数组中
  })
}

const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const userIds = multipleSelection.value;
    axios.delete('http://localhost:8080/found', { data: userIds })
        .then(response => {
          // 处理删除成功后的逻辑，例如重新加载数据
          getData();
          ElMessage({ type: 'success', message: '完成批量删除！' });
        })
        .catch(error => {
          console.error(error);
          ElMessage({ type: 'error', message: '删除失败！' });
        });
  }).catch(() => {
    ElMessage({ type: 'info', message: '取消删除!' });
  });
}


</script>

<style scoped>
/*.el-input{*/
/*  width: 300px;*/
/*  padding: 20px;*/
/*}*/
/*在ElementPlus中，可使用组件名称的类选择器选择对应组件，从而修改默认组件样式*/
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}

.topTool{
  display: flex;justify-content: space-between;margin-bottom: 8px;
}


</style>