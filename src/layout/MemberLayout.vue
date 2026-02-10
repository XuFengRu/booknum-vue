<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

// 切換側邊欄
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 關閉側邊欄 (點擊遮罩或連結時)
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Sidebar 選單資料
const sidebarMenus = {
  dating: [
    { name: '開始配對', icon: 'bi-fire', link: '/member/dating' },
    { name: '誰喜歡我', icon: 'bi-heart', link: '/member/dating/likes', badge: 3, badgeClass: 'bg-danger' },
    { name: '心動對象', icon: 'bi-star', link: '/member/dating/favorites' },
    { name: '我的訊息', icon: 'bi-chat-dots', link: '/member/dating/messages', badge: 2, badgeClass: 'bg-warning' },
    { name: '基本資料', icon: 'bi-person', link: '/member/dating/info' },
  ],
  rent: [
    { name: '尋找出租', icon: 'bi-search', link: '/member/rent' },
    { name: '購物車', icon: 'bi-cart', link: '/member/rent/Cart', badge: 2, badgeClass: 'bg-danger' },
    { name: '付款資訊', icon: 'bi-credit-card', link: '/member/rent/Payment' },
    { name: '我的預約', icon: 'bi-calendar-check', link: '/member/rent/bookings' },
  ],
  group: [
    { name: '熱門揪團', icon: 'bi-flag', link: '/member/group' },
    { name: '發起揪團', icon: 'bi-plus-circle', link: '/member/group/create' },
    { name: '我的報名', icon: 'bi-ticket-perforated', link: '/member/group/tickets' },
  ]
}

// 根據當前路徑決定 Sidebar 顯示哪一組選單
const currentMenu = computed(() => {
  if (route.path.includes('/member/rent')) return sidebarMenus.rent
  if (route.path.includes('/member/group')) return sidebarMenus.group
  return sidebarMenus.dating
})

const isActiveService = (path) => route.path.includes(path)
</script>

<template>
  <div class="member-page">
    
    <div 
        class="sidebar-overlay" 
        :class="{ 'show': isSidebarOpen }" 
        @click="closeSidebar"
    ></div>

    <aside class="offcanvas-lg offcanvas-start" :class="{ 'show': isSidebarOpen }">      
      <div class="d-lg-none d-flex justify-content-end mb-2">
        <button 
          class="btn btn-light rounded-circle shadow-sm" 
          @click="closeSidebar"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="brand-area mb-4">
        <div class="brand-text">
            <i class="bi bi-heart-fill me-2" style="color: var(--color-primary)"></i>BOOK仁
        </div>
      </div>

      <nav class="nav flex-column flex-grow-1">
        <RouterLink
          v-for="(item, index) in currentMenu"
          :key="index"
          :to="item.link"
          class="nav-link"
          active-class="active"
          @click="closeSidebar" 
        >
          <i class="bi" :class="item.icon"></i>
          <span>{{ item.name }}</span>
          
          <span
            v-if="item.badge"
            class="badge rounded-pill ms-auto"
            :class="item.badgeClass"
          >
            {{ item.badge }}
          </span>
        </RouterLink>
      </nav>

      <div class="mt-4 p-3 rounded-4" style="background: linear-gradient(135deg, #FFF0F5 0%, #fff 100%);">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-crown-fill text-warning me-2"></i>
          <span class="fw-bold small text-dark">Premium</span>
        </div>
        <p class="small text-muted mb-2 lh-sm">解鎖無限瀏覽與專屬徽章</p>
        
        <RouterLink 
            :to="{ name: 'member-bookpremium' }"
            class="btn btn-warning w-100 rounded-pill btn-sm fw-bold"
        >
          立即升級
        </RouterLink>
      </div>
    </aside>

    <main class="main-layout">
      
      <header class="sticky-header d-flex justify-content-between align-items-center">
        
        <nav class="nav nav-pills">
          <RouterLink
            to="/member/dating"
            class="nav-link"
            :class="{ active: isActiveService('/member/dating') }"
          >
            <i class="bi bi-heart-fill me-1"></i> 交友配對
          </RouterLink>
          <RouterLink
            to="/member/rent"
            class="nav-link"
            :class="{ active: isActiveService('/member/rent') }"
          >
            <i class="bi bi-person-badge me-1"></i> 出租男女友
          </RouterLink>
          <RouterLink
            to="/member/group"
            class="nav-link"
            :class="{ active: isActiveService('/member/group') }"
          >
            <i class="bi bi-people-fill me-1"></i> 揪團活動
          </RouterLink>
        </nav>

        <div class="d-flex align-items-center gap-3">
            <button 
                class="btn btn-light rounded-circle d-lg-none" 
                @click="toggleSidebar"
            >
                <i class="bi bi-list"></i>
            </button>

            <button class="btn btn-light rounded-circle">
              <i class="bi bi-bell-fill"></i>
            </button>
            
            <div class="dropdown">
                <button 
                  class="btn btn-light rounded-pill user-profile-btn border-0" 
                  data-bs-toggle="dropdown"
                >
                  <span class="fw-bold text-dark small">UserName</span>
                  <img src="/images/Girlfriend1.jpg" class="rounded-circle border border-2 border-white" width="36" height="36" alt="User">
                </button>
                
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><RouterLink class="dropdown-item" to="/member/profile"><i class="bi bi-person me-2"></i>個人資料</RouterLink></li>
                    <li><RouterLink class="dropdown-item" to="/member/security"><i class="bi bi-shield-lock me-2"></i>帳號安全</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><RouterLink class="dropdown-item text-danger" to="/login"><i class="bi bi-box-arrow-right me-2"></i>登出</RouterLink></li>
                </ul>
            </div>
        </div>
      </header>

      <div class="fade-in-up">
        <RouterView />
      </div>

    </main>
  </div>
</template>

<style scoped>

</style>