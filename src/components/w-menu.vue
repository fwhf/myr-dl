<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="/">
        来自外星的智慧助手
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/test">测试</el-menu-item>
      <!-- <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu> -->
    </el-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  let router = useRouter()
  const activeIndex = ref('0')
  const handleSelect = (key, keyPath) => {
    router.push({
      path: key
    })
  }
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  