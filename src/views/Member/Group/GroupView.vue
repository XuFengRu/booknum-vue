<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const keyword = ref("");

/** ===== API 設定 ===== */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7091";

/** ===== 模擬登入使用者 ===== */
const CURRENT_USER = { id: 83, name: "Arille.M" };

/** ===== 本地暫存報名狀態 ===== */
const JOINED_KEY = `joined_activity_ids_user_${CURRENT_USER.id}_v1`;
const joinedIds = ref(new Set());

function loadJoinedIds() {
  try {
    const raw = localStorage.getItem(JOINED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    joinedIds.value = new Set(Array.isArray(arr) ? arr : []);
  } catch {
    joinedIds.value = new Set();
  }
}
function saveJoinedIds() {
  localStorage.setItem(JOINED_KEY, JSON.stringify([...joinedIds.value]));
}

/** ===== 畫面資料 ===== */
const activities = ref([]);
const showMine = ref(false);

/** ===== 工具：時間格式 ===== */
function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return `${d.getFullYear()}/${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} ${pad2(
    d.getHours()
  )}:${pad2(d.getMinutes())}`;
}

/** ===== fetch 包裝 ===== */
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return await res.json();
}

/** ===== 取得分類 ===== */
async function fetchCategoryMap() {
  const list = await fetchJson(`${API_BASE}/api/ActivityCategory`);
  const map = new Map();
  for (const c of list) {
    map.set(Number(c.categoryId), c.categoryName);
  }
  return map;
}

/** ===== 取得活動 ===== */
async function fetchActivities() {
  const categoryMap = await fetchCategoryMap();
  const list = await fetchJson(`${API_BASE}/api/Activity`);

  activities.value = list.map((x) => {
    const id = Number(x.activityId);
    const isJoinedByMe = joinedIds.value.has(id);

    return {
      id,
      title: x.title ?? "",
      category:
        categoryMap.get(Number(x.categoryId)) ?? `分類#${x.categoryId}`,
      need: Number(x.maxPeople ?? 0),
      joined: 0, // 後端目前沒有 joined 欄位
      isJoinedByMe,
      joinedUsers: [],
      startAt: formatDateTime(x.startAt),
      endAt: formatDateTime(x.endAt),
      location: x.location ?? "",
      image:
        "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1200&q=80",
    };
  });
}

/** ===== 初始化 ===== */
onMounted(async () => {
  loadJoinedIds();
  try {
    await fetchActivities();
  } catch (err) {
    console.error("API 讀取失敗:", err);
  }
});

/** ===== 搜尋 ===== */
const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  let list = activities.value;

  if (showMine.value) {
    list = list.filter((a) => a.isJoinedByMe);
  }

  if (!k) return list;

  return list.filter((a) =>
    [a.title, a.location, a.category].some((v) =>
      String(v ?? "").toLowerCase().includes(k)
    )
  );
});

/** ===== 跳頁 ===== */
function goCreate() {
  router.push({ name: "member-group-create" });
}
function goDetail(id) {
  router.push({ name: "member-group-detail", params: { id } });
}

/** ===== 報名（前端暫存） ===== */
function isFull(a) {
  return (Number(a.joined) || 0) >= (Number(a.need) || 0);
}

function toggleJoin(a) {
  const id = Number(a.id);

  if (a.isJoinedByMe) {
    const ok = window.confirm("確定要取消報名嗎？");
    if (!ok) return;

    a.isJoinedByMe = false;
    joinedIds.value.delete(id);
  } else {
    const ok = window.confirm("確定要報名這個活動嗎？");
    if (!ok) return;

    if (isFull(a)) return;

    a.isJoinedByMe = true;
    joinedIds.value.add(id);
  }

  saveJoinedIds();
}

function toggleMine() {
  showMine.value = !showMine.value;
}
</script>

