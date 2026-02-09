<script setup>
import { computed, onMounted, ref } from "vue";

const STORAGE_KEY = "activities_v1";

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

const activities = ref([]);

onMounted(() => {
  activities.value = loadActivities();
});

const myActivities = computed(() =>
  (activities.value || []).filter((a) => a && a.createdByMe)
);

function isFull(a) {
  return (Number(a.joined) || 0) >= (Number(a.need) || 0);
}

function removeUser(activity, user) {
  if (!activity || !user) return;

  activity.joinedUsers = Array.isArray(activity.joinedUsers)
    ? activity.joinedUsers
    : [];

  const before = activity.joinedUsers.length;
  activity.joinedUsers = activity.joinedUsers.filter((u) => u.id !== user.id);

  if (activity.joinedUsers.length < before) {
    activity.joined = Math.max(0, (Number(activity.joined) || 0) - 1);

    if (Number(user.id) === 83) {
      activity.isJoinedByMe = false;
    }
  }

  saveActivities(activities.value);
}

</script>

<template>
  <div class="container py-4 pub">
    <!-- Header -->
    <div class="page-head">
      <div>
        <div class="head-pill">
          <i class="fa-solid fa-bullhorn me-2"></i>
          我發布的活動
        </div>
        <div class="head-sub">
          查看報名名單與狀況
        </div>
      </div>

      <div class="head-stats" v-if="myActivities.length">
        <div class="stat">
          <div class="k">活動數</div>
          <div class="v">{{ myActivities.length }}</div>
        </div>
        <div class="stat">
          <div class="k">總報名</div>
          <div class="v">
            {{ myActivities.reduce((s, a) => s + (Number(a.joined) || 0), 0) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-if="myActivities.length === 0" class="empty">
      <div class="empty-card">
        <div class="empty-ico"><i class="fa-regular fa-folder-open"></i></div>
        <div class="empty-title">尚未有已發佈的活動</div>
        <div class="empty-desc">
          先到「發起揪團」建立活動後，就能在這裡管理報名名單。
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div v-else class="grid">
      <section v-for="a in myActivities" :key="a.id" class="card">
        <!-- Cover -->
        <div class="cover">
          <img v-if="a.image" class="cover-img" :src="a.image" :alt="a.title" />
          <div v-else class="cover-fallback">
            <i class="fa-regular fa-image"></i>
          </div>

          <!-- Overlay -->
          <div class="overlay">
            <div class="tags">
              <span class="tag tag-cat">
                <i class="fa-solid fa-tag me-1"></i>{{ a.category || "未分類" }}
              </span>
              <span class="tag" :class="isFull(a) ? 'tag-full' : 'tag-open'">
                {{ isFull(a) ? "額滿" : "可報名" }}
              </span>
            </div>

            <div class="quota">
              <div class="quota-k">已報名</div>
              <div class="quota-v">
                <span class="big">{{ a.joined ?? 0 }}</span>
                <span class="slash">/</span>
                <span class="small">{{ a.need ?? 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="body">
          <div class="title-row">
            <h3 class="title">{{ a.title || "(未命名活動)" }}</h3>
          </div>

          <div class="info">
            <div class="info-item">
              <i class="fa-regular fa-clock me-2"></i>
              <span>{{ a.startAt || "-" }} ～ {{ a.endAt || "-" }}</span>
            </div>
            <div class="info-item">
              <i class="fa-solid fa-location-dot me-2"></i>
              <span>{{ a.location || "-" }}</span>
            </div>
          </div>

          <div class="two">
            <!-- Left: participants -->
            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <i class="fa-regular fa-user me-2"></i>報名名單
                  <span class="count">（{{ a.joinedUsers?.length || 0 }}）</span>
                </div>
              </div>

              <div v-if="!a.joinedUsers || a.joinedUsers.length === 0" class="soft">
                尚無人報名
              </div>

              <div v-else class="users">
                <div v-for="u in a.joinedUsers" :key="u.id" class="user">
                  <div class="u-left">
                    <div class="avatar">
                      {{ String(u.name || "?").trim().slice(0, 1).toUpperCase() }}
                    </div>
                    <div class="u-text">
                      <div class="u-name">{{ u.name || "未命名" }}</div>
                      <div class="u-id">ID: {{ u.id }}</div>
                    </div>
                  </div>
                  <button class="btn-remove" @click="removeUser(a, u)">取消</button>
                </div>
              </div>
            </div>

            <div class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <i class="fa-regular fa-note-sticky me-2"></i>活動敘述
                </div>
              </div>

              <div v-if="a.description && String(a.description).trim().length" class="desc">
                {{ a.description }}
              </div>
              <div v-else class="soft">尚未填寫敘述</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pub {
  color: #111;
}
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.head-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
  box-shadow: 0 10px 22px rgba(255, 77, 109, 0.22);
}
.head-sub {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}
.head-stats {
  display: flex;
  gap: 10px;
}
.stat {
  background: #fff;
  border: 1px solid #eef0f6;
  border-radius: 14px;
  padding: 10px 12px;
  min-width: 110px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.04);
}
.stat .k {
  font-size: 12px;
  font-weight: 800;
  color: #6b7280;
}
.stat .v {
  font-size: 18px;
  font-weight: 900;
}

/* ===== empty ===== */
.empty {
  padding: 18px 0;
}
.empty-card {
  border: 1px dashed #e7e9ee;
  background: #fcfcff;
  border-radius: 18px;
  padding: 26px 18px;
  text-align: center;
}
.empty-ico {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  background: #fff1f3;
  color: #ff4d6d;
  font-size: 22px;
}
.empty-title {
  font-weight: 900;
  font-size: 18px;
}
.empty-desc {
  margin-top: 6px;
  color: #6b7280;
  font-size: 14px;
}

/* ===== cards ===== */
.grid {
  display: grid;
  gap: 14px;
}
.card {
  border: 1px solid #eef0f6;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.05);
}

/* cover */
.cover {
  position: relative;
  height: 170px;
  background: #f3f4f6;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9aa0aa;
  font-size: 24px;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.38));
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12px;
  gap: 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.tag-cat {
  color: #ff4d6d;
  background: #fff1f3;
  border-color: #ffd1dc;
}
.tag-open {
  color: #ff4d6d;
  background: #fff1f3;
  border-color: #ffd1dc;
}
.tag-full {
  color: #fff;
  border: none;
  background: linear-gradient(135deg, #ff4d6d, #ff914d);
}
.quota {
  min-width: 110px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 10px 12px;
  text-align: center;
}
.quota-k {
  font-size: 12px;
  color: #6b7280;
  font-weight: 900;
}
.quota-v {
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 6px;
}
.big {
  font-size: 22px;
  font-weight: 900;
}
.slash {
  color: #9aa0aa;
  font-weight: 900;
}
.small {
  color: #6b7280;
  font-weight: 900;
  font-size: 13px;
}

/* body */
.body {
  padding: 14px 16px 16px;
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
}
.info {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #4b5563;
  font-weight: 700;
  font-size: 13px;
}
.info-item {
  display: inline-flex;
  align-items: center;
}

/* two panels */
.two {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.panel {
  border: 1px solid #eef0f6;
  background: #fff;
  border-radius: 16px;
  padding: 12px;
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.panel-title {
  font-weight: 900;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.count {
  margin-left: 6px;
  color: #6b7280;
  font-weight: 800;
  font-size: 13px;
}
.soft {
  border: 1px solid #eef0f6;
  background: #fafbff;
  border-radius: 14px;
  padding: 12px;
  color: #6b7280;
  font-weight: 800;
  font-size: 14px;
}
.desc {
  border: 1px solid #eef0f6;
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.65;
  color: #2b2f36;
}

/* users */
.users {
  display: grid;
  gap: 10px;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid #eef0f6;
  background: #fff;
  border-radius: 14px;
  padding: 10px 10px;
}
.u-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #fff1f3;
  color: #ff4d6d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  flex: 0 0 auto;
}
.u-name {
  font-weight: 900;
  font-size: 14px;
  line-height: 1.2;
}
.u-id {
  margin-top: 2px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 700;
}
.btn-remove {
  border: 1px solid #ffd1dc;
  background: #fff;
  color: #ff4d6d;
  font-weight: 900;
  font-size: 13px;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.btn-remove:hover {
  background: #fff1f3;
}

/* responsive */
@media (max-width: 992px) {
  .two {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 576px) {
  .overlay {
    flex-direction: column;
    align-items: flex-start;
  }
  .quota {
    width: 100%;
    text-align: left;
  }
  .quota-v {
    justify-content: flex-start;
  }
}
</style>
