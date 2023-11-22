<template>
  <wMenu></wMenu>
  <div class="page">
    <el-image :style="{width: pageWH.width + 'px', height: pageWH.height + 'px', opacity: bgOpcity}" :src="bgUrl" fit="cover" lazy/>
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex';
import { watch } from 'vue'
import wMenu from '@/components/w-menu.vue'

const store = useStore();
const bgOpcity = ref(1)
const bgUrl = ref('')
const pageWH = reactive({
    width: 1000,
    height: 600,
})
const resize = () => {
    pageWH.width = document.documentElement.clientWidth
    pageWH.height = (document.documentElement.clientHeight - 60)
}
onBeforeMount(() => {
    resize()
})
onMounted(() => {
    bgOpcity.value = store.state.setting.bgOpcity / 100
    bgUrl.value = new URL(store.state.setting.bg, import.meta.url).href
    window.addEventListener('resize', resize)
})
onUnmounted(() => {
    window.removeEventListener('resize', resize)
})
watch(
  [() => store.state.setting.bg],
  ([val, index]) => {
    bgUrl.value = new URL(val, import.meta.url).href
  }
);
watch(
  [() => store.state.setting.bgOpcity],
  ([val, index]) => {
    bgOpcity.value = val / 100
  }
);

</script>

<style scoped lang="scss">
.page {
  flex: 1;
  overflow: hidden;
  padding: 20px;
  position: relative;
  .el-image{
    position: absolute;
    z-index: 0;
    top:0;
    left:0;
  }
}
</style>