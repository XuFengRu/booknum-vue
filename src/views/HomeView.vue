<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
// 引入拆分出去的元件
import MemberCard from '@/components/MemberCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'

// --- 1. Navbar 滾動變色邏輯 ---
const handleScroll = () => {
  const navbar = document.body.querySelector('#mainNavbar')
  if (!navbar) return
  if (window.scrollY === 0) {
    navbar.classList.remove('navbar-shrink')
  } else {
    navbar.classList.add('navbar-shrink')
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- 2. 會員卡片資料與篩選 ---
const currentFilter = ref('all')

const setFilter = (category) => {
  currentFilter.value = category
}

const members = [
  { 
    id: 1, 
    category: 'women', 
    name: '氣質女神 - 小雅', 
    image: '/images/Girlfriend1.jpg', 
    tag: 'NEW ARRIVAL', 
    tagColor: 'danger', 
    specialty: '專長：看展、下午茶', 
    price: '$600 / hr' 
  },
  { 
    id: 2, 
    category: 'limited', 
    name: '高冷御姐 - Bella', 
    image: '/images/Girlfriend2.jpg', 
    tag: 'VIP ONLY', 
    tagColor: 'dark', 
    specialty: '專長：出席晚宴、商務伴遊', 
    price: '$1,500 / hr' 
  },
  { 
    id: 3, 
    category: 'men', 
    name: '陽光型男 - Mark', 
    image: '/images/Boyfriend1.jpg', 
    tag: 'POPULAR', 
    tagColor: 'danger', 
    specialty: '專長：健身、戶外活動', 
    price: '$800 / hr' 
  },
  { 
    id: 4, 
    category: 'accessories', 
    name: '週末桌遊局', 
    image: '/images/Girlfriend4.jpg', 
    tag: 'GROUP', 
    tagColor: 'secondary', 
    specialty: '地點：台北市大安區', 
    price: '$300 / 人' 
  },
  { 
    id: 5, 
    category: 'women', 
    name: '鄰家女孩 - 萱萱', 
    image: '/images/Girlfriend5.jpg', 
    tag: 'NEW', 
    tagColor: 'secondary', 
    specialty: '專長：逛街、聊天', 
    price: '$500 / hr' 
  },
  { 
    id: 6, 
    category: 'men', 
    name: '潮流帥哥 - Jay', 
    image: '/images/Boyfriend2.jpg', 
    tag: 'HOT', 
    tagColor: 'danger', 
    specialty: '專長：穿搭建議、攝影', 
    price: '$900 / hr' 
  },
  { 
    id: 7, 
    category: 'limited', 
    name: '一日男友體驗', 
    image: '/images/Girlfriend6.jpg', 
    tag: 'EXCLUSIVE', 
    tagColor: 'danger', 
    specialty: '全套約會行程規劃', 
    price: '$3,000 / day' 
  },
  { 
    id: 8, 
    category: 'accessories', 
    name: '電影鑑賞團', 
    image: '/images/Girlfriend7.jpg', 
    tag: 'POPULAR', 
    tagColor: 'danger', 
    specialty: '信義威秀影城', 
    price: '費用自付' 
  }
]

const filteredMembers = computed(() => {
  if (currentFilter.value === 'all') {
    return members
  }
  return members.filter(member => member.category === currentFilter.value)
})

// --- 3. 評論資料 ---
const reviews = [
  {
    id: 1,
    review: "原本只是想找人陪我參加婚禮，沒想到遇到這麼聊得來的朋友！BOOK仁的審核機制讓人很安心。",
    name: "Sarah Chen",
    job: "上班族",
    avatar: "S"
  },
  {
    id: 2,
    review: "透過揪團功能認識了一群喜歡登山的夥伴，週末終於不用宅在家了！平台的操作非常直覺方便。",
    name: "Marcus Wang",
    job: "軟體工程師",
    avatar: "M"
  },
  {
    id: 3,
    review: "使用了出租女友服務，體驗非常棒。對象非常準時且貼心，完全緩解了我面對長輩催婚的壓力。",
    name: "Alex Lin",
    job: "創業者",
    avatar: "A"
  }
]
</script>

<template>
  <div id="home">
    
    <nav class="navbar navbar-expand-lg fixed-top shadow-sm transition-all" id="mainNavbar">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center fw-bold fs-3" href="#home">
          <span class="text-gradient">BOOK仁</span>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="d-none d-md-flex align-items-center gap-4 position-absolute start-50 translate-middle-x">
            <a href="#home" class="nav-link fw-bold text-gradient-hover active">首頁</a>
            <a href="#collections" class="nav-link fw-bold text-muted text-gradient-hover">精選</a>
            <a href="#featured" class="nav-link fw-bold text-muted text-gradient-hover">關於我們</a>
            <a href="#contact" class="nav-link fw-bold text-muted text-gradient-hover">聯絡我們</a>
          </div>
          <div class="ms-auto">
            <RouterLink to="/login" class="btn btn-primary text-white rounded-pill px-4 fw-bold">開始尋找</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <section class="hero-section d-flex align-items-center position-relative overflow-hidden"
      style="min-height: 100vh; padding-top: 80px;">
      <div class="blob-bg"></div>
      <div class="container position-relative z-2">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
            <span class="badge bg-gradient text-white border border-white rounded-pill px-3 py-2 mb-3 fw-bold">✨ Find Your Perfect Match</span>
            <h1 class="display-3 fw-bolder lh-1 mb-4">
              尋找你的 <br> <span class="text-gradient">專屬心動</span>
            </h1>
            <p class="lead text-muted mb-5">
              全台最大的社交媒合平台。無論是出租男女友、尋找心動配對，還是週末揪團活動，BOOK仁都能為您找到最合適的夥伴。
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
              <a href="#collections" class="btn btn-primary btn-lg rounded-pill px-5 text-white shadow-lg">尋找命定</a>
              <a href="#featured" class="btn btn-white btn-lg rounded-pill px-5 text-dark shadow-sm border">熱門揪團</a>
            </div>
            <div class="d-flex gap-5 mt-5 justify-content-center justify-content-lg-start">
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-dark m-0">5000+</h4><small class="text-muted">優質會員</small>
              </div>
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-dark m-0">1Hr</h4><small class="text-muted">快速約會</small>
              </div>
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-dark m-0">100%</h4><small class="text-muted">真人認證</small>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div id="heroCarousel" class="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="4000">
                  <img src="/images/Girlfriend1.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model 1">
                </div>
                <div class="carousel-item" data-bs-interval="4000">
                  <img src="/images/Girlfriend2.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model 2">
                </div>
                <div class="carousel-item" data-bs-interval="4000">
                  <img src="/images/Girlfriend3.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model 3">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light" id="collections">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="fw-bold display-5 mb-3">熱門推薦</h2>
          <p class="text-muted">發現您感興趣的對象與活動</p>

          <div class="d-flex justify-content-center flex-wrap gap-2 mt-4" id="collection-filters">
            <button class="btn btn-filter rounded-pill px-4" :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">全部</button>
            <button class="btn btn-filter rounded-pill px-4" :class="{ active: currentFilter === 'women' }" @click="setFilter('women')">出租女友</button>
            <button class="btn btn-filter rounded-pill px-4" :class="{ active: currentFilter === 'men' }" @click="setFilter('men')">出租男友</button>
            <button class="btn btn-filter rounded-pill px-4" :class="{ active: currentFilter === 'accessories' }" @click="setFilter('accessories')">揪團活動</button>
            <button class="btn btn-filter rounded-pill px-4" :class="{ active: currentFilter === 'limited' }" @click="setFilter('limited')">限定企劃</button>
          </div>
        </div>

        <div class="row g-4" id="collectionsGrid">
          <div v-for="member in filteredMembers" :key="member.id" class="col-md-6 col-lg-3">
            <MemberCard 
              :image="member.image"
              :name="member.name"
              :tag="member.tag"
              :tag-color="member.tagColor"
              :specialty="member.specialty"
              :price="member.price"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 position-relative overflow-hidden" id="featured">
      <div class="container py-5">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 order-lg-1 order-2">
            <div class="pe-lg-5">
              <span class="text-gradient text-uppercase fw-bold letter-spacing-2 small">Connected by Fate</span>
              <h2 class="display-5 fw-bold my-3">遇見你的專屬緣分</h2>
              <p class="text-muted mb-4 lh-lg">
                在繁忙的城市中，我們為您串起人與人之間的連結。BOOK仁 透過嚴格的審核機制與智能配對，確保每一次的相遇都是安全、愉快且令人心動的體驗。
              </p>
              <div class="row g-3 mb-5">
                <div class="col-4">
                  <div class="card card-hover h-100 border-0 shadow-sm rounded-4 p-3 text-center align-items-center">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px;">
                      <span class="fs-4">👑</span>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">嚴格審核</h6>
                    <p class="text-muted mb-0 d-none d-md-block" style="font-size: 0.75rem; line-height: 1.4;">雙重身份驗證</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card card-hover h-100 border-0 shadow-sm rounded-4 p-3 text-center align-items-center">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px;">
                      <span class="fs-4">🔒</span>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">安全隱私</h6>
                    <p class="text-muted mb-0 d-none d-md-block" style="font-size: 0.75rem; line-height: 1.4;">個資絕對保密</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card card-hover h-100 border-0 shadow-sm rounded-4 p-3 text-center align-items-center">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px;">
                      <span class="fs-4">✨</span>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">精準配對</h6>
                    <p class="text-muted mb-0 d-none d-md-block" style="font-size: 0.75rem; line-height: 1.4;">AI 興趣媒合</p>
                  </div>
                </div>
              </div>
              <a href="#collections" class="btn btn-primary btn-lg rounded-pill px-5 text-white shadow-lg fs-6 fw-bold">了解會員權益</a>
            </div>
          </div>
          <div class="col-lg-6 order-lg-2 order-1">
            <div class="row g-3">
              <div class="col-8">
                <img src="/images/Boyfriend4.jpg" class="w-100 h-100 object-fit-cover rounded-4 shadow-sm" style="min-height: 400px;" alt="Social Life">
              </div>
              <div class="col-4">
                <div class="vstack gap-3 h-100">
                  <img src="/images/Girlfriend4.jpg" class="w-100 h-50 object-fit-cover rounded-4 shadow-sm" alt="Dating">
                  <img src="/images/Girlfriend5.jpg" class="w-100 h-50 object-fit-cover rounded-4 shadow-sm" alt="Party">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 pt-5">
          <div class="text-center mb-5">
            <h3 class="fw-bold">成功案例</h3>
            <p class="text-muted">來自用戶的真實回饋</p>
          </div>
          <div class="row g-4">
            <div v-for="item in reviews" :key="item.id" class="col-md-4">
              <ReviewCard 
                :review="item.review"
                :name="item.name"
                :job="item.job"
                :avatar="item.avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light" id="contact">
      <div class="container py-5">
        <div class="mb-5">
          <h2 class="fw-bold mb-2">保持聯繫</h2>
          <p class="text-muted">我們希望能聽到您的聲音</p>
        </div>
        <div class="row g-4 mb-4">
          <div class="col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white h-100">
              <form id="contactForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="firstName" class="form-label text-muted small fw-bold">名字</label>
                      <input type="text" class="form-control form-control-lg rounded-3" id="firstName" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="lastName" class="form-label text-muted small fw-bold">姓氏</label>
                      <input type="text" class="form-control form-control-lg rounded-3" id="lastName" required>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label text-muted small fw-bold">電子郵件</label>
                  <input type="email" class="form-control form-control-lg rounded-3" id="email" required>
                </div>
                <div class="mb-3">
                  <label for="subject" class="form-label text-muted small fw-bold">主旨</label>
                  <input type="text" class="form-control form-control-lg rounded-3" id="subject" required>
                </div>
                <div class="mb-4">
                  <label for="message" class="form-label text-muted small fw-bold">訊息內容</label>
                  <textarea class="form-control form-control-lg rounded-3" id="message" style="height: 150px" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary text-white w-100 py-3 rounded-pill fw-bold shadow-sm form-submit-btn fs-5">發送訊息</button>
              </form>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white h-100 justify-content-center">
              <div class="vstack gap-5">
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">營運總部</h5>
                    <p class="text-muted mb-0 lh-base">
                      1314 Love Avenue<br>Taipei, Taiwan 10110<br>Xinyi District
                    </p>
                  </div>
                </div>
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">客服專線</h5>
                    <p class="text-muted mb-0 lh-base">
                      Main: <a href="tel:+886212345678" class="text-decoration-none text-muted fw-bold">+886 02 1234 5678</a><br>
                      Support: <a href="tel:+886287654321" class="text-decoration-none text-muted fw-bold">+886 02 8765 4321</a><br>
                      Mon-Fri, 9AM-6PM GMT+8
                    </p>
                  </div>
                </div>
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">電子信箱</h5>
                    <p class="text-muted mb-0 lh-base">
                      General: <a href="mailto:hello@bookNum.com" class="text-decoration-none text-muted fw-bold">hello@bookNum.com</a><br>
                      Support: <a href="mailto:support@bookNum.com" class="text-decoration-none text-muted fw-bold">support@bookNum.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div style="height: 350px;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7229.997163354079!2d121.55500897770992!3d25.034122200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2z5Y-w5YyXMTAx6LO854mp5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1769961636130!5m2!1szh-TW!2stw" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-white pt-5 pb-3 border-top">
      <div class="container">
        <div class="row g-5 mb-5">
          <div class="col-lg-4">
            <h3 class="fw-bold text-gradient mb-3">BOOK仁</h3>
            <p class="text-muted">致力於創造真實、安全、有趣的社交體驗。無論您在尋找靈魂伴侶、短期陪伴或是志同道合的夥伴，這裡都是您的最佳起點。</p>
            <div class="d-flex gap-3">
              <a href="#" class="social-btn">f</a>
              <a href="#" class="social-btn">i</a>
              <a href="#" class="social-btn">x</a>
            </div>
          </div>
          <div class="col-6 col-md-2 offset-lg-2">
            <h5 class="fw-bold mb-3">平台服務</h5>
            <ul class="list-unstyled text-muted lh-lg">
              <li><a href="#" class="text-decoration-none text-muted">最新會員</a></li>
              <li><a href="#" class="text-decoration-none text-muted">交友配對</a></li>
              <li><a href="#" class="text-decoration-none text-muted">出租男女友</a></li>
              <li><a href="#" class="text-decoration-none text-muted">揪團活動</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-2">
            <h5 class="fw-bold mb-3">幫助中心</h5>
            <ul class="list-unstyled text-muted lh-lg">
              <li><a href="#" class="text-decoration-none text-muted">聯絡客服</a></li>
              <li><a href="#" class="text-decoration-none text-muted">安全指南</a></li>
              <li><a href="#" class="text-decoration-none text-muted">常見問題</a></li>
              <li><a href="#" class="text-decoration-none text-muted">退款政策</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-2">
            <h5 class="fw-bold mb-3">關於我們</h5>
            <ul class="list-unstyled text-muted lh-lg">
              <li><a href="#" class="text-decoration-none text-muted">品牌故事</a></li>
              <li><a href="#" class="text-decoration-none text-muted">加入我們</a></li>
              <li><a href="#" class="text-decoration-none text-muted">合作提案</a></li>
              <li><a href="#" class="text-decoration-none text-muted">隱私權條款</a></li>
            </ul>
          </div>
        </div>
        <div class="border-top pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p class="text-muted small mb-0">© 2026 BOOK仁. All rights reserved. | Designed by HHL</p>
          <div class="d-flex gap-2 mt-3 mt-md-0">
            <span class="badge bg-light text-muted border">VISA</span>
            <span class="badge bg-light text-muted border">MC</span>
            <span class="badge bg-light text-muted border">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#mainNavbar {
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  padding-top: 20px;   
  padding-bottom: 20px;
}

#mainNavbar.navbar-shrink {
  background-color: #ffffff !important; 
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); 
  padding-top: 10px;
  padding-bottom: 10px;
}

@media (max-width: 991.98px) {
  #mainNavbar {
    background-color: #ffffff !important; 
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>