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
    const ok = window.confirm("確定要取消報名嗎？");
    if (!ok) return;
    a.joined = Math.max(0, (Number(a.joined) || 0) - 1);
    a.isJoinedByMe = false;
  } else {
    const ok = window.confirm("確定要報名這個活動嗎？");
    if (!ok) return;
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
  alert("連結已複製！");
}

function copySummary() {
  const a = activity.value;
  if (!a) return;
  const text = `【${a.title}】\n類型：${a.category}\n時間：${a.startAt} ～ ${a.endAt}\n地點：${a.location}\n名額：${a.joined}/${a.need}\n\n敘述：${a.description || ""}`.trim();
  navigator.clipboard?.writeText(text);
  alert("活動資訊已複製！");
}
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    
    <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1500px;">
      
      <button @click="goBack" class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn" title="返回列表">
        <i class="bi bi-arrow-left"></i>
      </button>

      <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto bg-white" style="max-width: 1300px; --glass-bg: rgba(255, 255, 255, 0.5);">
        
        <div v-if="!activity" class="text-center py-5 my-5">
          <div class="icon-circle bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border border-light-subtle" style="width: 100px; height: 100px; color: var(--text-muted);">
            <i class="bi bi-exclamation-circle display-4"></i>
          </div>
          <h4 class="fw-bold text-dark mb-2">找不到這個活動</h4>
          <p class="text-muted mb-4">可能是活動不存在或已被移除。</p>
          <button class="btn btn-primary rounded-pill px-5 fw-bold shadow-sm" @click="goList">
            回活動列表
          </button>
        </div>

        <div v-else class="row g-0 h-100">
          
          <div class="col-lg-4 bg-light p-4 p-xl-5 border-end border-light-subtle position-relative">
            <div class="position-sticky">
              <h5 class="fw-bold text-dark mb-4"><i class="bi bi-eye text-primary me-2"></i>活動摘要</h5>
              
              <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                
                <div class="position-relative" style="height: 240px; background: #e9ecef;">
                  <img v-if="activity.image" :src="activity.image" class="w-100 h-100 object-fit-cover" :alt="activity.title">
                  <div v-else class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                    <i class="bi bi-image display-4 text-black-50 opacity-25 mb-2"></i>
                  </div>
                  
                  <div class="position-absolute top-0 start-0 p-3 z-1 d-flex gap-2 flex-wrap">
                    <span class="badge rounded-pill px-3 py-1 shadow-sm text-white fw-normal" 
                          style="background-color: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.25);">
                      {{ activity.category || "未選擇" }}
                    </span>
                    
                    <span v-if="activity.isJoinedByMe" class="badge bg-danger rounded-pill px-3 py-1 shadow-sm"><i class="bi bi-check-circle-fill me-1"></i>已報名</span>
                    <span v-else-if="isFull(activity)" class="badge bg-secondary rounded-pill px-3 py-1 shadow-sm">額滿</span>
                  </div>
                </div>

                <div class="card-body p-4 d-flex flex-column">
                  <h5 class="fw-bolder text-dark mb-3">{{ activity.title }}</h5>
                  
                  <div class="d-flex flex-column gap-2 text-muted small fw-bold mb-3">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-clock text-primary me-2 fs-6"></i>
                      <span class="text-truncate">{{ activity.startAt.replace("T", " ") }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-geo-alt text-primary me-2 fs-6"></i>
                      <span class="text-truncate">{{ activity.location }}</span>
                    </div>
                  </div>

                  <p class="text-muted small mb-0 lh-lg" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: pre-line;">
                    {{ activity.description || "無詳細說明" }}
                  </p>
                  
                  <div class="mt-3 pt-3 border-top border-light-subtle d-flex justify-content-between align-items-center">
                    <span class="text-muted small fw-bold">報名人數</span>
                    <span class="fw-bolder fs-6" :class="isFull(activity) ? 'text-danger' : 'text-primary'">{{ activity.joined }} / {{ activity.need }} 人</span>
                  </div>

                  <div class="mt-2">
                    <div class="progress rounded-pill shadow-sm" style="height: 6px; background-color: #ffeef0;">
                      <div class="progress-bar bg-primary rounded-pill" role="progressbar" :style="{ width: progressPct + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8 p-4 p-xl-5 bg-white d-flex flex-column">
            
            <div class="mb-4 pb-3 border-bottom border-light-subtle d-flex align-items-center justify-content-between flex-wrap gap-3">
              <h3 class="fw-bolder mb-0 text-gradient"><i class="bi bi-info-circle-fill me-2"></i>活動詳情</h3>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-light text-muted fw-bold rounded-pill px-3 border border-light-subtle shadow-sm small" @click="copyLink">
                  <i class="bi bi-link-45deg me-1 fs-5 align-middle"></i> 連結
                </button>
                <button class="btn btn-outline-light text-muted fw-bold rounded-pill px-3 border border-light-subtle shadow-sm small" @click="copySummary">
                  <i class="bi bi-clipboard me-1"></i> 複製資訊
                </button>
              </div>
            </div>

            <div class="flex-grow-1 d-flex flex-column">
              <div class="row g-4 mb-4">
                
                <div class="col-12">
                  <h5 class="fw-bold text-dark mb-3"><i class="bi bi-card-text text-primary me-2"></i>活動內容</h5>
                  <div class="p-4 bg-light rounded-4 border border-light-subtle text-dark lh-lg" style="white-space: pre-line; font-size: 0.95rem;">
                    {{ activity.description || "主辦人尚未填寫詳細內容。" }}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="p-3 bg-light rounded-4 border border-light-subtle d-flex align-items-center gap-3 h-100">
                    <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-primary flex-shrink-0" style="width: 45px; height: 45px; font-size: 1.2rem;">
                      <i class="bi bi-clock"></i>
                    </div>
                    <div>
                      <div class="text-muted small fw-bold mb-1">開始時間</div>
                      <div class="fw-bold text-dark">{{ activity.startAt.replace("T", " ") }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="p-3 bg-light rounded-4 border border-light-subtle d-flex align-items-center gap-3 h-100">
                    <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-primary flex-shrink-0" style="width: 45px; height: 45px; font-size: 1.2rem;">
                      <i class="bi bi-clock-history"></i>
                    </div>
                    <div>
                      <div class="text-muted small fw-bold mb-1">結束時間</div>
                      <div class="fw-bold text-dark">{{ activity.endAt.replace("T", " ") }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="p-3 bg-light rounded-4 border border-light-subtle d-flex align-items-center gap-3 h-100">
                    <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-primary flex-shrink-0" style="width: 45px; height: 45px; font-size: 1.2rem;">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div>
                      <div class="text-muted small fw-bold mb-1">活動地點</div>
                      <div class="fw-bold text-dark">{{ activity.location }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="p-3 bg-light rounded-4 border border-light-subtle d-flex align-items-center gap-3 h-100">
                    <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-primary flex-shrink-0" style="width: 45px; height: 45px; font-size: 1.2rem;">
                      <i class="bi bi-people"></i>
                    </div>
                    <div>
                      <div class="text-muted small fw-bold mb-1">剩餘名額</div>
                      <div class="fw-bold text-dark">{{ remaining }} 人 <span class="text-muted fw-normal ms-1">(上限 {{ activity.need }} 人)</span></div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="mt-auto pt-4 border-top border-light-subtle d-flex gap-3 justify-content-between align-items-center flex-wrap">
                
                <div class="text-muted small fw-bold d-none d-md-block">
                  <span v-if="activity.isJoinedByMe"><i class="bi bi-check-circle-fill text-danger me-1"></i>你已報名此活動</span>
                  <span v-else-if="isFull(activity)"><i class="bi bi-exclamation-circle-fill text-secondary me-1"></i>活動已額滿，下次請早！</span>
                  <span v-else>名額有限，趕快報名加入我們吧！</span>
                </div>
                
                <div class="d-flex gap-3 w-100 justify-content-md-end" style="max-width: 300px;">
                  <button 
                    class="btn rounded-pill px-5 fw-bold shadow-sm flex-grow-1 text-nowrap"
                    :class="activity.isJoinedByMe ? 'btn-outline-danger bg-white' : (isFull(activity) ? 'btn-secondary text-white border-0 opacity-50' : 'btn-primary')"
                    :disabled="!activity.isJoinedByMe && isFull(activity)"
                    @click="toggleJoin"
                  >
                    {{ activity.isJoinedByMe ? '取消報名' : (isFull(activity) ? '已額滿' : '立即報名') }}
                    <i v-if="!activity.isJoinedByMe && !isFull(activity)" class="bi bi-person-plus-fill ms-1"></i>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-back-btn {
  position: absolute !important;
  left: 0px !important;
  top: 0px; 
  z-index: 1050;
}

@media (max-width: 1400px) {
  .custom-back-btn {
    left: 20px !important;
    top: 20px;
  }
}

@media (max-width: 991.98px) {
  .col-lg-4 .position-sticky {
    position: relative !important;
    top: 0 !important;
  }
}

@media (max-width: 767.98px) {
  .custom-back-btn {
    left: 15px !important;
    top: 15px;
  }
}
</style>