<template>
    <div class="av-list box-shadow border-radius">
        <el-avatar v-for="(item, index) in avList" :key="index" :size="80" fit="cover" :src="item.url"
            @click="saveAv(item.url)" />
    </div>
    <div class="bg-list box-shadow border-radius">
        <div class="slider-block">
            <span class="demonstration">透明度</span>
            <el-slider v-model="bgOpcity" :step="10" show-stops @change="changeBgOpcity" />
        </div>
        <div class="row">
            <el-image v-for="(item, index) in bgList" :key="index"
                :style="{ width: pageWH.width + 'px', height: pageWH.height + 'px' }" :src="item.url" fit="cover" lazy
                @click="saveBg(item.url)" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { onBeforeMount, onMounted, onUnmounted, reactive } from 'vue'

import av1 from '@/assets/av/av1.jpeg'
import av2 from '@/assets/av/av2.jpeg'
import av3 from '@/assets/av/av3.jpeg'
import av4 from '@/assets/av/av4.jpeg'
import av5 from '@/assets/av/av5.jpeg'

import bg1 from '@/assets/bg/bg1.jpeg'
import bg2 from '@/assets/bg/bg2.jpeg'
import bg3 from '@/assets/bg/bg3.jpeg'
import bg4 from '@/assets/bg/bg4.jpeg'
import bg5 from '@/assets/bg/bg5.jpeg'

const store = useStore();

const avList = reactive([{
    url: av1
}, {
    url: av2
}, {
    url: av3
}, {
    url: av4
}, {
    url: av5
}])
const saveAv = (url) => {
    store.commit('setting/changeAv', url)
}

const bgOpcity = ref(100)
const changeBgOpcity = (val) => {
    store.commit('setting/changeBgOpcity', val)
}
const bgList = reactive([{
    url: bg1
}, {
    url: bg2
}, {
    url: bg3
}, {
    url: bg4
}, {
    url: bg5
}])
const saveBg = (url) => {
    store.commit('setting/changeBg', url)
}
const pageWH = reactive({
    width: 1000,
    height: 600,
})
const resize = () => {
    pageWH.width = document.documentElement.clientWidth / 6
    pageWH.height = (document.documentElement.clientHeight - 60) / 6
}
onBeforeMount(() => {
    resize()
})
onMounted(() => {
    bgOpcity.value = store.state.setting.bgOpcity
    window.addEventListener('resize', resize)
})
onUnmounted(() => {
    window.removeEventListener('resize', resize)
})

</script>
  
<style scoped lang="scss">
.av-list {
    padding: 10px;
    background-color: $bg-color;

    .el-avatar {
        margin-right: 10px;
        border: 1px solid $border-color;
        cursor: pointer;
    }
}

.bg-list {
    margin-top: 20px;
    padding: 10px;
    background-color: $bg-color;

    .slider-block {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .el-slider {
            margin-top: 0;
            margin-left: 12px;
        }

        .demonstration {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            line-height: 44px;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 0;
        }

        .demonstration+.el-slider {
            flex: 0 0 90%;
        }
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-image {
            cursor: pointer;
        }
    }
}</style>