<template>
  <div class="w-100 fade-in-up">
    
    <div class="position-relative d-flex justify-content-center w-100 mb-4 mb-xl-3" style="max-width: 1440px; margin: 0 auto;">
      
      <div class="text-center">
        <h2 class="fw-bolder text-gradient mb-2">熱門揪團</h2>
        <p class="text-muted">探索周邊活動，與志同道合的新朋友一起玩樂</p>
      </div>
      
      <button @click="goCreate" 
              class="btn btn-light shadow-sm btn-circle btn-circle-md custom-create-btn d-flex align-items-center justify-content-center" 
              title="建立活動">
        <i class="bi bi-plus-lg d-block" style="line-height: 0; font-size: 1.6rem;"></i>
      </button>

    </div>

    <div class="mx-auto" style="max-width: 1000px;">
      
      <div class="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center mb-4">
        
        <div class="input-group-custom flex-grow-1 w-100 mb-0">
          <input v-model="keyword" type="text" class="form-control bg-white shadow-sm border-0" 
                 style="border-radius: 50rem; height: 50px; padding-left: 48px;" 
                 :placeholder="showMine ? '在我的報名中搜尋...' : '搜尋活動標題、地點或類型...'" />
          <i class="bi bi-search"></i>
        </div>
        
        <button class="btn rounded-pill px-4 fw-bold shadow-sm flex-shrink-0 transition-all" 
                :class="showMine ? 'btn-primary' : 'btn-light border border-light-subtle text-muted'" 
                style="height: 50px;"
                @click="toggleMine">
          {{ showMine ? "全部活動" : "我的報名" }}
        </button>
      </div>

      <div class="d-flex flex-column gap-4">
        
        <div v-for="a in filtered" :key="a.id" class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style="--glass-bg: rgba(255, 255, 255, 0.95);">
          <div class="row g-0 h-100">
            
            <div class="col-md-4 col-lg-4">
              <img :src="a.image" :alt="a.title" class="w-100 h-100 object-fit-cover" style="min-height: 240px; object-position: center;" />
            </div>

            <div class="col-md-8 col-lg-8 p-4 d-flex flex-column">
              
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
                  <span class="badge bg-light text-dark border border-light-subtle rounded-pill px-3 py-1">{{ a.category }}</span>
                  <span v-if="a.isJoinedByMe" class="badge bg-danger rounded-pill px-3 py-1 shadow-sm"><i class="bi bi-check-circle-fill me-1"></i>已報名</span>
                  <span v-else-if="isFull(a)" class="badge bg-secondary rounded-pill px-3 py-1 shadow-sm">額滿</span>
                </div>
                <div class="text-muted small fw-bold text-nowrap mt-1">
                  報名人數: <span :class="isFull(a) ? 'text-danger' : 'text-primary'">{{ a.joined }}</span> / {{ a.need }}
                </div>
              </div>

              <h4 class="fw-bolder text-dark mb-3">{{ a.title }}</h4>

              <div class="row g-3 text-muted small fw-bold mb-4">
                <div class="col-sm-6 d-flex align-items-center">
                  <i class="bi bi-clock text-primary me-2"></i>
                  {{ a.startAt }}
                </div>
                <div class="col-sm-6 d-flex align-items-center">
                  <i class="bi bi-geo-alt text-primary me-2"></i>
                  {{ a.location }}
                </div>
              </div>

              <div class="mt-auto d-flex gap-2 justify-content-end pt-3 border-top border-light-subtle">
                <button class="btn btn-light rounded-pill px-4 fw-bold border border-light-subtle shadow-sm" @click="goDetail(a.id)">
                  查看詳情
                </button>
                <button
                  class="btn rounded-pill px-4 fw-bold shadow-sm"
                  :class="a.isJoinedByMe ? 'btn-outline-danger bg-white' : (isFull(a) ? 'btn-secondary text-white border-0 opacity-50' : 'btn-primary')"
                  :disabled="!a.isJoinedByMe && isFull(a)"
                  @click="toggleJoin(a)"
                >
                  {{ a.isJoinedByMe ? '取消報名' : (isFull(a) ? '已額滿' : '立即報名') }}
                </button>
              </div>

            </div>
          </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-5 my-4 fade-in-up">
          <div class="icon-circle bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border border-light-subtle" style="width: 100px; height: 100px; color: var(--text-muted);">
            <i class="bi bi-search display-4"></i>
          </div>
          <h4 class="fw-bold text-dark mb-2">找不到相關活動</h4>
          <p class="text-muted">{{ showMine ? "您目前還沒有報名任何活動" : "目前沒有符合條件的活動，試試看其他關鍵字吧！" }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-create-btn {
  position: absolute !important;
  right: 15px !important;
  top: 5px;
  z-index: 1050;
  transition: all 0.3s ease;
}

.custom-create-btn:hover {
  transform: translateY(-2px) scale(1.05);
}

@media (max-width: 1400px) {
  .custom-create-btn {
    right: 30px !important;
  }
}

@media (max-width: 767.98px) {
  .custom-create-btn {
    right: 15px !important;
    top: 0px;
  }
  .card img {
    height: 200px !important;
  }
}
</style>