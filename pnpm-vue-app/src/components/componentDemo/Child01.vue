<template>
  <div style="padding: 30px;background: #cccccc">
    <h1>子组件内容</h1>
    <p>显示父组件数据：{{prop1}}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  prop1: String
})
</script>
