<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-text class="mx-1" size="large">欢迎来到yy失物招领平台</el-text>
      <el-dropdown class="dropdown">
    <span class="el-dropdown-link" >
      <el-icon><UserFilled /></el-icon>
      Admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item>系统设置</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">


        <Menu />


      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
    <el-footer>Foot</el-footer>
  </el-container>
</template>

<script setup>
import Menu from "./Menu.vue"
import Home from '/src/components/componentDemo/Home.vue'
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.dropdown{
  float: right;
  top: 20px;
}
</style>