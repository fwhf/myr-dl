<template>
    <el-calendar v-model="value" />
</template>

<script setup>
import testData from "@/data/test.json";
import { ref } from "vue";

const value = ref(new Date())
</script>
  
<style scoped lang="scss">
</style>