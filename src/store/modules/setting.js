import Local from '@/utils/local.js'

const state = {
    av: Local.get('av')?.url || (import.meta.env.MODE === "development" ? '/myr/src/assets/av/av1.jpeg' : '/myr/assets/av1.jpeg'),
    bg: Local.get('bg')?.url || (import.meta.env.MODE === "development" ? '/myr/src/assets/bg/bg1.jpeg' : '/myr/assets/bg1.jpeg'),
    bgOpcity: Local.get('bgOpcity')?.opcity || 70,
}

const mutations = {
    changeAv: (state, value) => {
        state.av = value
        Local.set('av', {url: value}, 99)
    },
    changeBg: (state, value) => {
        state.bg = value
        Local.set('bg', {url: value}, 99)
    },
    changeBgOpcity: (state, value) => {
        state.bgOpcity = value
        Local.set('bgOpcity', {opcity: value}, 99)
    },
}

export default {
    namespaced: true,// 为每个模块添加一个前缀名，保证模块命明不冲突
    state,
    mutations
}