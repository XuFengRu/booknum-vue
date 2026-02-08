<script setup>
import ProfileCard from '@/components/datingCard.vue'
import { ref } from 'vue'

const person = ref([
  {
    name: '小魚',
    age: 25,
    location: '台北市',
    job: '平面設計師',
    avatar: 'https://pic4.zhimg.com/v2-37bd36f3e158683ecb875e124cff305f_r.jpg',
    hobbies: ['旅行', '攝影', '咖啡', '爬山', '閱讀'],
    intro: '喜歡旅行和攝影，熱愛探索世界的每個角落...',
  },
  {
    name: '小華',
    age: 28,
    location: '台中市',
    job: '工程師',
    avatar:
      'https://tse1.explicit.bing.net/th/id/OIP.2f8ONfRuhbpCwQzu7e9LaQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    hobbies: ['健身', '程式', '美食'],
    intro: '喜歡挑戰新技術，也愛運動保持活力。',
  },
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
  <div class="innercontainer">
    <!-- 初始畫面 -->
    <div class="content" v-if="!showCard && !message">
      <div class="flame"><i class="bi-fire"></i></div>
      <h1 class="text-gradient">準備好開始配對了嗎？</h1>
      <p>點擊下方按鈕開始尋找你的理想對象</p>
      <button class="start-btn btn-primary" @click="startMatch">開始配對</button>
    </div>

    <!-- 提示訊息 -->
    <div v-if="message" class="content text-gradient">
      <i class="bi-emoji-frown fs-2"></i>
      <h2>{{ message }}</h2>
    </div>

    <!-- 配對卡片 -->
    <div v-else-if="showCard" class="card-wrapper">
      <ProfileCard :person="person[currentIndex]" @like="nextPerson" @reject="nextPerson" />
    </div>
  </div>
</template>

<style scoped>
.innercontainer {
  display: flex;
  height: 100vh;
  justify-content: center;
}

/* 初始畫面 */
.content {
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 12%;
  border-radius: 12px;
  text-align: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: 0.5rem;
}

.content .flame {
  font-size: 4.5rem;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff1a53 0%, #ff7b1a 100%);
  box-shadow: 5px 5px 10px 0 #d4d4d4;
  color: #fff;
}

.content h1 {
  margin-bottom: 1rem;
}

.content p {
  color: #555;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.start-btn {
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.start-btn:hover {
  background-color: #ff4081;
  transform: scale(1.05);
}

@media (min-width: 1200px) {
  .card-wrapper {
    margin-top: 6%;
  }
}
</style>
