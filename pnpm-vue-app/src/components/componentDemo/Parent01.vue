<template>
  <p>传入子组件数据：<input type="text" v-model="pmsg"></p>
  <Child :prop1="pmsg"/><!-- 调用Child组件 -->
</template>

<script setup>
import Child from './Child01.vue'
import {ref} from 'vue'// 引入Vue的ref函数
const pmsg = ref('父组件数据')
</script>
