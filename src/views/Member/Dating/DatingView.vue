<script setup>
import ProfileCard from '@/components/datingCard.vue'
import { ref } from 'vue'

const person = ref([
{
    name: '葉舒華',
    age: 26,
    location: '桃園市',
    job: '歌手、舞者',
    avatar: '/images/Girlfriend6.jpg',
    hobbies: ['旅行', '戲劇', '韓文', '舞蹈', '閱讀', '作曲', '主持'],
    intro: '哈囉！我是舒華。平時在舞台上享受唱歌與跳舞的熱情，偶爾也會跨足主持和作曲，喜歡不斷挑戰不同的自我。私底下的我其實很隨性直率，熱愛透過旅行去探索世界的每個角落，或者找個安靜的午後沉浸在閱讀的世界裡。最近正努力精進韓文與戲劇表演。期待能遇見一個可以陪我到處吃喝玩樂、一起分享生活趣事，也能接住我各種奇思妙想的人！',
  },
  {
    name: 'J-hope',
    age: 32,
    location: '台中市',
    job: '歌手、舞者',
    avatar: '/images/Boyfriend3.jpg',
    hobbies: ['健身', '舞蹈', '唱歌', '主持', '攝影'],
    intro: '你好！我是 J-hope。朋友總說我是大家的「維他命」，希望能為身邊的人帶來滿滿的正能量與歡樂。音樂和舞蹈是我的生命，平時除了待在練習室，我也很熱衷於健身來保持最佳的體態與活力。休假時我喜歡帶著相機到處走走，用攝影記錄下生活中的每個美好瞬間。期待能遇見那個頻率相通的妳，一起用笑容填滿未來的每一天！',
  }
])

const currentIndex = ref(0)
const showCard = ref(false)
const matchCount = ref(0)
const message = ref('')

function startMatch() {
  showCard.value = true
  message.value = ''
}

function nextPerson() {
  matchCount.value++

  if (matchCount.value >= 5) {
    showCard.value = false
    message.value = '今日配對已達上限'
    return
  }

  if (currentIndex.value < person.value.length - 1) {
    currentIndex.value++
  } else {
    showCard.value = false
    message.value = '請稍後再配對'
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center w-100" style="min-height: 70vh;">
    
    <div v-if="!showCard && !message" class="text-center fade-in-up">
      <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-lg mx-auto mb-4" 
           style="width: 120px; height: 120px; color: white;">
        <i class="bi bi-fire display-3"></i>
      </div>
      <h2 class="fw-bold text-gradient mb-3">準備好開始配對了嗎？</h2>
      <p class="text-muted mb-4">點擊下方按鈕開始尋找你的理想對象</p>
      
      <button class="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" @click="startMatch">
        <i class="bi bi-search-heart me-2"></i> 開始配對
      </button>
    </div>

    <div v-else-if="message" class="text-center fade-in-up">
      <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border" 
           style="width: 100px; height: 100px; color: var(--text-muted);">
        <i class="bi bi-emoji-frown display-4"></i>
      </div>
      <h3 class="fw-bold text-gradient mb-3">{{ message }}</h3>
      <p class="text-muted">請稍後再嘗試，或升級 Premium 解鎖更多配對！</p>
      
      <button class="btn btn-outline-secondary rounded-pill mt-3 btn-sm" @click="matchCount = 0; currentIndex = 0; message = ''">
        重新測試 (開發用)
      </button>
    </div>

    <div v-else-if="showCard" class="card-wrapper fade-in-up w-100 d-flex justify-content-center">
      <ProfileCard :person="person[currentIndex]" @like="nextPerson" @reject="nextPerson" />
    </div>

  </div>
</template>