<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import DatingCard from '@/components/datingCard.vue'

const selectedUser = ref(null)
const users = ref([]) // API 填充
const isPremium = ref(false) // 新增 Premium 狀態

function openProfile(index) {
  selectedUser.value = index
}

function handleAction() {
  selectedUser.value = null
}

// 我喜歡誰
onMounted(async () => {
  try {
    const userId = 6 // 改成目前登入者的 ID
    const res = await axios.get(`https://localhost:7091/api/MatchLikes/ILike/${userId}`)
    users.value = res.data.candidates.map(c => ({
      name: c.nickname,
      age: c.age,
      location: c.currentCity,
      job: c.job,
      hobbies: c.hobbies,
      intro: c.bio,
      avatar: c.photo,
      userId: c.userId,
      probability: c.probability
    }))
    isPremium.value = res.data.isPremium // 後端回傳的 Premium 狀態
  } catch (err) {
    console.error("載入 ILike API 失敗:", err)
  }
})
</script>

<template>
  <div class="w-100 fade-in-up">

    <template v-if="selectedUser === null">
      <div class="mb-4 text-center">
        <h2 class="fw-bold text-gradient mb-2">心動對象</h2>
        <p class="text-muted">
          目前有 <span class="fw-bolder text-primary fs-5 mx-1">{{ users.length }}</span> 個心動對象
        </p>
      </div>

      <div v-if="users.length === 0" class="text-center py-5 my-5 fade-in-up">
        <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border" 
             style="width: 100px; height: 100px; color: var(--text-muted);">
          <i class="bi bi-inbox display-4"></i>
        </div>
        <h4 class="fw-bold text-muted mb-3">目前還沒有心動對象</h4>
        <p class="text-muted mb-4">去首頁多滑幾張卡片，將喜歡的人加入心動清單吧！</p>
        
        <RouterLink to="/member/dating" class="btn btn-primary rounded-pill fw-bold shadow-sm fs-5">
          <i class="bi bi-search-heart me-2"></i>去配對看看
        </RouterLink>
      </div>

      <div class="row g-4">
        <div v-for="(user, index) in users" :key="index" class="col-6 col-md-4 col-xl-3">
          
          <!-- Premium 顯示高清 -->
          <div v-if="isPremium"
               class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative user-card cursor-pointer"
               @click="openProfile(index)">
            <div class="ratio image-ratio">
              <img :src="user.avatar" class="w-100 h-100 object-fit-cover transition-all" :alt="user.name">
            </div>
            
            <div class="position-absolute bottom-0 start-0 w-100 p-3 overlay-gradient">
              <h5 class="fw-bold text-white mb-1">{{ user.name }} <span class="fs-6 fw-normal text-white-50">{{ user.age }}</span></h5>
              <p class="text-white-50 small mb-0"><i class="bi bi-geo-alt-fill me-1"></i>{{ user.location }}</p>
            </div>
          </div>

          <!-- 非 Premium 模糊化 -->
          <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative bg-dark user-card">
            <div class="ratio image-ratio">
              <img :src="user.avatar" class="w-100 h-100 object-fit-cover blur-img" alt="locked">
            </div>
            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 locked-overlay">            
              <div class="gem-icon-wrapper mb-3">
                <i class="bi bi-gem display-4 text-warning" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));"></i>
              </div>
              <h5 class="fw-bold text-white text-shadow mb-2">升級 Premium</h5>
              <p class="text-white text-shadow mb-4 px-2">解鎖心動對象，不再錯過任何緣分。</p>
              <RouterLink :to="{ name: 'member-bookpremium' }" class="btn btn-warning rounded-pill fw-bold shadow-lg fs-5">
                立即解鎖
              </RouterLink>
            </div>
          </div>

        </div>
      </div>

      <!-- 新增提醒字 -->
      <div class="text-center mt-5 fade-in-up" v-if="users.length >= 1">
        <p class="text-muted small">提醒：若沒有互動，心動對象將在 28 天後回歸人海</p>
      </div>
    </template>

    <template v-else>
      <div class="d-flex justify-content-center align-items-center w-100 fade-in-up" style="min-height: 70vh;">
        
        <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1400px;">
          
          <button @click="selectedUser = null" 
                  class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn" 
                  title="返回列表">
            <i class="bi bi-arrow-left"></i>
          </button>
          
          <DatingCard :person="users[selectedUser]" @like="handleAction" @reject="handleAction" :showActions="false"/>
        
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
.image-ratio {
  --bs-aspect-ratio: 133%;
}
.cursor-pointer {
  cursor: pointer;
}
.user-card img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.user-card:hover img {
  transform: scale(1.08);
}
.overlay-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%);
}
.blur-img {
  filter: blur(18px) brightness(1.3) contrast(0.8);
  transform: scale(1.2);
}
.locked-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
}
.text-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}
.custom-back-btn {
  position: absolute !important;
  left: 50px !important;
  z-index: 1050;
}
@media (max-width: 767.98px) {
  .custom-back-btn {
    left: 10px !important;
  }
}
</style>