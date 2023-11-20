<script setup>
import testData from "@/data/test.json";
import { ref } from "vue";

const value = ref(new Date())
</script>
<template>
    <el-calendar v-model="value" />
</template>
  
<style scoped>
</style>