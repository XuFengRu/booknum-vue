<script setup>
import { ref, computed } from 'vue' // 引入 computed
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// ★★★★★★★ 定義不同服務的 Sidebar 選單資料 ★★★★★★★
const sidebarMenus = {
dating: [
        { name: '開始配對', icon: 'bi-fire', link: '/member/dating' }, // dating 首頁
        { name: '誰喜歡我', icon: 'bi-heart', link: '/member/dating/likes' },
        { name: '心動對象', icon: 'bi-star', link: '/member/dating/favorites' },
        { name: '我的訊息', icon: 'bi-chat-dots', link: '/member/dating/messages' }, // 採用 FR，移除 badge
        { name: '基本資料', icon: 'bi-person', link: '/member/dating/info' }, // FR 新增的
    ],
    rent: [
        { name: '尋找出租', icon: 'bi-search', link: '/member/rent' }, // Rent 首頁
        { name: '購物車', icon: 'bi-cart', link: '/member/rent/Cart', badge: 3 }, // 保留原本的
        { name: '付款資訊', icon: 'bi-credit-card', link: '/member/rent/Payment' }, // 保留原本的大寫 P
        { name: '我的預約', icon: 'bi-calendar-check', link: '/member/rent/bookings' },
    ],
    group: [
        { name: '熱門揪團', icon: 'bi-flag', link: '/member/group' }, // Group 首頁
        { name: '發起揪團', icon: 'bi-plus-circle', link: '/member/group/create' },
        { name: '我的報名', icon: 'bi-ticket-perforated', link: '/member/group/tickets' },
    ]
}

// Sidebar：自動判斷現在該顯示哪一組選單
const currentMenu = computed(() => {
  // 檢查網址包含哪個關鍵字
  if (route.path.includes('/member/rent')) {
    return sidebarMenus.rent
  } else if (route.path.includes('/member/group')) {
    return sidebarMenus.group
  } else {
    return sidebarMenus.dating // 預設顯示交友
  }
})
</script>

<template>
  <div class="member-page" :class="{ 'mobile-open': isSidebarOpen }">
    <div id="sidebar-overlay" @click="isSidebarOpen = false"></div>

    <div class="d-flex" id="wrapper" :class="{ 'desktop-toggled': isSidebarOpen }">
      <div id="sidebar-wrapper">
        <div class="sidebar-heading ps-4 justify-content-start">
          <div class="logo-large fw-bold fs-3">
            <span class="text-gradient">BOOK仁</span>
          </div>
          <div class="logo-small fw-bold fs-3 text-gradient">B</div>
        </div>

        <div class="list-group list-group-flush mt-3 px-3 gap-2">
          <RouterLink
            v-for="(item, index) in currentMenu"
            :key="index"
            :to="item.link"
            class="list-group-item"
            active-class="active"
          >
            <i class="bi" :class="item.icon"></i>
            <span class="sidebar-text ms-3">{{ item.name }}</span>

            <span
              v-if="item.badge"
              class="badge bg-gradient ms-auto rounded-pill"
              style="font-size: 0.7rem"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </div>

        <div class="sidebar-footer p-3 mt-auto">
          <div class="card border-0 bg-pink-light rounded-4">
            <div class="card-body p-3 sidebar-text">
              <h6 class="fw-bold small mb-1">升級至 Premium</h6>
              <RouterLink
                :to="{ name: 'member-bookpremium' }"
                class="btn btn-warning text-white w-100 rounded-pill btn-sm shadow-sm fw-bold mt-2"
                style="background: #ffc107; border: none"
              >
                立即升級
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <button
              class="btn btn-link text-dark p-0 border-0"
              id="sidebarToggle"
              @click="toggleSidebar"
            >
              <i class="bi bi-list fs-4"></i>
            </button>

            <div
              class="d-none d-md-flex align-items-center gap-4 position-absolute start-50 translate-middle-x"
            >
              <RouterLink
                to="/member/dating"
                class="nav-link fw-bold text-gradient-hover"
                active-class="active"
                >交友配對</RouterLink
              >
              <RouterLink
                to="/member/rent"
                class="nav-link fw-bold text-muted text-gradient-hover"
                active-class="active"
                >出租男女友</RouterLink
              >
              <RouterLink
                to="/member/group"
                class="nav-link fw-bold text-muted text-gradient-hover"
                active-class="active"
                >揪團</RouterLink
              >
            </div>

            <div class="d-flex align-items-center gap-3 ms-auto">
              <div class="dropdown">
                <a
                  href="#"
                  class="d-flex align-items-center text-decoration-none dropdown-toggle text-body"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="/images/Girlfriend1.jpg"
                    class="rounded-circle object-fit-cover border border-2 border-white shadow-sm me-2"
                    style="width: 38px; height: 38px"
                    alt="User"
                  />
                  <span class="d-none d-sm-inline fw-bold small">UserName</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 mt-2">
                  <li>
                    <RouterLink class="dropdown-item" to="/member/profile">個人資料</RouterLink>
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" to="/member/security">帳號設定</RouterLink>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <RouterLink class="dropdown-item text-danger" to="/login">登出</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div class="container-fluid p-4">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 這裡不需要寫 CSS，因為都已經在 common.css 裡對應 .member-page 了 */
</style>
