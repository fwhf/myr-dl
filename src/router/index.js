import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        component:()=>import('../pages/index.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component:()=>import('../pages/test.vue'),
    },
    {
        path: '/utils',
        name: 'utils',
        component:()=>import('../pages/utils.vue'),
    },
    {
        path: '/a',
        name: 'a',
        component:()=>import('../pages/a.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
