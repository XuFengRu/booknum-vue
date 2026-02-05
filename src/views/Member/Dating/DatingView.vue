<script setup>
import ProfileCard from '@/components/datingCard.vue'
import { ref } from 'vue'

// 模擬配對到的對象資料
const person = ref({
  name: '小魚',
  age: 25,
  location: '台北市',
  job: '平面設計師',
  avatar: 'https://pic4.zhimg.com/v2-37bd36f3e158683ecb875e124cff305f_r.jpg',
  hobbies: ['旅行', '攝影', '咖啡', '爬山', '閱讀'],
  intro: '喜歡旅行和攝影，熱愛探索世界的每個角落。週末喜歡去郊外走走，享受陽光和咖啡。',
})

// 控制是否顯示卡片
const showCard = ref(false)

function startMatch() {
  showCard.value = true
}

function backToStart() {
  showCard.value = false
}
</script>

<template>
  <div class="container">
    <!-- 初始畫面 -->
    <div class="content" v-if="!showCard">
      <div class="flame"><i class="bi-fire"></i></div>
      <h1 class="text-gradient">準備好開始配對了嗎？</h1>
      <p>點擊下方按鈕開始尋找你的理想對象</p>
      <button class="start-btn btn-primary" @click="startMatch">開始配對</button>
    </div>

    <!-- 配對卡片 -->
    <div v-else class="card-wrapper">
        <ProfileCard :person="person" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

/* 初始畫面 */
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  text-align: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
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
</style>
