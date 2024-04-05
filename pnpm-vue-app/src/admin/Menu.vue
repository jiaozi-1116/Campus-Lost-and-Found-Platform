<template>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      background-color="#33414f"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
  >
    <template v-for="item in menuData">
      <el-sub-menu v-if="item.children" :index="item.text">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.text }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :index="child.path">
            <el-icon>
              <component :is="child.icon"></component>
            </el-icon>
            <span>{{ child.text }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :key="item.text" :index="item.path">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.text }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
const menuData=[
  {
    text: '首页',
    icon: 'HomeFilled',
    path: '/home'
  },
  {
    text: '用户管理',
    icon: 'Menu',
    path: '/user'
    // children: [
    //   {text: '添加用户',icon: 'Plus',path: '/1'},
    //   {text: '修改用户信息',icon: 'EditPen',path: '/2'},
    //   {text: '删除用户',icon: 'Delete',path: '/3'},
    //   {text: '查看用户列表',icon: 'Tickets',path: '/4'}
    // ]
  },
  {
    text: '失物管理',
    icon: 'EditPen',
    path: '/l5'
    // children: [
    //   {text: '添加失物信息',icon: 'Plus',path: ''},
    //   {text: '修改失物信息',icon: 'EditPen',path: ''},
    //   {text: '删除失物信息',icon: 'Delete',path: ''},
    //   {text: '查看失物列表',icon: 'Tickets',path: ''}
    // ]
  },
  {
    text: '招领管理',
    icon: 'Memo',
    path: '/l6'
    // children: [
    //   {text: '添加招领信息',icon: 'Plus',path: ''},
    //   {text: '修改招领信息',icon: 'EditPen',path: ''},
    //   {text: '删除招领信息',icon: 'Delete',path: ''},
    //   {text: '查看招领列表',icon: 'Tickets',path: ''}
    // ]
  },
  // {
  //   text: '公告管理',
  //   icon: 'Medal',
  //   children: [
  //     {text: '添加公告',icon: 'Plus',path: ''},
  //     {text: '修改公告',icon: 'EditPen',path: ''},
  //     {text: '删除公告',icon: 'Delete',path: ''},
  //     {text: '查看公告列表',icon: 'Tickets',path: ''}
  //   ]
  // },
  // {
  //   text: '系统设置',
  //   icon: 'Setting',
  //   children: [
  //     {text: '修改密码',icon: 'EditPen',path: ''},
  //     {text: '管理员设置',icon: 'Avatar',path: ''},
  //     {text: '其他设置',icon: 'Help',path: ''}
  //   ]
  // },
]
//使用Json文件导入菜单数据
// import datas from './meun.json'
// const menuData=JSON.parse(JSON.stringify(datas))

</script>
<style scoped>
.el-menu{
  height: 100%;
}
.el-menu-item .icon {
  width: 16px;
  margin-right: 10px; /* 可选，根据需要调整图标和文本之间的间距 */
}
</style>