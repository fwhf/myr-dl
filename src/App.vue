<script setup>
import wMenu from '@/components/w-menu.vue'
</script>
<template>
    <wMenu></wMenu>
    <div class="page">
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </div>
</template>

<style>

</style>