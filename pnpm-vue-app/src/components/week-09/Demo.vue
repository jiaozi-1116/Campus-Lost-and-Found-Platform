<template>
  <div style="padding: 20px;">
    <div class="topTool">
      <el-input v-model="sname" placeholder="请输入姓名搜索" @input="handleSearchName" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加数据</el-button>
      <el-button type="danger" :icon="Delete" @click="handleDelList" v-if="multipleSelection.length>0">删除选中数据</el-button>
    </div>

    <!--el-table数据表格组件-->
    <el-table
        :data="userData"
        :header-cell-style="{ background: '#f6f9fa'}"
        @sort-change="handleSortChange"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange">
      <!--el-table-column列-->
      <el-table-column type="selection"/>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="birth" label="出生日期" sortable></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit"  @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--分页组件-->
    <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5,10,20]"
        :total="total"
        layout="prev, pager, next, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    <!--弹窗组件-->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="tableform">
        <el-form-item label="姓名" :label-width="100">
          <el-input v-model="tableform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="100">
          <el-radio-group v-model="tableform.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" :label-width="100" style="width: 100%">
          <el-date-picker
              v-model="tableform.birth"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
          />
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
  </div>
</template>

<script setup>
//导入图标组件，虽已全局导入所有图标，但绑定图标，还需单独导入
import { Plus,Delete,Edit,Search } from '@element-plus/icons-vue'
//定义用户信息数据
import axios from 'axios'
import {ref, onMounted, computed} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

const userData = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const sname = ref('')//初始化搜索框的值

onMounted(() => {
  getData()
})

//获取当前页数据
const getData = () => {
  axios.get('http://localhost:8080/user/findByPage', {
    params: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
  })
      .then(response => {
        userData.value = response.data.records;
        total.value = response.data.total;
        console.log(currentPage.value+'a')
      })
      .catch(error => {
        console.error(error);
      });
};

//字段排序
// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  userData.value = userData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}
//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};
//处理每页显示多少条事件
const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize;
  getData();
}

//按姓名搜索处理方法
const handleSearchName = (val) => {
  if(val.length>0){
    axios.get(`http://localhost:8080/userByName/${val}`).then(response=>{
      userData.value=response.data
    }).catch(error=>{
      console.error(error)
    })
  }else {
    getData()
  }
}
//处理增加按钮点击事件
const handleAdd = () => {
  dialogFormVisible.value = true
  dialogType.value = 'add'
  tableform.value = {gender: '男'}//清空表单数据
}
//处理弹窗确认按钮点击事件
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableform = ref({})//弹窗表单数据
const dialogType = ref('add')//初始化弹出框的类型为增加弹窗
//设置弹窗的标题
const dialogTitle = computed(() => {
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})
const dialogOk = () => {
  dialogFormVisible.value = false
  if (dialogType.value === 'add') {
    const newUser = { ...tableform.value }
    console.log(newUser)
    axios.post('http://localhost:8080/user', newUser)
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
}
function handleEdit(row) {// 处理编辑按钮点击事件
  dialogFormVisible.value = true
  tableform.value = {...row}
  dialogType.value = 'edit'
}
//删除行数据
const delrow = (row) => {
  const userId = row.id;
  axios.delete(`http://localhost:8080/user/${userId}`)
      .then(response => {
        // 处理删除成功后的逻辑，例如重新加载数据
        getData();
      })
      .catch(error => {
        console.error(error);
      });
};
// 处理删除按钮点击事件
const handleDelete=(row)=> {
  ElMessageBox.confirm(
      '您确定要删除姓名为【' + row.name + '】的数据吗?',
      '危险操作',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        delrow(row)
        ElMessage({
          type: 'success',
          message: '完成删除！',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除!',
        })
      })
}
// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item.id) // 将选中的每一行数据存入multipleSelection数组中
  })
}
// 删除多条数据
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const userIds = multipleSelection.value;
    axios.delete('http://localhost:8080/user', { data: userIds })
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
/*在ElementPlus中，可使用组件名称的类选择器选择对应组件，从而修改默认组件样式*/
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;
  justify-content: space-between;margin-bottom: 8px;
}
</style>
