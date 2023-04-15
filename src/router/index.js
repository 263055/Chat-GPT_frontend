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
            component: () => import('@/views/ChatView.vue'),
        },
    ]
});

router.beforeEach((to, from, next) => {
    const store = useStore()
    if (store.auth.user == null
        && to.name !== 'login-page'
        && !to.path.startsWith('/login/forget')
        && !to.path.startsWith('/login/register')) {
        next('/login');
    } else if (store.auth.user !== null
        && !to.path.startsWith('/chat')){
        next('/chat')
    } else {
        next()
    }
})

export default router
