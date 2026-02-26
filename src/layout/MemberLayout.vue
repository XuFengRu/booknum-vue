<script setup>
import { ref, computed,onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { usedatingRead } from '@/stores/datingRead'
import Swal from 'sweetalert2'
import * as signalR from '@microsoft/signalr'
import DatingSuccessModal from '@/components/datingSuccessModal.vue'

const route = useRoute()
const router = useRouter()
const datingReadStore = usedatingRead()
const isSidebarOpen = ref(false)
// Storage 中讀取登入者的資料
const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}')
const currentUserName = ref(storedUser.name || '會員')
// 登出
const handleLogout = () => {
  Swal.fire({
    title: '確定要登出嗎？',
    icon: 'question',
    iconColor: '#dc3545',
    showCancelButton: true,
    confirmButtonColor: '#dc3545', // 紅色警告色
    cancelButtonColor: '#6c757d',  // 灰色取消色
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    reverseButtons: true // 讓確認按鈕在右邊
  }).then((result) => {
    if (result.isConfirmed) {
      // 使用者點擊確認後才清除資料
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      
      // 右上角顯示成功 Toast
      Swal.fire({
        icon: 'success',
        title: '您已成功登出！',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })

      router.push('/login')
    }
  })
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

// 計算所有對話的總未讀數
const totalUnreadCount = computed(() => {
  return datingReadStore.conversations.reduce((sum, chat) => sum + chat.unreadCount, 0)
})

const sidebarMenus = computed(() => ({
  dating: [
    { name: '開始配對', icon: 'bi-fire', link: '/member/dating' },
    { name: '誰喜歡我', icon: 'bi-heart', link: '/member/dating/likes', badge: 3, badgeClass: 'bg-danger' },
    { name: '心動對象', icon: 'bi-star', link: '/member/dating/favorites' },
    { 
      name: '我的訊息', 
      icon: 'bi-chat-dots', 
      link: '/member/dating/messages', 
      badge: totalUnreadCount.value > 0 ? totalUnreadCount.value : null, 
      badgeClass: 'bg-warning' 
    },
    { name: '基本資料', icon: 'bi-person', link: '/member/dating/info' },
  ],
  rent: [
    { name: '尋找出租', icon: 'bi-search', link: '/member/rent' },
    { name: '購物車', icon: 'bi-cart', link: '/member/rent/cart', badge: 2, badgeClass: 'bg-danger' },
    { name: '付款資訊', icon: 'bi-credit-card', link: '/member/rent/payment' },
    { name: '我的預約', icon: 'bi-calendar-check', link: '/member/rent/bookings' },
  ],
  group: [
    { name: '熱門揪團', icon: 'bi-flag', link: '/member/group' },
    { name: '發起揪團', icon: 'bi-plus-circle', link: '/member/group/create' },
  ]
}))

const currentMenu = computed(() => {
  if (route.path.includes('/member/rent')) return sidebarMenus.value.rent
  if (route.path.includes('/member/group')) return sidebarMenus.value.group
  return sidebarMenus.value.dating
})

const isActiveService = (path) => route.path.includes(path)

// 模擬目前登入使用者 ID
const userId = 6
const successModal = ref(null)

onMounted(async () => {
  // 建立 SignalR 連線
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7091/chatHub')
    .withAutomaticReconnect()
    .build()

  await connection.start()
  await connection.invoke('JoinUser', userId.toString())

  // 監聽配對成功事件
  connection.on('ChatRoomCreated', (data) => {
    // 呼叫 DatingSuccessModal 的 show 方法
    if (successModal.value) {
      successModal.value.show()
    }
  })
})

</script>

<template>
  <div class="member-page">
    <div class="sidebar-overlay d-lg-none" :class="{ 'show': isSidebarOpen }" @click="closeSidebar"></div>

    <aside class="offcanvas-lg offcanvas-start" :class="{ 'show': isSidebarOpen }" id="sidebar">      
      <div class="d-lg-none d-flex justify-content-end mb-2">
        <button class="btn btn-light btn-circle btn-circle-md" @click="closeSidebar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="brand-area mb-5 ps-3">
        <div class="brand-text">
            <i class="bi bi-heart-fill me-2" style="color: var(--bs-primary)"></i>BOOK仁
        </div>
      </div>

      <nav class="nav flex-column flex-grow-1">
        <RouterLink
          v-for="(item, index) in currentMenu"
          :key="index"
          :to="item.link"
          class="nav-link mb-2"
          active-class="active"
          @click="closeSidebar" 
        >
          <i class="bi" :class="item.icon"></i>
          <span>{{ item.name }}</span>
          <span v-if="item.badge" class="badge rounded-pill ms-auto" :class="item.badgeClass">
            {{ item.badge }}
          </span>
        </RouterLink>
      </nav>

      <div class="mt-4 p-3 rounded-4" style="background: linear-gradient(135deg, #FFF0F5 0%, #fff 100%);">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-gem text-warning me-2"></i>
          <span class="fw-bold small text-dark">Premium</span>
        </div>
        <p class="small text-muted mb-2 lh-sm">解鎖無限瀏覽與專屬徽章</p>
        
      <RouterLink :to="{ name: 'member-bookpremium' }" class="btn btn-warning w-100 rounded-pill fw-bold" style="padding: 8px 16px !important;">
        立即升級
      </RouterLink>
      </div>
    </aside>

    <main class="main-layout">
      <header class="sticky-header d-flex justify-content-between align-items-center">
        <nav class="nav nav-pills">
          <RouterLink to="/member/dating" class="nav-link" :class="{ active: isActiveService('/member/dating') }">
            <i class="bi bi-heart-fill me-1"></i> 交友配對
          </RouterLink>
          <RouterLink to="/member/rent" class="nav-link" :class="{ active: isActiveService('/member/rent') }">
            <i class="bi bi-person-badge me-1"></i> 出租男女友
          </RouterLink>
          <RouterLink to="/member/group" class="nav-link" :class="{ active: isActiveService('/member/group') }">
            <i class="bi bi-people-fill me-1"></i> 揪團活動
          </RouterLink>
        </nav>

        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-light btn-circle btn-circle-md d-lg-none" @click="toggleSidebar">
                <i class="bi bi-list"></i>
            </button>

            <div class="dropdown">
                <button class="bg-white bg-opacity-75 border border-white shadow-sm rounded-pill d-flex align-items-center gap-2 ps-3 pe-1 py-1 transition-all" data-bs-toggle="dropdown" style="backdrop-filter: blur(10px);">
                  <span class="fw-bold text-dark small text-nowrap">UserName</span>
                  <img src="/images/Girlfriend1.jpg" class="rounded-circle border border-2 border-white" width="36" height="36" alt="User">
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-4 mt-2">
                    <li><RouterLink class="dropdown-item py-2" to="/member/profile"><i class="bi bi-person me-2"></i>個人資料</RouterLink></li>
                    <li><RouterLink class="dropdown-item py-2" to="/member/security"><i class="bi bi-shield-lock me-2"></i>帳號安全</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <a href="#" class="dropdown-item text-danger py-2" @click.prevent="handleLogout">
                        <i class="bi bi-box-arrow-right me-2"></i>登出
                      </a>
                    </li>
                </ul>
            </div>
        </div>
      </header>

      <div class="fade-in-up">
        <RouterView />
      </div>
      <DatingSuccessModal ref="successModal" />
    </main>
  </div>
</template>

<style scoped>
.offcanvas-lg {
  position: fixed;
  left: 20px;
  top: 20px;
  bottom: 20px;
  width: 260px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.main-layout { margin-left: 300px; padding: 20px 40px 40px 0; }
.sticky-header { position: sticky; top: 20px; margin-bottom: 30px; z-index: 900; }
.sidebar-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.sidebar-overlay.show {
  opacity: 1;
  visibility: visible;
}
@media (max-width: 992px) {
  .offcanvas-lg { 
    left: 0; top: 0; bottom: 0; width: auto; padding: 40px; 
    position: fixed; --bs-offcanvas-width: 280px; transform: translateX(-100%);
    background: rgba(255, 255, 255, 0.85) !important;
  }
  .offcanvas-lg.show { transform: translateX(0); }
  
  .main-layout { margin-left: 0; padding: 10px; }
  .sticky-header { flex-direction: column; gap: 10px; margin-bottom: 15px; }
  
  .nav-pills { 
    width: 100%; 
    justify-content: center; 
    flex-wrap: nowrap; 
    overflow-x: auto;
    padding: 4px;
    -webkit-overflow-scrolling: touch;
  }
  .nav-pills::-webkit-scrollbar { display: none; }
  .nav-pills .nav-link {
    font-size: 15px !important;
    padding: 8px 16px !important;
    white-space: nowrap;
  }
}
</style>