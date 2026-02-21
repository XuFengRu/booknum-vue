<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DatingCard from '@/components/datingCard.vue'

const isPremium = ref(false)
const selectedUser = ref(null)

const users = [
  {
    name: '小雅',
    age: 25,
    location: '台北市',
    job: '平面設計師',
    hobbies: ['看展', '下午茶', '攝影', '底片相機'],
    intro: '喜歡用鏡頭記錄生活，週末常常在各大美術館或文青咖啡廳出沒。個性比較慢熟，但熟了之後是個會陪你瘋到底的女孩。',
    avatar: '/images/Girlfriend1.jpg',
  },
  {
    name: 'Bella',
    age: 28,
    location: '台中市',
    job: '時尚模特兒',
    hobbies: ['健身', '品酒', '高爾夫', '皮拉提斯'],
    intro: '平時工作節奏快，希望休假時能找個人一起享受微醺的週末夜晚。喜歡保持自律的生活，如果你也愛運動，那就太棒了！',
    avatar: '/images/Girlfriend2.jpg',
  },
  {
    name: '恩熙',
    age: 24,
    location: '高雄市',
    job: '咖啡廳店長',
    hobbies: ['烘焙', '旅行', '音樂', '手作'],
    intro: '自己經營一家小咖啡廳，雖然忙碌但每天都很充實。假日的樂趣是開發新甜點，想找個能一起分享咖啡香與療癒時光的人。',
    avatar: '/images/Girlfriend3.jpg',
  },
  {
    name: '小琪',
    age: 22,
    location: '新北市',
    job: '大學生',
    hobbies: ['桌遊', '電影', '密室逃脫', '動漫'],
    intro: '超愛玩桌遊跟劇本殺！個性活潑開朗，腦袋裡裝著各種天馬行空的想法。如果你也是遊戲咖，我們絕對可以玩在一塊！',
    avatar: '/images/Girlfriend4.jpg',
  },
  {
    name: '萱萱',
    age: 26,
    location: '台北市',
    job: '行銷企劃',
    hobbies: ['逛街', '美食', '探店', '看劇'],
    intro: '標準的吃貨一枚，手機裡存了滿滿的美食清單，從路邊攤到米其林都愛。誰要陪我一起去把清單上的餐廳都踩點一遍？',
    avatar: '/images/Girlfriend5.jpg',
  },
  {
    name: '舒華',
    age: 26,
    location: '桃園市',
    job: '歌手、舞者',
    hobbies: ['旅行', '戲劇', '韓文', '舞蹈', '閱讀', '作曲'],
    intro: '哈囉！我是舒華。平時在舞台上享受唱歌與跳舞的熱情，偶爾也會跨足主持和作曲。私底下的我隨性直率，期待能遇見一個可以陪我到處吃喝玩樂、一起分享生活趣事的人！',
    avatar: '/images/Girlfriend6.jpg',
  },
  {
    name: '芷瑜',
    age: 27,
    location: '台南市',
    job: '自由插畫家',
    hobbies: ['畫畫', '底片相機', '看海', '爵士樂'],
    intro: '喜歡海浪的聲音和底片洗出來的驚喜感。是個內心世界很豐富的浪漫主義者，希望能遇到一個願意聽我分享日常瑣事與靈感的人。',
    avatar: '/images/Girlfriend7.jpg',
  }
]

function openProfile(index) {
  selectedUser.value = index
}

function handleLike(person) {
  console.log('Liked:', person?.name)
  selectedUser.value = null 
}

function handleReject(person) {
  console.log('Rejected:', person?.name)
  selectedUser.value = null 
}
</script>

<template>
  <div class="w-100 fade-in-up">
    
    <template v-if="selectedUser === null">
      <div class="position-relative mb-4 text-center fade-in-up">
        <h2 class="fw-bold text-gradient mb-2">誰喜歡我</h2>
        <p class="text-muted">
          目前有 <span class="fw-bolder text-primary fs-5 mx-1">{{ users.length }}</span> 個人對你心跳加速
        </p>

        <div class="position-absolute top-0 end-0" style="z-index: 10;">
          <div class="form-check form-switch bg-white rounded-pill shadow-sm px-3 py-2 border d-inline-flex align-items-center gap-2 transition-all hover-shadow">
            <label class="form-check-label small fw-bold text-muted mb-0 d-none d-md-flex align-items-center" for="premiumToggle" style="cursor: pointer;">
              <i class="bi bi-eye-fill me-2 text-primary opacity-75"></i> 預覽 Premium 視角
            </label>
            <input class="form-check-input m-0 fs-5" type="checkbox" role="switch" id="premiumToggle" v-model="isPremium" style="cursor: pointer;" title="預覽 Premium">
          </div>
        </div>
      </div>

      <div v-if="users.length === 0" class="text-center py-5 my-5 fade-in-up">
        <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border" 
             style="width: 100px; height: 100px; color: var(--text-muted);">
          <i class="bi bi-inbox display-4"></i>
        </div>
        <h4 class="fw-bold text-muted mb-3">目前還沒收到喜歡</h4>
        <p class="text-muted mb-4">別氣餒！多去滑幾張卡片，或者豐富一下自我介紹，緣分很快就會出現。</p>
        
        <RouterLink to="/member/dating" class="btn btn-primary rounded-pill fw-bold shadow-sm fs-5">
          <i class="bi bi-search-heart me-2"></i>去配對看看
        </RouterLink>
      </div>

      <div class="row g-4">
        <div v-for="(user, index) in users" :key="index" class="col-6 col-md-4 col-xl-3">
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

          <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative bg-dark user-card">
            <div class="ratio image-ratio">
              <img :src="user.avatar" class="w-100 h-100 object-fit-cover blur-img" alt="locked">
            </div>
            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 locked-overlay">            
              <div class="gem-icon-wrapper mb-3">
                <i class="bi bi-gem display-4 text-warning" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));"></i>
              </div>
              <h5 class="fw-bold text-white text-shadow mb-2">升級 Premium</h5>
              <p class="text-white text-shadow mb-4 px-2">解鎖對你心動的對象，不再錯過任何緣分。</p>
              <RouterLink :to="{ name: 'member-bookpremium' }" class="btn btn-warning rounded-pill fw-bold shadow-lg fs-5">
                立即解鎖
              </RouterLink>
            </div>
          </div>
        </div>
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