<template>
  <el-menu :default-active="activeIndex" class="el-menu-myr box-shadow" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-sub-menu index="1">
      <template #title><el-avatar :size="40" :src="avUrl" fit="cover" /></template>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/setting">设置</el-menu-item>
    </el-sub-menu>
    <div class="flex-grow" />
    <!-- <el-menu-item index="/test">测试</el-menu-item> -->
    <el-menu-item index="/utils">工具</el-menu-item>
    <el-menu-item index="/a">用户侧超额获利回收费用</el-menu-item>
    <el-menu-item index="/b">中长期曲线偏差回收费用</el-menu-item>
    <el-menu-item index="/c">中长期缺额回收费用（分时）</el-menu-item>
    <el-menu-item index="/d">中长期超额申报费用</el-menu-item>
    <el-sub-menu index="2">
      <template #title>图表制作</template>
      <el-menu-item index="/line">折线图</el-menu-item>
      <el-menu-item index="/bar">柱状图</el-menu-item>
      <el-menu-item index="/line-bar">折线-柱状图</el-menu-item>
      <el-menu-item index="/pie">饼图</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { watch } from 'vue'

let router = useRouter()
const activeIndex = ref('0')
const handleSelect = (key, keyPath) => {
  if (key[0] === '/') {
    router.push({
      path: key
    })
  }
}

const store = useStore();
let avUrl = ref(new URL(store.state.setting.av, import.meta.url).href)
watch(
  [() => store.state.setting.av],
  ([val, index]) => {
    avUrl.value = new URL(val, import.meta.url).href
  }
);

</script>
  
<style scoped lang="scss">
.el-menu-myr{
  padding: 0 20px;
  .el-avatar {
    border: 1px solid $border-color;
  }

  .flex-grow {
    flex-grow: 1;
  }
}
</style>
  