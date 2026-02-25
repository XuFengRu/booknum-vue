<script setup>
import { computed, onMounted, onActivated, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const keyword = ref("");

/** ===== API 設定 ===== */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7091";

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

function resolveImg(img) {
  const s = String(img ?? "").trim();
  if (!s) return "";
  if (s.startsWith("data:") || /^https?:\/\//.test(s)) return s;
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}

/** ===== fetch 包裝 ===== */
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

/** ===== 取得分類 ===== */
async function fetchCategoryMap() {
  const list = await fetchJson(`${API_BASE}/api/ActivityCategory`);
  const map = new Map();
  for (const c of list) {
    const id = Number(c.categoryId ?? c.CategoryId);
    const name = c.categoryName ?? c.CategoryName;
    map.set(id, name);
  }
  return map;
}

/** ===== 狀態判斷 ===== */
function isFull(a) {
  return (Number(a.joined) || 0) >= (Number(a.need) || 0);
}
function fullText(a) {
  return `人數已滿（${a.joined}/${a.need}）`;
}
function isMyOwnActivity(a) {
  const owner = Number(a.ownerId) || 0;
  return owner !== 0 && owner === Number(CURRENT_USER.id);
}
function isStarted(a) {
  const iso = a.startAtIso;
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return t <= Date.now();
}
function startedText(a) {
  return `活動已開始（${a.startAt}）`;
}

/** ===== 取得活動 ===== */
async function fetchActivities() {
  const categoryMap = await fetchCategoryMap();
  const list = await fetchJson(`${API_BASE}/api/Activity`);

  activities.value = list.map((x) => {
    const id = Number(x.activityId ?? x.ActivityId);

    // ✅ 從後端各種可能欄位抓「主辦人/建立者」
    const ownerId = Number(
      x.ownerId ??
        x.OwnerId ??
        x.hostUserId ??
        x.HostUserId ??
        x.createdBy ??
        x.CreatedBy ??
        x.userId ??
        x.UserId ??
        0
    );

    const isJoinedByMe = joinedIds.value.has(id);

    // ✅ 你目前報名是 localStorage，所以已報名至少顯示 1，避免 0/1 但顯示取消報名
    const apiJoined = Number(x.joined ?? x.Joined ?? 0);
    const joined = isJoinedByMe ? Math.max(1, apiJoined) : apiJoined;

    const startAtIso = x.startAt ?? x.StartAt ?? "";
    const endAtIso = x.endAt ?? x.EndAt ?? "";

    const rawImg = x.image ?? x.Image ?? "";

    return {
      id,
      ownerId,
      title: x.title ?? x.Title ?? "",
      category:
        categoryMap.get(Number(x.categoryId ?? x.CategoryId)) ??
        `分類#${x.categoryId ?? x.CategoryId}`,
      need: Number(x.maxPeople ?? x.MaxPeople ?? 0),
      joined,
      isJoinedByMe,
      joinedUsers: [],
      startAtIso,
      endAtIso,
      startAt: formatDateTime(startAtIso),
      endAt: formatDateTime(endAtIso),
      location: x.location ?? x.Location ?? "",
      image: resolveImg(rawImg),
    };
  });
}

/** ✅ 統一刷新：回到本頁也會同步 Detail 的 localStorage 狀態 */
async function refreshPage() {
  loadJoinedIds();
  try {
    await fetchActivities();
  } catch (err) {
    console.error("API 讀取失敗:", err);
  }
}

/** ===== 初始化 ===== */
onMounted(refreshPage);
onActivated(refreshPage);

/** ===== 搜尋 ===== */
const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  let list = activities.value;

  if (showMine.value) {
    list = list.filter((a) => a.isJoinedByMe);
  }

  if (!k) return list;

  return list.filter((a) =>
    [a.title, a.location, a.category].some((v) => String(v ?? "").toLowerCase().includes(k))
  );
});

/** ===== 跳頁 ===== */
function goCreate() {
  router.push({ name: "member-group-create" });
}
function goDetail(id) {
  router.push({ name: "member-group-detail", params: { id } });
}

/** ===== 報名（前端暫存 + 畫面即時更新） ===== */
function toggleJoin(a) {
  const id = Number(a.id);

  // ✅ 新增：活動已開始 → 關閉報名/取消
  if (isStarted(a)) return;

  if (a.isJoinedByMe) {
    const ok = window.confirm("確定要取消報名嗎？");
    if (!ok) return;

    a.isJoinedByMe = false;
    joinedIds.value.delete(id);
    a.joined = Math.max(0, (Number(a.joined) || 0) - 1);
  } else {
    const ok = window.confirm("確定要報名這個活動嗎？");
    if (!ok) return;

    // ✅ 不能報名自己發布的活動
    if (isMyOwnActivity(a)) return;

    if (isFull(a)) return;

    a.isJoinedByMe = true;
    joinedIds.value.add(id);
    a.joined = (Number(a.joined) || 0) + 1;
  }

  saveJoinedIds();
}

function toggleMine() {
  showMine.value = !showMine.value;
}
</script>

