import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        //路由初始指向
        path: '/',
        name: 'index',
        component:()=>import('../components/index.vue'),
    },
    {
        //路由初始指向
        path: '/test',
        name: 'test',
        component:()=>import('../components/test.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
