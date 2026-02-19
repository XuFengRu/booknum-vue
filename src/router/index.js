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
      component: () => import('../views/OAuth/PasswordForgetView.vue')
    },
    {
      path: '/forget-password/confirmation',
      name: 'forget-password-confirmation',
      component: () => import('../views/OAuth/PasswordForgetConfirmationView.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/OAuth/PasswordResetView.vue')
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
      component: () => import('../layout/MemberLayout.vue'), // 會員後台外框
      redirect: '/member/dating', 
      children: [
        // --- 交友配對 (Dating) ---
        { path: 'dating', name: 'member-dating', component: () => import('../views/Member/Dating/DatingView.vue') },
        { path: 'dating/likes', name: 'member-likes', component: () => import('../views/Member/Dating/DatingLikes.vue') },
        { path: 'dating/favorites', name: 'member-favorites', component: () => import('../views/Member/Dating/DatingFavorites.vue') },
        { path: 'dating/messages', name: 'member-messages', component: () => import('../views/Member/Dating/DatingMessages.vue') },
        { path: 'dating/bookpremium', name: 'member-bookpremium', component: () => import('../views/Member/Dating/DatingBookpremium.vue') },
        { path: 'dating/info', name: 'member-info', component: () => import('../views/Member/Dating/DatingInfo.vue') },

        // --- 出租男女友 (Rent) ---
        { path: 'rent', name: 'member-rent', component: () => import('../views/Member/Rent/RentView.vue') },
        { path: 'rent/payment', name: 'member-rent-payment', component: () => import('../views/Member/Rent/Payment.vue') },
        { path: 'rent/cart', name: 'member-rent-cart', component: () => import('../views/Member/Rent/cart.vue') },
        { path: 'rent/bookings', name: 'member-rent-bookings', component: () => import('../views/Member/Rent/bookings.vue') },
        { path: 'rent/:name', name: 'rent-detail', component: () => import('../views/Member/Rent/RentDetail.vue'), props: true },

        // --- 揪團活動 (Group) ---
        { path: 'group', name: 'member-group', component: () => import('../views/Member/Group/GroupView.vue') },
        { path: 'group/my', name: 'member-group-my', component: () => import('../views/Member/Group/ActivityMy.vue') },
        { path: 'group/create', name: 'member-group-create', component: () => import('../views/Member/Group/ActivityNew.vue') },
        { path: 'group/:id', name: 'member-group-detail', component: () => import('../views/Member/Group/ActivityDetail.vue') },

        // --- 個人設定 (Profile & Security) ---
        { path: 'profile', name: 'member-profile', component: () => import('../views/Member/ProfileView.vue') },
        { path: 'security', name: 'member-security', component: () => import('../views/Member/SecurityView.vue') }
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
