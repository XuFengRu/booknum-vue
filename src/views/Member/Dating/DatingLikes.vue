<script setup>
import { ref } from 'vue'
import DatingCard from '@/components/datingCard.vue'

const isPremium = ref(false)
const selectedUser = ref(null)

const users = [
  {
    name: '小鄧',
    age: 25,
    location: '台北市',
    job: '平面設計師',
    hobbies: ['旅行', '攝影', '咖啡', '爬山', '閱讀'],
    intro: '喜歡旅行和攝影，熱愛探索世界的每個角落。週末...',
    avatar: 'https://dimg04.c-ctrip.com/images/1hq2n12000r400lb370CE.jpg',
  },
  {
    name: '阿MO',
    age: 28,
    location: '新竹市',
    job: '前端工程師',
    hobbies: ['健身', '電影', '音樂', '程式'],
    intro: '喜歡挑戰新技術，也愛看科幻片和聽搖滾樂。',
    avatar:
      'https://tse2.mm.bing.net/th/id/OIP.Tr8tQzSlcsEZR7LV04CkkQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
]

function openProfile(index) {
  selectedUser.value = index
}
</script>

<template>
  <div class="container">

    <main class="likes-page">
      <!-- 當 selectedUser 為 null 時顯示列表 -->
      <template v-if="selectedUser === null">
        <h1 class="text-gradient">誰喜歡我</h1>
        <p class="summary">
          有 <span class="text-primary">{{ users.length }}</span> 個人喜歡你
        </p>

        <label class="toggle">
          <input type="checkbox" v-model="isPremium" />
          Premium
        </label>

        <div class="card-grid">
          <template v-if="isPremium">
            <div
              v-for="(user, index) in users"
              :key="index"
              class="preview-card"
            >
              <img :src="user.avatar" class="preview-avatar" />
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
          </template>

          <template v-else>
            <div
              v-for="(user, index) in users"
              :key="index"
              class="locked-card"
            >
              <div class="locked-avatar-wrapper">
                <img :src="user.avatar" class="locked-avatar" />
              </div>
              <div class="diamond"><i class="bi bi-gem"></i></div>
              <p class="locked-text">升級至 BookPremium</p>
              <p class="locked-sub">查看誰喜歡你</p>
              <button class="upgrade-btn">立即升級</button>
            </div>
          </template>
        </div>
      </template>

      <!-- 當 selectedUser 不為 null 時顯示單一卡片 -->
      <template v-else>
       <button @click="selectedUser = null" class="back btn-outline-primary"><i class="bi-x"></i>返回</button>
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
.toggle {
  margin-bottom: 1.5rem;
  display: inline-block;
}
.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.preview-card,
.locked-card {
  width: 210px;
  height: 280px;
  border-radius: 12px;

  text-align: center;
  position: relative;
}
.preview-card {
  width: 210px;
  height: 280px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 5px #6e6b6b;
  position: relative; /* 讓 footer 可以絕對定位在卡片內 */
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
  bottom: 0px; /* 貼齊卡片底部 */
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center;
}

.name-age {
  position: absolute;
  bottom: 32px; /* 放在圖片底部 */
  left: 10px;
  color: white;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
}

.location {
  font-size: 0.9rem;
  color: white;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
}

.preview-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}


.view-btn {
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
}

.locked-card {
  background: #f5f5f5;
  overflow: hidden;
}
.locked-avatar-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
}
.locked-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(4px);
}

.diamond,
.locked-text,
.locked-sub,
.upgrade-btn {
  position: relative;
  z-index: 2;
}

.diamond {
  font-size: 2rem;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  margin-top: 2.5rem;
}
.locked-text {
  font-weight: bold;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  font-size: 1.2rem;
}
.locked-sub {
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
}
.upgrade-btn {
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
}
.upgrade-btn:hover {
  background: linear-gradient(135deg, #fed11b, #ffde69);
  transform: translateY(-2px); 
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}



/* 右上角查看按鈕 */
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 卡片靠上顯示 */
}


.back {
  margin-bottom: 1rem;
  border-radius: 6px;
}

</style>
