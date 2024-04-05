<template>

<!--  <Demo01/>-->
<!--  <Login/>-->
<!--  <Register/>-->
<!--  <Demo/>-->

  <div id="app">
    <router-view></router-view>
  </div>

<!--  <Index/>-->


<!--  <Header/>-->
<!--  <Main/>-->
</template>

<script setup>


import Demo01 from "./components/week-09/Found.vue";
import Login from "./components/week-09/Login1.vue";
import Register from "./components/week-09/Register.vue";
import Index from "./components/week-10/index.vue";
import Header from "./components/week-10/Header.vue";
import Main from "./components/week-10/Main.vue";
import Index0 from "./admin/Index.vue";

import {onMounted} from "vue";
import axios from "axios";
// onMounted(() => {
//   axios.get("http://localhost:8080/found")
//       .then(response => {
//         console.log(response.data)
//       }).catch(error => {
//     console.log()
//   })
// })
</script>

<style scoped>

</style>
