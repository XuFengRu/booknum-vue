<script setup>
import { ref } from 'vue'
import DatingCard from '@/components/datingCard.vue'

const selectedUser = ref(null)

const users = [
  {
    name: "小璇",
    age: 24,
    location: "台中市",
    job: "插畫家",
    hobbies: ["繪畫", "甜點", "音樂"],
    intro: "喜歡畫畫和甜點，常常在咖啡廳裡找靈感。",
    avatar:
      "https://tse1.explicit.bing.net/th/id/OIP.oNhqGpeiNEpFUwK_c2khawHaKz?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "阿琦",
    age: 27,
    location: "高雄市",
    job: "攝影師",
    hobbies: ["攝影", "旅行", "籃球"],
    intro: "喜歡捕捉生活的瞬間，也愛運動和旅行。",
    avatar: "https://p6.itc.cn/q_70/images03/20220830/f5a9acf9df9f481a8d44e55441eaeb46.jpeg",
  },
];


function openProfile(index) {
  selectedUser.value = index
}
</script>

<template>
  <div class="container">


    <main class="likes-page">
      <!-- 列表頁 -->
      <template v-if="selectedUser === null">
        <h1 class="text-gradient">心動對象</h1>
        <p class="summary">
          目前有 <span class="text-primary">{{ users.length }}</span> 個心動對象
        </p>

        <div class="card-grid">
          <div
            v-for="(user, index) in users"
            :key="index"
            class="preview-card"
          >
            <img :src="user.avatar" class="avatar" />
            <h4 class="name-age">{{ user.name }} {{ user.age }}</h4>

            <!-- 底部資訊區塊 -->
            <div class="card-footer">
              <p class="location">{{ user.location }}</p>
            </div>
            <button
              @click="openProfile(index)"
              class="view-btn-top btn-outline-primary"
            >
              <i class="bi bi-eye"></i>
            </button>
          </div>
        </div>
      </template>

      <!-- 單一卡片頁 -->
      <template v-else>
        <button @click="selectedUser = null" class="back btn-outline-primary">
          <i class="bi-x"></i> 返回
        </button>
        <div class="profile-page">
          <DatingCard :person="users[selectedUser]" />
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}
.likes-page {
  flex: 1;
  padding: 2rem;
  text-align: center;
}
.summary {
  margin-bottom: 1rem;
}
.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.preview-card {
  width: 210px;
  height: 280px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 5px #6e6b6b;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.card-footer {
  position: absolute;
  bottom: 0px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name-age {
  position: absolute;
  bottom: 32px;
  left: 10px;
  color: white;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
}

.location {
  font-size: 0.9rem;
  color: white;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
}

/* 查看按鈕 */
.view-btn-top {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;

}

.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.back {
  margin-bottom: 1rem;
  border-radius: 6px;
  
}
</style>