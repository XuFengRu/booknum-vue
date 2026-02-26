import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Swal from 'sweetalert2'

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
      meta: { requiresAuth: true },
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/member')) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: '未登入',
        text: '請先登入後再進行操作',
        confirmButtonText: '確定',
        confirmButtonColor: '#0d6efd'
      }).then(() => {
        next('/login');
      });
      return; // 必須 return，否則會繼續執行最後面的 next()
    }
    // 判斷是否過期
    try {
      // JWT 格式為 header.payload.signature，取中間的 payload
      const payloadBase64Url = token.split('.')[1];
      // Base64 編碼
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(payloadBase64));
      // 現在時間的 Unix  (秒)
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
        // Token 已過期
        // alert('登入已過期，請重新登入！');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        Swal.fire({
          icon: 'warning',
          title: '登入已過期',
          text: '您的登入狀態已失效，請重新登入！',
          confirmButtonText: '確定',
          confirmButtonColor: '#ffc107'
        }).then(() => {
          next('/login');
        });
        return;
      }
    } catch (e) {
      // 解析失敗代表 Token 格式錯誤
      console.error("Token 解析失敗", e);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      Swal.fire({
        icon: 'error',
        title: '登入無效',
        text: '憑證出現異常，請重新登入！',
        confirmButtonText: '確定',
        confirmButtonColor: '#dc3545'
      }).then(() => {
        next('/login');
      });
      return;
    }
  }

  next(); // pass
});

export default router