<template>
  <div class="glass-page w-100 fade-in-up">
    <!-- Title / Create -->
    <div
      class="position-relative d-flex justify-content-center w-100 mb-4 mb-xl-3"
      style="max-width: 1440px; margin: 0 auto"
    >
      <div class="text-center">
        <h2 class="fw-bolder text-gradient mb-2">熱門揪團</h2>
        <p class="text-muted">探索周邊活動，與志同道合的新朋友一起玩樂</p>
      </div>

      <button
        @click="goCreate"
        class="btn btn-light shadow-sm btn-circle btn-circle-md custom-create-btn d-flex align-items-center justify-content-center"
        title="建立活動"
      >
        <i class="bi bi-plus-lg d-block" style="line-height: 0; font-size: 1.6rem"></i>
      </button>
    </div>

    <!-- Search / filter -->
    <div class="mx-auto" style="max-width: 1000px">
      <div class="glass-shell p-3 p-md-4 mb-4">
        <div class="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
          <div class="input-group-custom flex-grow-1 w-100 mb-0">
            <input
              v-model="keyword"
              type="text"
              class="form-control glass-input border-0"
              style="border-radius: 50rem; height: 50px; padding-left: 48px"
              :placeholder="showMine ? '在我的報名中搜尋...' : '搜尋活動標題、地點或類型...'"
            />
            <i class="bi bi-search"></i>
          </div>

          <button
            class="btn rounded-pill px-4 fw-bold shadow-sm flex-shrink-0 transition-all glass-toggle-btn"
            :class="showMine ? 'btn-primary' : 'btn-light text-muted'"
            style="height: 50px"
            @click="toggleMine"
          >
            {{ showMine ? "全部活動" : "我的報名" }}
          </button>
        </div>
      </div>

      <!-- List -->
      <div class="d-flex flex-column gap-4">
        <div
          v-for="a in filtered"
          :key="a.id"
          class="glass-card rounded-4 overflow-hidden"
          :class="{ 'is-full-card': isFull(a) && !a.isJoinedByMe }"
        >
          <div class="row g-0 h-100">
            <div class="col-md-4 col-lg-4">
              <div class="img-box">
                <img v-if="a.image" :src="a.image" :alt="a.title" class="img-fill" />
                <div v-else class="img-empty">
                  <span class="text-muted small">（此活動未上傳圖片）</span>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-8 p-4 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
                  <span class="badge badge-glasslight rounded-pill px-3 py-1">{{ a.category }}</span>

                  <span v-if="a.isJoinedByMe" class="badge bg-danger rounded-pill px-3 py-1 shadow-sm">
                    <i class="bi bi-check-circle-fill me-1"></i>已報名
                  </span>

                  <span v-if="isMyOwnActivity(a)" class="badge bg-dark rounded-pill px-3 py-1 shadow-sm">
                    自己發布
                  </span>

                  <span v-if="isStarted(a)" class="badge bg-warning text-dark rounded-pill px-3 py-1 shadow-sm">
                    活動已開始
                  </span>

                  <span v-if="isFull(a)" class="badge bg-secondary rounded-pill px-3 py-1 shadow-sm">
                    人數已滿
                  </span>
                </div>

                <div class="text-muted small fw-bold text-nowrap mt-1">
                  報名人數:
                  <span :class="isFull(a) ? 'text-danger' : 'text-primary'">{{ a.joined }}</span>
                  / {{ a.need }}
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
                <button
                  class="btn btn-light rounded-pill px-4 fw-bold border border-light-subtle shadow-sm"
                  @click="goDetail(a.id)"
                >
                  查看詳情
                </button>

                <button
                  class="btn rounded-pill px-4 fw-bold shadow-sm"
                  :class="
                    a.isJoinedByMe
                      ? 'btn-outline-danger bg-white'
                      : (isStarted(a) || isMyOwnActivity(a) || isFull(a))
                      ? 'btn-secondary text-white border-0 opacity-50'
                      : 'btn-primary'
                  "
                  :disabled="isStarted(a) || (!a.isJoinedByMe && (isMyOwnActivity(a) || isFull(a)))"
                  :title="
                    isStarted(a)
                      ? startedText(a)
                      : isMyOwnActivity(a)
                      ? '不能報名自己發布的活動'
                      : (!a.isJoinedByMe && isFull(a))
                      ? fullText(a)
                      : ''
                  "
                  @click="toggleJoin(a)"
                >
                  {{
                    isStarted(a)
                      ? "活動已開始"
                      : a.isJoinedByMe
                      ? "取消報名"
                      : isMyOwnActivity(a)
                      ? "自己發布"
                      : isFull(a)
                      ? "人數已滿"
                      : "立即報名"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-if="filtered.length === 0" class="text-center py-5 my-4 fade-in-up">
          <div
            class="icon-circle glass-soft rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style="width: 100px; height: 100px;"
          >
            <i class="bi bi-search display-4"></i>
          </div>
          <h4 class="fw-bold text-dark mb-2">找不到相關活動</h4>
          <p class="text-muted">
            {{
              showMine
                ? "您目前還沒有報名任何活動"
                : "目前沒有符合條件的活動，試試看其他關鍵字吧！"
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-shell{
  border-radius: 2rem;
  border: 1px solid rgba(255,255,255,.55);
  background: rgba(255,255,255,.45);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 18px 60px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.55);
}

.glass-card{
  border: 1px solid rgba(255,255,255,.55);
  background: rgba(255,255,255,.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 34px rgba(0,0,0,.08);
}

.glass-soft{
  border: 1px solid rgba(255,255,255,.55);
  background: rgba(255,255,255,.42);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 26px rgba(0,0,0,.06);
}

.glass-input{
  background: rgba(255,255,255,.55) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 0 0 1px rgba(255,255,255,.55) inset, 0 10px 22px rgba(0,0,0,.06);
}

.glass-toggle-btn{
  background: rgba(255,255,255,.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.55);
}

.badge-glasslight{
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(255,255,255,.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #222;
}

.is-full-card{
  opacity: .75;
}

/* create button */
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
  .glass-card img {
    height: 200px !important;
  }
}

.img-box{
  height: 240px;
  width: 100%;
  overflow: hidden;
  border-radius: 0;
}

@media (max-width: 767.98px){
  .img-box{ height: 200px; }
}

.img-fill{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.img-empty{
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(255,255,255,.28);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>