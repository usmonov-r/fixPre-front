import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResetPassword from "@/views/ResetPassword.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import GoogleCallback from "@/views/GoogleCallback.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {requiresGuest: true},
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
            meta: {requiresGuest: true},
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('../views/HistoryView.vue'),
            meta: {requiresAuth: true},
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: {requiresAuth: true},
        },
        {
            path: '/forgot-password',
            name: 'forgot_password',
            component: ForgotPassword,
        },
        {
            path: '/reset-password',
            name: 'reset_password',
            component: ResetPassword,
        },
        {
            path: '/auth/callback',
            name: 'google-callback',
            component: GoogleCallback,
        }

    ],
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token');
    const isLoggedIn = !!token;

    if (to.meta.requiresGuest && isLoggedIn) {
        next('/');
        return;
    }

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
        return;
    }

    next();
})

export default router
