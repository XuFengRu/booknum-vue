<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DatingEdit from '@/components/datingEdit.vue'

const isEditing = ref(false)
const person = ref(undefined) // undefined: 載入中, null: 沒資料
const hobbyMap = ref({})

async function loadProfile(userId) {
  try {
    const [profileRes, hobbyRes] = await Promise.all([
      axios.get(`https://localhost:7091/api/matchinfo/${userId}`),
      axios.get('https://localhost:7091/api/matchinfo/hobbies'),
    ])

    const data = profileRes.data
    if (!data || Object.keys(data).length === 0) {
      person.value = null
      return
    }

    hobbyMap.value = hobbyRes.data.reduce((acc, h) => {
      acc[h.hobbyId] = h.hobbyName
      return acc
    }, {})

    person.value = {
      userId: data.userId,
      nickname: data.nickname,
      age: data.age,
      location: data.currentCity,
      job: data.job,
      avatar: data.photo,
      hobbies: Array.isArray(data.hobbies) ? data.hobbies.map((h) => h.hobbyId) : [],
      intro: data.bio,
      matches: data.stats?.matches ?? 0,
      likes: data.stats?.likes ?? 0,
      preference: {
        gender: data.preferences?.gender ?? '不限',
        ageRange: [data.preferences?.ageMin ?? 18, data.preferences?.ageMax ?? 70],
        cities: data.preferences?.cities ?? [],
      },
    }
  } catch (err) {
    console.error('載入失敗:', err)
    person.value = null
  }
}

function updateProfile(newData) {
  person.value = { ...person.value, ...newData }
  isEditing.value = false
}

onMounted(() => {
  // 從 localStorage 或 sessionStorage 取出登入同學的 userId
  const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
  const userId = storedUser?.id   

  if (userId) {
    loadProfile(userId)
  } else {
    console.warn('沒有找到登入使用者的 userId')
    person.value = null
  }
})
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    <div
      v-if="person && !isEditing"
      class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto"
      style="max-width: 1300px; height: 650px"
    >
      <div class="row g-0 h-100">
        <div class="col-lg-4 h-100 position-relative">
          <img :src="person.avatar" class="w-100 h-100 object-fit-cover" :alt="person.nickname" />
        </div>

        <div
          class="col-lg-4 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end border-light-subtle"
        >
          <div class="d-flex align-items-end mb-3">
            <h1 class="fw-bolder mb-0 me-3 text-dark display-5">{{ person.nickname }}</h1>
            <span class="fs-3 text-muted">{{ person.age }}歲</span>
          </div>

          <div class="mb-4 text-secondary d-flex flex-wrap gap-3 fs-6 fw-bold">
            <span class="d-flex align-items-center bg-light px-3 py-2 rounded-pill">
              <i class="bi bi-briefcase-fill me-2 text-primary opacity-75"></i>{{ person.job }}
            </span>
            <span class="d-flex align-items-center bg-light px-3 py-2 rounded-pill">
              <i class="bi bi-geo-alt-fill me-2 text-primary opacity-75"></i>{{ person.location }}
            </span>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-6">
              <div
                class="bg-white border border-light-subtle shadow-sm rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-center h-100 transition-all"
              >
                <i class="bi bi-person-hearts fs-4 text-success"></i>
                <h4 class="fw-bolder mb-0 text-dark">{{ person.matches }}</h4>
                <span class="small text-muted fw-bold mt-1">配對成功</span>
              </div>
            </div>

            <div class="col-6">
              <div
                class="bg-white border border-light-subtle shadow-sm rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-center h-100 transition-all"
              >
                <i class="bi bi-heart-fill fs-4 text-danger"></i>
                <h4 class="fw-bolder mb-0 text-dark">{{ person.likes }}</h4>
                <span class="small text-muted fw-bold mt-1">收到喜歡</span>
              </div>
            </div>
          </div>

          <div class="flex-grow-1 overflow-hidden">
            <h5 class="fw-bold text-muted mb-2">
              <i class="bi bi-chat-quote-fill me-2 text-primary"></i>關於我
            </h5>
            <p class="text-dark fs-6 lh-lg mb-0 text-truncate-multiline">{{ person.intro }}</p>
          </div>
        </div>

        <div class="col-lg-4 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
          <div class="mb-4">
            <h5 class="fw-bold text-muted mb-3">
              <i class="bi bi-stars me-2 text-warning"></i>興趣愛好
            </h5>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="hobbyId in person.hobbies"
                :key="hobbyId"
                class="badge bg-white text-dark border border-light-subtle rounded-pill fw-normal px-3 py-2 fs-6 shadow-sm"
              >
                {{ hobbyMap[hobbyId] }}
              </span>
            </div>
          </div>

          <div class="mb-4 flex-grow-1">
            <h5 class="fw-bold text-muted mb-3">
              <i class="bi bi-balloon-heart-fill me-2 text-danger"></i>交友偏好
            </h5>
            <div class="bg-white rounded-4 p-4 shadow-sm border border-light-subtle">
              <div class="mb-3">
                <div class="small text-muted mb-1">對象性別</div>
                <div class="fw-bold text-dark">{{ person.preference.gender }}</div>
              </div>
              <div class="mb-3">
                <div class="small text-muted mb-1">年齡範圍</div>
                <div class="fw-bold text-dark">
                  {{ person.preference.ageRange[0] }} - {{ person.preference.ageRange[1] }} 歲
                </div>
              </div>
              <div>
                <div class="small text-muted mb-1">接受地區</div>
                <div class="fw-bold text-dark lh-sm">
                  {{
                    person.preference.cities.length > 0
                      ? person.preference.cities.join(', ')
                      : '不拘'
                  }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-auto text-end">
            <button
              @click="isEditing = true"
              class="btn btn-primary rounded-pill w-100 fw-bold shadow fs-5"
            >
              <i class="bi bi-pencil-square me-2"></i>編輯個人資料
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 編輯模式 -->
    <DatingEdit
      v-else-if="person && isEditing"
      :initial-data="person"
      @save="
        () => {
          updateProfile()
          $emit('save') // 再往上冒泡一次
        }
      "
      @cancel="
        () => {
          isEditing = false
          if (!person.nickname) person = null
        }
      "
    />

    <!-- 沒資料 -->
    <div
      v-else-if="person === null"
      class="d-flex flex-column justify-content-center align-items-center text-center p-5"
      style="min-height: 400px"
    >
      <h4 class="mb-3 text-gradient mb-4">你還沒有交友資料，快去開始你的心動之旅吧！</h4>
      <button
        @click="
          () => {
            person = { userId: 13 }
            isEditing = true
          }
        "
        class="btn btn-primary rounded-pill shadow fs-6 px-4 py-3"
      >
        <i class="bi bi-pencil-square me-2"></i>開始編輯
      </button>
    </div>

    <!-- 載入中 -->
    <div v-else class="text-center p-5">
      <span class="spinner-border text-primary"></span>
      <p class="mt-3">載入中...</p>
    </div>
  </div>
</template>

<style scoped>
.text-truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
}

@media (max-width: 991.98px) {
  .card {
    height: auto !important;
  }

  .col-lg-4 {
    height: auto !important;
  }

  .col-lg-4 img {
    height: 400px;
  }
}
</style>
