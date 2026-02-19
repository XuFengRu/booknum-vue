<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import MemberCard from '@/components/MemberCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'

// --- 1. Navbar 滾動變色邏輯 (完全對應 home.html 裡的 script) ---
const handleScroll = () => {
  const navbar = document.getElementById('mainNavbar')
  if (!navbar) return
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.7)'
    navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
  } else {
    navbar.style.background = 'var(--glass-bg)'
    navbar.style.boxShadow = 'var(--glass-shadow)'
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
  { id: 1, category: 'women', name: '氣質女神 - 小雅', image: '/images/Girlfriend1.jpg', tag: 'NEW ARRIVAL', tagColor: 'danger', specialty: '專長：看展、下午茶', price: '$600 / hr' },
  { id: 2, category: 'limited', name: '高冷御姐 - Bella', image: '/images/Girlfriend2.jpg', tag: 'VIP ONLY', tagColor: 'dark', specialty: '專長：出席晚宴', price: '$1,500 / hr' },
  { id: 3, category: 'men', name: '陽光型男 - Mark', image: '/images/Boyfriend1.jpg', tag: 'POPULAR', tagColor: 'danger', specialty: '專長：健身、戶外', price: '$800 / hr' },
  { id: 4, category: 'accessories', name: '週末桌遊局', image: '/images/Girlfriend4.jpg', tag: 'GROUP', tagColor: 'secondary', specialty: '地點：台北大安', price: '$300 / 人' },
  { id: 5, category: 'women', name: '鄰家女孩 - 萱萱', image: '/images/Girlfriend5.jpg', tag: 'NEW', tagColor: 'secondary', specialty: '專長：逛街、聊天', price: '$500 / hr' },
  { id: 6, category: 'men', name: '潮流帥哥 - Jay', image: '/images/Boyfriend2.jpg', tag: 'HOT', tagColor: 'danger', specialty: '專長：穿搭、攝影', price: '$900 / hr' },
  { id: 7, category: 'limited', name: '一日男友體驗', image: '/images/Girlfriend6.jpg', tag: 'EXCLUSIVE', tagColor: 'danger', specialty: '全套約會行程', price: '$3,000 / day' },
  { id: 8, category: 'accessories', name: '電影鑑賞團', image: '/images/Girlfriend7.jpg', tag: 'POPULAR', tagColor: 'danger', specialty: '信義威秀影城', price: '費用自付' }
]

const filteredMembers = computed(() => {
  if (currentFilter.value === 'all') return members
  return members.filter(member => member.category === currentFilter.value)
})

// --- 3. 評論資料 ---
const reviews = [
  { id: 1, review: "原本只是想找人陪我參加婚禮，沒想到遇到這麼聊得來的朋友！BOOK仁的審核機制讓人很安心。", name: "Sarah Chen", job: "上班族", avatar: "S" },
  { id: 2, review: "透過揪團功能認識了一群喜歡登山的夥伴，週末終於不用宅在家了！", name: "Marcus Wang", job: "工程師", avatar: "M" },
  { id: 3, review: "體驗非常棒。對象非常準時且貼心，完全緩解了我面對長輩催婚的壓力。", name: "Alex Lin", job: "創業者", avatar: "A" }
]
</script>

