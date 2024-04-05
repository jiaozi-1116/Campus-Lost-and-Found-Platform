<template>
  <div class="common-layout">
    <el-container  style="height: 100vh">
      <el-header style="position: fixed;z-index: 999;top: 0"><Header/></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-container>

          <el-main><router-view></router-view></el-main>

          <el-footer style="font-size: 0.8em;margin-left: 330px;margin-top: 20px">Copyright 2023.6.11 by YangZhi ChengZiren </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Header from "./Header.vue"
import Main from "./Main.vue"
import ShowLost from "./ShowLost.vue"
import ShowFound from "./ShowFound.vue"
import PubLost from "./PubLost.vue"

</script>

<style scoped>

</style>