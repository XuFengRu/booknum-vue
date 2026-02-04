import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/OAuth/LoginView.vue'),
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('../views/OAuth/ForgetPasswordView.vue')
    },
    {
      path: '/forget-password/confirmation',
      name: 'forget-password-confirmation',
      component: () => import('../views/OAuth/ForgetPasswordConfirmationView.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/OAuth/ResetPasswordView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/OAuth/RegisterView.vue'),
    },
    {
      path: '/register/success',
      name: 'register-success',
      component: () => import('../views/OAuth/RegisterSuccessView.vue'),
    },
    // ★★★★★★★ 設定各自路由 ★★★★★★★
    {
      path: '/member',
      component: () => import('../layout/MemberLayout.vue'), // 外框
      // 當網址是 /member 時，預設重導向到 /member/dating
      redirect: '/member/dating', 
      children: [
        {
          path: 'dating', // 網址: /member/dating
          name: 'member-dating',
          component: () => import('../views/Member/Dating/DatingView.vue')
        },
           {
          path: 'dating/likes', // 網址: /member/dating
          name: 'member-likes',
          component: () => import('../views/Member/Dating/DatingLikes.vue')
        },
                        {
          path: 'dating/favorites', // 網址: /member/dating
          name: 'member-favorites',
          component: () => import('../views/Member/Dating/DatingFavorites.vue')
        },
                                {
          path: 'dating/messages', // 網址: /member/dating
          name: 'member-messages',
          component: () => import('../views/Member/Dating/DatingMessages.vue')
        },
                                {
          path: 'dating/bookpremium', // 網址: /member/dating
          name: 'member-bookpremium',
          component: () => import('../views/Member/Dating/DatingBookpremium.vue')
        },
             {
          path: 'dating/info', // 網址: /member/dating
          name: 'member-info',
          component: () => import('../views/Member/Dating/DatingInfo.vue')
        },
        {
          path: 'rent',   // 網址: /member/rent
          name: 'member-rent',
          component: () => import('../views/Member/Rent/RentView.vue')
        },
        {
          path: 'group',  // 網址: /member/group
          name: 'member-group',
          component: () => import('../views/Member/Group/GroupView.vue')
        },
        {
          path: 'profile',
          name: 'member-profile',
          component: () => import('../views/Member/ProfileView.vue')
        },
        {
          path: 'security',
          name: 'member-security',
          component: () => import('../views/Member/SecurityView.vue')
        }
      ]
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
