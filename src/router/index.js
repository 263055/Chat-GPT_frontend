import {createRouter, createWebHistory} from 'vue-router'
import {useStore} from "@/stores";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'login-page',
                    component: () => import('@/components/welcome/LoginPage.vue')
                }, {
                    path: 'register',
                    name: 'register-page',
                    component: () => import('@/components/welcome/RegisterPage.vue')
                }, {
                    path: 'forget',
                    name: 'forget-page',
                    component: () => import('@/components/welcome/ForgetPage.vue')
                }
            ]
        },
        {
            path: '/chat',
            name: 'chat',
            redirect: '/chat/main',
            component: () => import('@/views/ChatView.vue'),
            children: [
                {
                    path: ':id(\\d{18})',
                    component: () => import('@/components/chat/ChatPage.vue'),
                },
                {
                    path: 'main',
                    name: 'main-page',
                    component: () => import('@/components/chat/MainPage.vue'),
                }
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    // const store = useStore()
    if (localStorage.getItem('mail') == null
        && to.name !== 'login-page'
        && !to.path.startsWith('/login/forget')
        && !to.path.startsWith('/login/register')) {
        next('/login')
    } else if (localStorage.getItem('mail') !== null
        && !to.matched.some(record => record.path.startsWith('/chat'))) {
        next('/chat/main')
    } else {
        next()
    }
})

export default router
