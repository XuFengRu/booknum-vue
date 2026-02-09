<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const STORAGE_KEY = "activities_v1";
const id = computed(() => Number(route.params.id));

function loadActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveActivities(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const activities = ref(loadActivities());

const activity = computed(() =>
  activities.value.find((a) => Number(a.id) === id.value)
);

function isFull(a) {
  return (Number(a.joined) || 0) >= (Number(a.need) || 0);
}

const remaining = computed(() => {
  const a = activity.value;
  if (!a) return 0;
  return Math.max(0, (Number(a.need) || 0) - (Number(a.joined) || 0));
});

const progressPct = computed(() => {
  const a = activity.value;
  if (!a) return 0;
  const need = Math.max(1, Number(a.need) || 1);
  const joined = Math.max(0, Number(a.joined) || 0);
  return Math.min(100, Math.round((joined / need) * 100));
});

function toggleJoin() {
  const a = activity.value;
  if (!a) return;

  if (a.isJoinedByMe) {
    a.joined = Math.max(0, (Number(a.joined) || 0) - 1);
    a.isJoinedByMe = false;
  } else {
    if (isFull(a)) return;
    a.joined = (Number(a.joined) || 0) + 1;
    a.isJoinedByMe = true;
  }

  saveActivities(activities.value);
}

function goBack() {
  router.back();
}
function goList() {
  router.push({ name: "member-group" });
}
function copyLink() {
  navigator.clipboard?.writeText(window.location.href);
}
function copySummary() {
  const a = activity.value;
  if (!a) return;
  const text = `【${a.title}】
類型：${a.category}
時間：${a.startAt} ～ ${a.endAt}
地點：${a.location}
名額：${a.joined}/${a.need}
敘述：${a.description || ""}`.trim();
  navigator.clipboard?.writeText(text);
}
</script>

<template>
  <div class="container py-4 detail-page">
    <div class="panel p-4 rounded-4 border shadow-sm">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <div class="title-pill">
            <i class="fa-solid fa-circle-info me-2"></i>
            活動詳細
          </div>
        </div>

        <button class="btn btn-outline-secondary rounded-pill px-3" @click="goBack">
          返回
        </button>
      </div>

      <div v-if="!activity" class="text-center py-5">
        <div class="fw-bold mb-2">找不到這個活動</div>
        <div class="text-muted mb-4">可能是活動不存在或已被移除。</div>
        <button class="btn btn-gradient rounded-pill px-4" @click="goList">
          回活動列表
        </button>
      </div>

      <div v-else class="mt-4">
        <div class="row g-4 align-items-start">
          <div class="col-12 col-lg-4">
            <div class="preview-card sticky-preview p-3 rounded-4 border shadow-sm">

              <div
                class="img-wrap rounded-4 overflow-hidden"
                v-if="activity.image && String(activity.image).trim()"
              >
                <img :src="String(activity.image).trim()" :alt="activity.title" />
              </div>

              <div
                v-else
                class="img-wrap rounded-4 overflow-hidden d-flex align-items-center justify-content-center text-muted"
              >
                尚未設定封面圖片
              </div>

              <div class="mt-3">
                <div class="text-muted small mb-1">標題</div>
                <div class="fw-bold">{{ activity.title || "（尚未輸入）" }}</div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">敘述（摘要）</div>
                <div class="small text-dark preline clamp-3">
                  {{ activity.description || "（尚未輸入）" }}
                </div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">地點</div>
                <div>{{ activity.location || "（尚未選擇）" }}</div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">時間</div>
                <div class="small">
                  {{ activity.startAt }} ～ {{ activity.endAt }}
                </div>
              </div>

              <div class="mt-3 d-flex flex-wrap align-items-center gap-2">
                <span class="badge-pill badge-pill--hot">
                  {{ activity.category || "未選擇類型" }}
                </span>

                <span class="text-muted small">
                  已報名 <b class="text-dark">{{ activity.joined }}</b> /
                  <b class="text-dark">{{ activity.need }}</b>
                </span>

                <span v-if="activity.isJoinedByMe" class="badge-pill badge-pill--joined">
                  你已報名
                </span>
                <span v-else-if="isFull(activity)" class="badge-pill badge-pill--full">
                  額滿
                </span>
              </div>

              <!-- 小進度條 -->
              <div class="mt-3">
                <div class="d-flex justify-content-between small text-muted mb-1">
                  <span>報名進度</span>
                  <span>{{ progressPct }}%</span>
                </div>
                <div class="progress rounded-pill" style="height: 10px">
                  <div class="progress-bar" role="progressbar" :style="{ width: progressPct + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-8">
            <div class="action-card p-4 rounded-4 border shadow-sm">
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
                <div>
                  <div class="fw-bold fs-5">{{ activity.title }}</div>
                  <div class="text-muted mt-1">
                    剩餘名額：<b class="text-dark">{{ remaining }}</b>
                    <span class="ms-2">｜</span>
                    已報名：<b class="text-dark">{{ activity.joined }}</b>/<b class="text-dark">{{ activity.need }}</b>
                  </div>
                </div>

                <div class="d-flex gap-2 flex-wrap">
                  <button class="btn btn-outline-secondary rounded-pill px-3" @click="copyLink">
                    複製連結
                  </button>
                </div>
              </div>

              <div class="mt-3 d-flex gap-2 flex-wrap">
                <button
                  class="btn rounded-pill px-4 btn-lgish"
                  :class="
                    activity.isJoinedByMe
                      ? 'btn-outline-danger'
                      : isFull(activity)
                        ? 'btn-full'
                        : 'btn-gradient'
                  "
                  :disabled="!activity.isJoinedByMe && isFull(activity)"
                  @click="toggleJoin"
                >
                  {{
                    activity.isJoinedByMe
                      ? "取消報名"
                      : isFull(activity)
                        ? "已額滿"
                        : "報名"
                  }}
                </button>

                <button class="btn btn-outline-secondary rounded-pill px-4 btn-lgish" @click="goList">
                  回列表
                </button>
              </div>

              <div v-if="!activity.isJoinedByMe && isFull(activity)" class="mt-3 text-muted small">
                此活動目前已額滿，你可以回列表看看其他活動。
              </div>
              <div v-else-if="activity.isJoinedByMe" class="mt-3 text-muted small">
                你已完成報名，若無法出席可按「取消報名」釋出名額。
              </div>
            </div>

            <!-- 內容卡：敘述 -->
            <div class="content-card p-4 rounded-4 border shadow-sm mt-4">
              <div class="fw-bold mb-2">活動敘述</div>
              <div class="text-muted small mb-3">在這裡放集合方式、費用、注意事項、需要自備的物品等。</div>

              <div class="preline">
                {{ activity.description || "（尚未輸入活動敘述）" }}
              </div>
            </div>

            <!-- 基本資訊 -->
            <div class="content-card p-4 rounded-4 border shadow-sm mt-4">
              <div class="fw-bold mb-3">基本資訊</div>

              <div class="row gy-3">
                <div class="col-12 col-md-6">
                  <div class="label">類型</div>
                  <div class="value">{{ activity.category }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="label">地點</div>
                  <div class="value">{{ activity.location }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="label">開始時間</div>
                  <div class="value">{{ activity.startAt }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="label">結束時間</div>
                  <div class="value">{{ activity.endAt }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="label">名額上限</div>
                  <div class="value">{{ activity.need }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="label">目前已報名</div>
                  <div class="value">{{ activity.joined }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- /右 -->
        </div>
      </div>
      <!-- /兩欄 -->
    </div>
  </div>
</template>

<style scoped>
.panel {
  background: #fff;
}

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

/* 左卡 */
.preview-card {
  background: #fff;
  
}
.sticky-preview {
  position: sticky;
  top: 24px;
}

.img-wrap {
  height: 220px;
  background: #f2f2f2;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preline {
  white-space: pre-line;
}

.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
}

.badge-pill--hot {
  color: #fff;
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
}
.badge-pill--joined {
  color: #fff;
  background: #ff4d6d;
}
.badge-pill--full {
  color: #5f6772;
  background: #e9ecef;
}

/* 右側卡 */
.action-card,
.content-card {
  background: #fff;
}

.label {
  font-size: 0.9em;   
  font-weight: 800;
  color: #6c757d;
  margin-bottom: 6px;
}
.value {
  font-size: 1.05em;  
  color: #111;
}


/* buttons */
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
.btn-gradient:hover {
  opacity: 0.92;
}

.btn-full {
  background: #eef0f3;
  color: #8a8f98;
  border: none;
  cursor: not-allowed;
}

.detail-page {
  font-size: 19px; 
}

</style>
