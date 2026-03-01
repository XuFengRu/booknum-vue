<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import DatingCard from '@/components/datingCard.vue'

const isPremium = ref(false)
const selectedUser = ref(null)
const users = ref([])

const currentPage = ref(1)
const pageSize = 4
const totalPages = computed(() => Math.ceil(users.value.length / pageSize))
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.value.slice(start, start + pageSize)
})

function openProfile(index) {
  selectedUser.value = index + (currentPage.value - 1) * pageSize
}

//抓登入者的 userId
const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
const currentUserId = storedUser?.id

async function fetchUsers() {
  try {
    const res = await axios.get(`https://localhost:7091/api/MatchLikes/WhoLikesMe/${currentUserId}`)
    users.value = res.data.candidates.map((c) => ({
      name: c.nickname,
      age: c.age,
      location: c.currentCity,
      job: c.job,
      hobbies: c.hobbies,
      intro: c.bio,
      avatar: c.photo,
      userId: c.userId,
      probability: c.probability,
    }))

    const premiumRes = await axios.get(`https://localhost:7091/api/MatchPremium/isActive/${currentUserId}`)
    isPremium.value = premiumRes.data === true
    console.log('Premium 狀態:', isPremium.value)
  } catch (err) {
    console.error('載入 API 失敗:', err)
  }
}

async function handleLike(person) {
  try {
    await axios.post('/match/interact', {
      likerUserId: currentUserId,
      likedUserId: person.userId,
      isLiked: true,
      score: person.probability,
    })
    selectedUser.value = null
    await fetchUsers() // 互動完重新載入
  } catch (err) {
    console.error('互動失敗:', err)
  }
}

async function handleReject(person) {
  try {
    await axios.post('/match/interact', {
      likerUserId: currentUserId,
      likedUserId: person.userId,
      isLiked: false,
      score: person.probability,
    })
    console.log('Rejected:', person?.name)
    selectedUser.value = null
    await fetchUsers() // 互動完重新載入
  } catch (err) {
    console.error('互動紀錄失敗:', err)
  }
}

onMounted(fetchUsers)
</script>
<template>
  <div class="w-100 fade-in-up">
    <template v-if="selectedUser === null">
      <div class="position-relative mb-4 text-center fade-in-up">
        <h2 class="fw-bold text-gradient mb-2">誰喜歡我</h2>
        <p class="text-muted">
          目前有
          <span class="fw-bolder text-primary fs-5 mx-1">{{ users.length }}</span> 個人對你心跳加速
        </p>

        <div class="position-absolute top-0 end-0" style="z-index: 10">
          <div
            class="form-check form-switch bg-white rounded-pill shadow-sm px-3 py-2 border d-inline-flex align-items-center gap-2 transition-all hover-shadow">
            <label class="form-check-label small fw-bold text-muted mb-0 d-none d-md-flex align-items-center"
              for="premiumToggle" style="cursor: pointer">
              <i class="bi bi-eye-fill me-2 text-primary opacity-75"></i> 預覽 Premium 視角
            </label>
            <input class="form-check-input m-0 fs-5" type="checkbox" role="switch" id="premiumToggle"
              v-model="isPremium" style="cursor: pointer" title="預覽 Premium" />
          </div>
        </div>
      </div>

      <div v-if="users.length === 0" class="text-center py-5 my-5 fade-in-up">
        <div
          class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border"
          style="width: 100px; height: 100px; color: var(--text-muted)">
          <i class="bi bi-inbox display-4"></i>
        </div>
        <h4 class="fw-bold text-muted mb-3">目前還沒收到喜歡</h4>
        <p class="text-muted mb-4">
          別氣餒！多去滑幾張卡片，或者豐富一下自我介紹，緣分很快就會出現。
        </p>

        <RouterLink to="/member/dating" class="btn btn-primary rounded-pill fw-bold shadow-sm fs-5">
          <i class="bi bi-search-heart me-2"></i>去配對看看
        </RouterLink>
      </div>

      <div class="row g-4">
        <div v-for="(user, index) in paginatedUsers" :key="index" class="col-6 col-md-4 col-xl-3">
          <div v-if="isPremium"
            class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative user-card cursor-pointer"
            @click="openProfile(index)">
            <div class="ratio image-ratio">
              <img :src="user.avatar" class="w-100 h-100 object-fit-cover transition-all" :alt="user.name" />
            </div>
            <div class="position-absolute bottom-0 start-0 w-100 p-3 overlay-gradient">
              <h5 class="fw-bold text-white mb-1">
                {{ user.name }} <span class="fs-6 fw-normal text-white-50">{{ user.age }}</span>
              </h5>
              <p class="text-white-50 small mb-0">
                <i class="bi bi-geo-alt-fill me-1"></i>{{ user.location }}
              </p>
            </div>
          </div>

          <div v-else
            class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative bg-dark user-card">
            <div class="ratio image-ratio">
              <img :src="user.avatar" class="w-100 h-100 object-fit-cover blur-img" alt="locked" />
            </div>
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 locked-overlay">
              <div class="gem-icon-wrapper mb-3">
                <i class="bi bi-gem display-4 text-warning"
                  style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))"></i>
              </div>
              <h5 class="fw-bold text-white text-shadow mb-2">升級 Premium</h5>
              <p class="text-white text-shadow mb-4 px-2">解鎖對你心動的對象，不再錯過任何緣分。</p>
              <RouterLink :to="{ name: 'member-bookpremium' }"
                class="btn btn-warning rounded-pill fw-bold shadow-lg fs-5">
                立即解鎖
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 分頁按鈕 -->
      <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                上一頁
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="currentPage = page">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
                下一頁
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 新增提醒字 -->
      <div class="text-center mt-5 fade-in-up" v-if="users.length >= 1">
        <p class="text-muted small">提醒：若沒有回應，對方將在 28 天後回歸人海</p>
      </div>
    </template>

    <template v-else>
      <div class="d-flex justify-content-center align-items-center w-100 fade-in-up" style="min-height: 70vh">
        <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1400px">
          <button @click="selectedUser = null" class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn"
            title="返回列表">
            <i class="bi bi-arrow-left"></i>
          </button>
          <DatingCard :person="users[selectedUser]" @like="handleLike" @reject="handleReject" />
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
  background: linear-gradient(to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.3) 60%,
      transparent 100%);
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

.hover-shadow {
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
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