<template>
  <div id="home">
    
    <nav class="navbar navbar-expand-lg fixed-top" id="mainNavbar" style="margin: 20px; transition: all 0.3s ease-in-out;">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center fw-bold fs-3 ps-2" href="#home">
          <i class="bi bi-heart-fill me-2" style="color: var(--bs-primary)"></i>
          <span class="text-gradient">BOOK仁</span>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="d-none d-md-flex align-items-center gap-2 position-absolute start-50 translate-middle-x">
            <a href="#home" class="nav-link active">首頁</a>
            <a href="#collections" class="nav-link">命定</a>
            <a href="#featured" class="nav-link">精選</a>
            <a href="#contact" class="nav-link">聯絡我們</a>
          </div>
          <div class="ms-auto pe-2">
            <RouterLink to="/login" class="btn btn-primary text-white rounded-pill px-4 fw-bold shadow-sm">
              <i class="bi bi-box-arrow-in-right me-1"></i> 開始尋找
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <section class="hero-section d-flex align-items-center position-relative overflow-hidden" style="min-height: 100vh; padding-top: 100px;">
      <div class="container position-relative z-2">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
            <span class="badge bg-white text-gradient border border-white rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm">
              ✨ Find Your Perfect Match
            </span>
            <h1 class="display-3 fw-bolder lh-1 mb-4" style="color: var(--text-main);">
              尋找你的 <br>
              <span class="text-gradient">專屬心動</span>
            </h1>
            <p class="lead text-muted mb-5">
              全台最大的社交媒合平台。無論是出租男女友、尋找心動配對，還是週末揪團活動，BOOK仁都能為您找到最合適的夥伴。
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
              <a href="#collections" class="btn btn-primary btn-lg rounded-pill px-5 text-white">尋找命定</a>
              <a href="#featured" class="btn btn-light btn-lg rounded-pill px-5 text-muted border" 
                 style="background: rgba(255,255,255,0.6) !important;">熱門揪團</a>
            </div>

            <div class="d-flex gap-5 mt-5 justify-content-center justify-content-lg-start">
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-gradient m-0">5000+</h4>
                <small class="text-muted">優質會員</small>
              </div>
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-gradient m-0">1Hr</h4>
                <small class="text-muted">快速約會</small>
              </div>
              <div class="text-center text-lg-start">
                <h4 class="fw-bold text-gradient m-0">100%</h4>
                <small class="text-muted">真人認證</small>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div id="heroCarousel" class="carousel slide carousel-fade rounded-4 overflow-hidden"
                 style="border: 4px solid rgba(255,255,255,0.4);" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="4000">
                  <img src="/images/Girlfriend1.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model">
                </div>
                <div class="carousel-item" data-bs-interval="4000">
                  <img src="/images/Girlfriend2.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model">
                </div>
                <div class="carousel-item" data-bs-interval="4000">
                  <img src="/images/Girlfriend3.jpg" class="d-block w-100 object-fit-cover" style="height: 600px;" alt="Model">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5" id="collections">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="fw-bold display-5 mb-3 text-gradient">熱門推薦</h2>
          <p class="text-muted">發現您感興趣的對象與活動</p>

          <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
            <button class="btn btn-outline-light rounded-pill px-4" :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">全部</button>
            <button class="btn btn-outline-light rounded-pill px-4" :class="{ active: currentFilter === 'women' }" @click="setFilter('women')">出租女友</button>
            <button class="btn btn-outline-light rounded-pill px-4" :class="{ active: currentFilter === 'men' }" @click="setFilter('men')">出租男友</button>
            <button class="btn btn-outline-light rounded-pill px-4" :class="{ active: currentFilter === 'accessories' }" @click="setFilter('accessories')">揪團活動</button>
            <button class="btn btn-outline-light rounded-pill px-4" :class="{ active: currentFilter === 'limited' }" @click="setFilter('limited')">限定企劃</button>
          </div>
        </div>

        <div class="row g-4 fade-in-up" :key="currentFilter">
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
                  <div class="card h-100 p-3 text-center align-items-center border-0">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px; color: white;">
                      <i class="bi bi-shield-check fs-4"></i>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">嚴格審核</h6>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card h-100 p-3 text-center align-items-center border-0">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px; color: white;">
                      <i class="bi bi-lock-fill fs-4"></i>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">安全隱私</h6>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card h-100 p-3 text-center align-items-center border-0">
                    <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width:50px;height:50px; color: white;">
                      <i class="bi bi-stars fs-4"></i>
                    </div>
                    <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">精準配對</h6>
                  </div>
                </div>
              </div>

              <a href="#collections" class="btn btn-primary btn-lg rounded-pill px-5 text-white shadow-lg fs-6 fw-bold">了解會員權益</a>
            </div>
          </div>
          <div class="col-lg-6 order-lg-2 order-1">
            <div class="row g-3">
              <div class="col-8">
                <img src="/images/Boyfriend4.jpg" class="w-100 h-100 object-fit-cover rounded-4 shadow-sm border border-white" style="min-height: 400px;" alt="Social Life">
              </div>
              <div class="col-4">
                <div class="vstack gap-3 h-100">
                  <img src="/images/Girlfriend4.jpg" class="w-100 h-50 object-fit-cover rounded-4 shadow-sm border border-white" alt="Dating">
                  <img src="/images/Girlfriend5.jpg" class="w-100 h-50 object-fit-cover rounded-4 shadow-sm border border-white" alt="Party">
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

    <section class="py-5" id="contact">
      <div class="container py-5">
        <div class="mb-5">
          <h2 class="fw-bold mb-2">保持聯繫</h2>
          <p class="text-muted">我們希望能聽到您的聲音</p>
        </div>
        <div class="row g-4 mb-4">
          <div class="col-lg-7">
            <div class="card p-4 p-lg-5 h-100">
              <form id="contactForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label text-muted small fw-bold">名字</label>
                      <input type="text" class="form-control" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label text-muted small fw-bold">姓氏</label>
                      <input type="text" class="form-control" required>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">電子郵件</label>
                  <input type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">主旨</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="mb-4">
                  <label class="form-label text-muted small fw-bold">訊息內容</label>
                  <textarea class="form-control" required style="height: 150px;"></textarea>
                </div>
                <button type="submit" class="btn btn-primary text-white w-100 py-3 rounded-pill fw-bold shadow-sm form-submit-btn fs-5">發送訊息</button>
              </form>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card p-4 p-lg-5 h-100 justify-content-center">
              <div class="vstack gap-5">
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px; color:white;">
                    <i class="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">營運總部</h5>
                    <p class="text-muted mb-0 lh-base">
                      1314 Love Avenue<br>Taipei, Taiwan 10110
                    </p>
                  </div>
                </div>
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px; color:white;">
                    <i class="bi bi-telephone-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">客服專線</h5>
                    <p class="text-muted mb-0 lh-base">
                      <a href="tel:+886212345678" class="text-muted fw-bold">+886 02 1234 5678</a>
                    </p>
                  </div>
                </div>
                <div class="d-flex align-items-start gap-4">
                  <div class="icon-circle bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width:50px;height:50px; color:white;">
                    <i class="bi bi-envelope-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-2">電子信箱</h5>
                    <p class="text-muted mb-0 lh-base">
                      <a href="mailto:hello@bookNum.com" class="text-muted fw-bold">hello@bookNum.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card overflow-hidden p-0">
              <div style="height: 350px;">
                <iframe src="https://maps.google.com/maps?q=Taipei&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="pt-5 pb-3" style="margin-top: 40px;">
      <div class="container">
        <div class="row g-5 mb-5">
          <div class="col-lg-4">
            <h3 class="fw-bold text-gradient mb-3">BOOK仁</h3>
            <p class="text-muted">致力於創造真實、安全、有趣的社交體驗。</p>
            <div class="d-flex gap-3">
              <a href="#" class="btn-social"><i class="bi bi-facebook"></i></a>
              <a href="#" class="btn-social"><i class="bi bi-instagram"></i></a>
              <a href="#" class="btn-social"><i class="bi bi-twitter-x"></i></a>
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
          <p class="text-muted small mb-0">© 2026 BOOK仁. All rights reserved.</p>
          <div class="d-flex gap-2 mt-3 mt-md-0">
            <span class="badge bg-light text-muted border">VISA</span>
            <span class="badge bg-light text-muted border">MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>