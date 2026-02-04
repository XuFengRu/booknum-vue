<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const keyword = ref("");

const activities = ref([
  {
    id: 1,
    title: "一起吃拉麵（新宿）",
    category: "吃飯",
    people: 4,
    need: 8,
    joined: 6,
    isJoinedByMe: false,
    startAt: "2026/02/03 19:00",
    endAt: "2026/02/03 21:00",
    location: "台北市 信義區",
    image:
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1200&q=80",
  },
  {
    id: 2,
    title: "周末爬山（象山）",
    category: "運動",
    people: 8,
    need: 10,
    joined: 2,
    isJoinedByMe: true,
    startAt: "2026/02/08 09:00",
    endAt: "2026/02/08 12:00",
    location: "台北市 信義區",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  },
  {
    id: 3,
    title: "桌遊之夜（狼人殺）",
    category: "桌遊",
    people: 10,
    need: 10,
    joined: 10,
    isJoinedByMe: false,
    startAt: "2026/02/12 19:30",
    endAt: "2026/02/12 22:30",
    location: "新北市 板橋區",
    image:
      "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab4?w=1200&q=80",
  },
]);

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  if (!k) return activities.value;
  return activities.value.filter((a) =>
    [a.title, a.location, a.category].some((v) =>
      String(v).toLowerCase().includes(k)
    )
  );
});

function goCreate() {
  router.push({ name: "activity-new" });
}
function goDetail(id) {
  router.push({ name: "activity-detail", params: { id } });
}

function toggleJoin(a) {
  if (a.isJoinedByMe) {
    a.joined = Math.max(0, a.joined - 1);
    a.isJoinedByMe = false;
    return;
  }
  if (a.joined >= a.need) return;
  a.joined += 1;
  a.isJoinedByMe = true;
}

function isFull(a) {
  return a.joined >= a.need;
}
</script>

<template>
  <div class="container py-4 activity-page">
    <div class="activity-panel p-4 rounded-4 border shadow-sm">
      <!-- 標題 -->
      <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <div class="title-pill">
              <i class="fa-solid fa-flag me-2"></i>
              熱門揪團
            </div>
          </div>

          <div class="text-muted subtitle mt-2">
            用關鍵字搜尋標題 / 地點 / 類型，快速找到你要的活動
          </div>
        </div>

        <button class="btn btn-gradient px-4 rounded-pill btn-lgish" @click="goCreate">
          <i class="fa-solid fa-plus me-2"></i>建立活動
        </button>
      </div>

      <!-- 搜尋 -->
      <div class="mt-3">
        <input
          v-model="keyword"
          class="form-control search-input"
          placeholder="輸入關鍵字..."
        />
      </div>

      <!-- 列表 -->
      <div class="row g-3 mt-2">
        <div v-for="a in filtered" :key="a.id" class="col-12">
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden activity-card">
            <div class="row g-0">
              <!-- 圖片 -->
              <div class="col-12 col-md-4">
                <div class="img-wrap">
                  <img :src="a.image" :alt="a.title" />
                </div>
              </div>

              <!-- 內容 -->
              <div class="col-12 col-md-8">
                <div class="card-body p-3 p-md-4">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div class="flex-grow-1">
                      <h5 class="fw-bold mb-2 text-dark title-text">
                        {{ a.title }}
                      </h5>

                      <div class="text-muted meta-text mb-2">
                        類型：{{ a.category }}｜人數：{{ a.people }}
                        <span class="ms-2">
                          已報名
                          <b class="text-dark">{{ a.joined }}</b>
                          /
                          <b class="text-dark">{{ a.need }}</b>
                        </span>

                        <span
                          v-if="a.isJoinedByMe"
                          class="ms-2 badge-pill badge-pill--hot"
                        >
                          你已報名
                        </span>

                        <span
                          v-else-if="isFull(a)"
                          class="ms-2 badge-pill badge-pill--full"
                        >
                          額滿
                        </span>
                      </div>

                      <div class="row gy-2 info-text text-dark">
                        <div class="col-12 col-lg-6">
                          <i class="fa-regular fa-clock me-2 text-muted"></i>
                          {{ a.startAt }} ～ {{ a.endAt }}
                        </div>
                        <div class="col-12 col-lg-6">
                          <i class="fa-solid fa-location-dot me-2 text-muted"></i>
                          {{ a.location }}
                        </div>
                      </div>
                    </div>

                    <!-- 按鈕 -->
                    <div class="d-flex flex-column flex-sm-row gap-2 align-items-start">
                      <button
                        class="btn btn-outline-primary rounded-pill px-3 btn-lgish"
                        @click="goDetail(a.id)"
                      >
                        查看
                      </button>

                      <button
                        class="btn rounded-pill px-3 btn-lgish"
                        :class="
                          a.isJoinedByMe
                            ? 'btn-outline-danger'
                            : isFull(a)
                              ? 'btn-full'
                              : 'btn-gradient'
                        "
                        :disabled="(!a.isJoinedByMe && isFull(a))"
                        @click="toggleJoin(a)"
                      >
                        {{
                          a.isJoinedByMe
                            ? '取消報名'
                            : isFull(a)
                              ? '已額滿'
                              : '報名'
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /內容 -->
            </div>
          </div>
        </div>

        <div v-if="filtered.length === 0" class="col-12">
          <div class="text-center text-muted py-5 empty-text">
            目前沒有符合條件的活動
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-page {
  color: #111;
}
.activity-panel {
  background: #fff;
}

/* 標題漸層 */
.title-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
  box-shadow: 0 8px 18px rgba(255, 77, 109, 0.22);
}
.subtitle {
  font-size: 15px;
}

/* 搜尋 */
.search-input {
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 16px;
}

/* 圖片 */
.img-wrap {
  height: 230px;
  width: 100%;
  overflow: hidden;
  background: #f2f2f2;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 卡片 */
.activity-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.activity-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

/* 內容字 */
.title-text { font-size: 20px; }
.meta-text { font-size: 15px; }
.info-text { font-size: 15px; }
.empty-text { font-size: 16px; }

/* 按鈕 */
.btn-lgish {
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.btn-gradient {
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
  color: #fff;
  border: none;
}
.btn-gradient:hover { opacity: 0.92; }

.btn-full {
  background: #eef0f3;
  color: #8a8f98;
  border: none;
  cursor: not-allowed;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  vertical-align: middle;
}

/* 漸層版本 */
.badge-pill--hot {
  color: #fff;
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
}

/* 灰色版本 */
.badge-pill--full {
  color: #5f6772;
  background: #e9ecef;
}
</style>
