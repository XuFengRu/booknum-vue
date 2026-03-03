<script setup>
import ProfileCard from '@/components/datingCard.vue'
import { ref } from 'vue'
import axios from 'axios'

const person = ref([]) // API 抓資料
const currentIndex = ref(0)
const showCard = ref(false)
const matchCount = ref(0)
const message = ref('')


const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
const userId = storedUser?.id

// 候選人
async function Candidate() {
  try {
    const res = await axios.get(`match/predict/${userId}`)
    const data = res.data
    if (data) {
      person.value = [{
        name: data.nickname,
        age: data.age,
        location: data.currentCity,
        job: data.job,
        avatar: data.photo,
        hobbies: data.hobbies,
        intro: data.bio,
        userId: data.userId,
        probability: data.probability
      }]
      currentIndex.value = 0
    } else {
      message.value = '暫時沒有候選人'
    }
  } catch (err) {
    console.error("API 錯誤:", err)
    message.value = '取得候選人失敗'
  }
}

function startMatch() {
  showCard.value = true
  message.value = ''
  Candidate()
}

async function nextPerson(isLiked) {
  matchCount.value++

  if (person.value[currentIndex.value]) {
    const candidate = person.value[currentIndex.value]

    try {
      await axios.post("/match/interact", {
        likerUserId: userId,
        likedUserId: candidate.userId,
        isLiked: isLiked,
        score: candidate.probability
      })
    } catch (err) {
      console.error("互動紀錄失敗:", err)
      if (err.response?.data?.message) {
        message.value = err.response.data.message
        showCard.value = false
      } else {
        message.value = '互動失敗，請稍後再試'
        showCard.value = false
      }
    }
  }

  // 下一個候選人
  await Candidate()
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center w-100" style="min-height: 70vh;">

    <!-- 初始畫面 -->
    <div v-if="!showCard && !message" class="text-center fade-in-up">
      <div
        class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-lg mx-auto mb-4"
        style="width: 120px; height: 120px; color: white;">
        <i class="bi bi-fire display-3"></i>
      </div>
      <h2 class="fw-bold text-gradient mb-3">準備好開始配對了嗎？</h2>
      <p class="text-muted mb-4">點擊下方按鈕開始尋找你的理想對象</p>

      <button class="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" @click="startMatch">
        <i class="bi bi-search-heart me-2"></i> 開始配對
      </button>
    </div>

    <!-- 顯示訊息 -->
    <div v-else-if="message" class="text-center fade-in-up">
      <div
        class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border"
        style="width: 100px; height: 100px; color: var(--text-muted);">
        <i class="bi bi-emoji-frown display-4"></i>
      </div>
      <h3 class="fw-bold text-gradient mb-3">{{ message }}</h3>
      <p class="text-muted">請稍後再嘗試！</p>
    </div>

    <!-- 顯示候選人卡片 -->
    <div v-else-if="showCard && person.length" class="card-wrapper fade-in-up w-100 d-flex justify-content-center">
      <ProfileCard :person="person[currentIndex]" @like="nextPerson(true)" @reject="nextPerson(false)" />
    </div>

  </div>
</template>