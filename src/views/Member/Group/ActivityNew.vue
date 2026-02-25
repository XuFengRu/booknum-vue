<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElSelect, ElOption, ElDatePicker } from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";

const router = useRouter();

const LIST_ROUTE_NAME = "member-group";

const form = ref({
  title: "",
  categoryId: null, 
  description: "",
  startAt: "",
  endAt: "",
  location: "",
  need: 8,
  imageFile: null,   
  imagePreview: "",
});

const touched = ref(false);
const isSaving = ref(false);

// ✅ 分類清單（後端取得）
const categories = ref([]);
const categoryLoading = ref(false);

function getUserIdFallback() {
  // 常見幾種 localStorage key
  const direct =
    localStorage.getItem("userId") ||
    localStorage.getItem("UserId") ||
    localStorage.getItem("userid");

  if (direct && !Number.isNaN(Number(direct))) return Number(direct);
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.userId) return Number(u.userId);
      if (u?.id) return Number(u.id);
    }
  } catch {}

  return 1; 
}

const CITY_DISTRICTS = {
  台北市: ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  新北市: ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "樹林區", "鶯歌區", "三峽區", "淡水區", "汐止區", "瑞芳區", "土城區", "蘆洲區", "五股區", "泰山區", "林口區", "深坑區", "石碇區", "坪林區", "三芝區", "石門區", "八里區", "平溪區", "雙溪區", "貢寮區", "金山區", "萬里區", "烏來區"],
  基隆市: ["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
  桃園市: ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "大溪區", "龜山區", "大園區", "觀音區", "新屋區", "龍潭區", "復興區"],
  新竹市: ["東區", "北區", "香山區"],
  新竹縣: ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"],
  苗栗縣: ["苗栗市", "頭份市", "竹南鎮", "後龍鎮", "通霄鎮", "苑裡鎮", "卓蘭鎮", "大湖鄉", "公館鄉", "銅鑼鄉", "南庄鄉", "頭屋鄉", "三義鄉", "西湖鄉", "造橋鄉", "三灣鄉", "獅潭鄉", "泰安鄉"],
  台中市: ["中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "大安區"],
  彰化縣: ["彰化市", "員林市", "和美鎮", "鹿港鎮", "溪湖鎮", "田中鎮", "北斗鎮", "二林鎮", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "花壇鄉", "芬園鄉", "大村鄉", "埔鹽鄉", "埔心鄉", "永靖鄉", "社頭鄉", "二水鄉", "田尾鄉", "埤頭鄉", "芳苑鄉", "大城鄉", "竹塘鄉", "溪州鄉"],
  南投縣: ["南投市", "埔里鎮", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "中寮鄉", "魚池鄉", "國姓鄉", "水里鄉", "信義鄉", "仁愛鄉"],
  雲林縣: ["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "古坑鄉", "大埤鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "麥寮鄉", "東勢鄉", "褒忠鄉", "台西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
  嘉義市: ["東區", "西區"],
  嘉義縣: ["太保市", "朴子市", "布袋鎮", "大林鎮", "民雄鄉", "溪口鄉", "新港鄉", "六腳鄉", "東石鄉", "義竹鄉", "鹿草鄉", "水上鄉", "中埔鄉", "竹崎鄉", "梅山鄉", "番路鄉", "大埔鄉", "阿里山鄉"],
  台南市: ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"],
  高雄市: ["新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "楠梓區", "小港區", "左營區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "茄萣區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區"],
  屏東縣: ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "霧台鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉", "三地門鄉"],
  宜蘭縣: ["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
  花蓮縣: ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "秀林鄉", "卓溪鄉"],
  台東縣: ["台東市", "成功鎮", "關山鎮", "卑南鄉", "鹿野鄉", "池上鄉", "東河鄉", "長濱鄉", "太麻里鄉", "大武鄉", "綠島鄉", "海端鄉", "延平鄉", "金峰鄉", "達仁鄉", "蘭嶼鄉"],
  澎湖縣: ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
  金門縣: ["金城鎮", "金沙鎮", "金湖鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
  連江縣: ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
};

const selectedCity = ref("");
const selectedDistrict = ref("");

const cityOptions = computed(() => Object.keys(CITY_DISTRICTS));
const districtOptions = computed(() => (selectedCity.value ? CITY_DISTRICTS[selectedCity.value] : []));

function onCityChange() {
  selectedDistrict.value = "";
  form.value.location = "";
}
function onDistrictChange() {
  if (selectedCity.value && selectedDistrict.value) {
    form.value.location = `${selectedCity.value} ${selectedDistrict.value}`;
  } else {
    form.value.location = "";
  }
}

const startLabel = computed(() => (form.value.startAt ? form.value.startAt.replace("T", " ") : "（未選）"));
const endLabel = computed(() => (form.value.endAt ? form.value.endAt.replace("T", " ") : "（未選）"));

function toDisplay(dtLocal) {
  if (!dtLocal) return "";
  const [date, time] = dtLocal.split("T");
  const [y, m, d] = date.split("-");
  return `${y}/${m}/${d} ${time}`;
}
function getCategoryNameById(id) {
  const cid = Number(id);
  return categories.value.find(c => c.categoryId === cid)?.categoryName || "";
}
//

function handleFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  form.value.imageFile = file;

  // 預覽（不影響上傳）
  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.imagePreview = String(e.target?.result ?? "");
  };
  reader.readAsDataURL(file);
}

const errors = computed(() => {
  try {
    const e = {};
    const f = form.value || {};

    const title = String(f.title ?? "").trim();
    const description = String(f.description ?? "").trim();
    const location = String(f.location ?? "").trim();

    if (!title) e.title = "請輸入活動標題";
    if (!f.categoryId) e.category = "請選擇類型";
    if (!description) e.description = "請輸入活動敘述";
    if (!f.startAt) e.startAt = "請選擇開始時間";
    if (!f.endAt) e.endAt = "請選擇結束時間";
    if (!location) e.location = "請選擇地點";

    const need = Number(f.need);
    if (!Number.isFinite(need) || need < 1) e.need = "名額需為 1 以上";

    if (f.startAt && f.endAt) {
      const s = new Date(f.startAt).getTime();
      const t = new Date(f.endAt).getTime();
      if (Number.isFinite(s) && Number.isFinite(t) && t <= s) {
        e.endAt = "結束時間必須晚於開始時間";
      }
    }

    if (!f.imageFile) e.image = "請上傳活動封面圖片";

    return e;
  } catch (err) {
    console.error("errors computed failed:", err);
    return {}; 
  }
});

const isValid = computed(() => {
  const e = errors.value;
  return e && typeof e === "object" ? Object.keys(e).length === 0 : false;
});

// 抓分類
async function fetchCategories() {
  categoryLoading.value = true;
  try {
    const res = await axios.get("/ActivityCategory");
    categories.value = Array.isArray(res.data) ? res.data : [];
    if (!form.value.categoryId && categories.value.length > 0) {
      form.value.categoryId = categories.value[0].categoryId;
    }
  } finally {
    categoryLoading.value = false;
  }
}

function ensureSeconds(dt) {
  if (!dt) return dt;
  // YYYY-MM-DDTHH:mm
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dt)) return dt + ":00";
  return dt;
}

async function submit() {
  touched.value = true;
  if (!isValid.value) return;

  const ok = window.confirm("確定要建立這個活動嗎？");
  if (!ok) return;

  isSaving.value = true;
  try {
    const f = form.value;

const uid = getUserIdFallback();
const cid = Number(f.categoryId);
const cname = getCategoryNameById(cid) || "temp";

const fd = new FormData();
fd.append("userId", String(uid));
fd.append("categoryId", String(cid));
fd.append("title", f.title.trim());
fd.append("description", f.description.trim());
fd.append("eventDate", f.startAt.split("T")[0]);
fd.append("startAt", ensureSeconds(f.startAt));
fd.append("endAt", ensureSeconds(f.endAt));
fd.append("maxPeople", String(Number(f.need) || 1));
fd.append("location", f.location.trim());
fd.append("status", "1");

if (f.imageFile) {
  fd.append("image", f.imageFile);
}

await axios.post("/Activity", fd, {
  headers: { "Content-Type": "multipart/form-data" },
});

    window.alert("建立成功！");
    router.push({ name: LIST_ROUTE_NAME });
  } catch (err) {
    console.error(err);
    window.alert("建立失敗，請查看 Console / Network 回應");
  } finally {
    isSaving.value = false;
  }
}

function goBack() {
  router.back();
}

onMounted(() => {
  const now = new Date();
  const plus1 = new Date(now.getTime() + 60 * 60 * 1000);
  const plus2 = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const pad = (n) => String(n).padStart(2, "0");
  const toLocalInput = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  form.value.startAt = toLocalInput(plus1);
  form.value.endAt = toLocalInput(plus2);

  fetchCategories();
});
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1500px;">
      <button @click="goBack" class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn" title="返回列表">
        <i class="bi bi-arrow-left"></i>
      </button>

      <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto bg-white" style="max-width: 1300px; --glass-bg: rgba(255, 255, 255, 0.5);">
        <div class="row g-0 h-100">
          <div class="col-lg-4 bg-light p-4 p-xl-5 border-end border-light-subtle position-relative">
            <div class="position-sticky">
              <h5 class="fw-bold text-dark mb-4"><i class="bi bi-eye text-primary me-2"></i>即時預覽</h5>

              <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <div
                  class="position-relative"
                  style="height: 240px; background: #e9ecef; transition: all 0.3s;"
                  :class="{ 'border border-2 border-danger': touched && errors.image }"
                >
                  <img v-if="form.imagePreview" :src="form.imagePreview" class="w-100 h-100 object-fit-cover opacity-75" alt="Preview" />

                  <div v-else class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                    <i class="bi bi-image display-4 text-black-50 opacity-25 mb-2"></i>
                  </div>

                  <div class="position-absolute top-50 start-50 translate-middle text-center w-100 z-2">
                    <label class="btn btn-light rounded-pill fw-bold shadow-lg" style="cursor: pointer;">
                      <i class="bi bi-camera-fill me-2 text-primary"></i>{{ form.image ? "更換封面" : "上傳照片" }}
                      <input type="file" accept="image/*" class="d-none" @change="handleFileUpload" />
                    </label>
                  </div>

                  <div class="position-absolute top-0 start-0 p-3 z-1 d-flex gap-2 flex-wrap">
                    <span
                      class="badge rounded-pill px-3 py-1 shadow-sm text-white fw-normal"
                      style="background-color: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.25);"
                    >
                      {{
                        categories.find((c) => c.categoryId === form.categoryId)?.categoryName || "未選擇"
                      }}
                    </span>
                  </div>

                  <div v-if="touched && errors.image" class="position-absolute bottom-0 w-100 bg-danger text-white text-center py-1 fw-bold small z-2">
                    <i class="bi bi-exclamation-circle me-1"></i>{{ errors.image }}
                  </div>
                </div>

                <div class="card-body p-4 d-flex flex-column">
                  <h5 class="fw-bolder text-dark mb-3">{{ form.title.trim() || "（尚未輸入標題）" }}</h5>

                  <div class="d-flex flex-column gap-2 text-muted small fw-bold mb-3">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-clock text-primary me-2 fs-6"></i>
                      <span class="text-truncate">{{ startLabel }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-geo-alt text-primary me-2 fs-6"></i>
                      <span class="text-truncate">{{ form.location.trim() || "（尚未選擇地點）" }}</span>
                    </div>
                  </div>

                  <p
                    class="text-muted small mb-0 lh-lg"
                    style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: pre-line;"
                  >
                    {{ form.description.trim() || "（活動詳細說明將顯示於此...）" }}
                  </p>

                  <div class="mt-3 pt-3 border-top border-light-subtle d-flex justify-content-between align-items-center">
                    <span class="text-muted small fw-bold">名額上限</span>
                    <span class="text-primary fw-bolder fs-6">{{ Number(form.need) || 0 }} 人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8 p-4 p-xl-4 bg-white d-flex flex-column">
            <div class="mb-4 pb-3 border-bottom border-light-subtle d-flex align-items-center justify-content-between">
              <h3 class="fw-bolder mb-0 text-gradient"><i class="bi bi-calendar-plus me-2"></i>建立新活動</h3>
            </div>

            <form @submit.prevent="submit" class="flex-grow-1 d-flex flex-column">
              <div class="row g-4 mb-4">
                <div class="col-md-8">
                  <label class="form-label fw-bold text-muted small ms-1">活動標題</label>
                  <div class="input-group-custom mb-1">
                    <input v-model="form.title" class="form-control" :class="{ 'is-invalid': touched && errors.title }" placeholder="例如：一起吃拉麵（新宿）" />
                    <i class="bi bi-card-heading"></i>
                  </div>
                  <div v-if="touched && errors.title" class="text-danger small ms-2 fw-bold">{{ errors.title }}</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-muted small ms-1">活動類型</label>
                  <div class="input-group-custom mb-1" :class="{ 'has-error': touched && errors.category }">
                    <el-select v-model="form.categoryId" size="large" style="width: 100%;" :loading="categoryLoading" placeholder="請選擇">
                      <el-option v-for="c in categories" :key="c.categoryId" :label="c.categoryName" :value="c.categoryId" />
                    </el-select>
                    <i class="bi bi-tag"></i>
                  </div>
                  <div v-if="touched && errors.category" class="text-danger small ms-2 fw-bold">{{ errors.category }}</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-muted small ms-1">縣市</label>
                  <div class="input-group-custom mb-1" :class="{ 'has-error': touched && errors.location }">
                    <el-select v-model="selectedCity" size="large" placeholder="請選擇" style="width: 100%;" @change="onCityChange">
                      <el-option v-for="c in cityOptions" :key="c" :label="c" :value="c" />
                    </el-select>
                    <i class="bi bi-map"></i>
                  </div>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-muted small ms-1">行政區</label>
                  <div class="input-group-custom mb-1" :class="{ 'has-error': touched && errors.location }">
                    <el-select
                      v-model="selectedDistrict"
                      size="large"
                      :placeholder="selectedCity ? '請選擇' : '先選縣市'"
                      style="width: 100%;"
                      :disabled="!selectedCity"
                      @change="onDistrictChange"
                    >
                      <el-option v-for="d in districtOptions" :key="d" :label="d" :value="d" />
                    </el-select>
                    <i class="bi bi-geo-alt"></i>
                  </div>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-muted small ms-1">名額上限</label>
                  <div class="input-group-custom mb-1">
                    <input v-model.number="form.need" type="number" min="1" class="form-control" :class="{ 'is-invalid': touched && errors.need }" />
                    <i class="bi bi-people"></i>
                  </div>
                </div>

                <div v-if="touched && (errors.location || errors.need)" class="col-12 mt-0">
                  <div v-if="errors.location" class="text-danger small ms-2 fw-bold">{{ errors.location }}</div>
                  <div v-if="errors.need" class="text-danger small ms-2 fw-bold">{{ errors.need }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">開始時間</label>
                  <div class="input-group-custom mb-1" :class="{ 'has-error': touched && errors.startAt }">
                    <el-date-picker
                      v-model="form.startAt"
                      type="datetime"
                      placeholder="選擇開始時間"
                      format="YYYY/MM/DD HH:mm"
                      value-format="YYYY-MM-DDTHH:mm"
                      size="large"
                      style="width: 100%;"
                    />
                    <i class="bi bi-clock"></i>
                  </div>
                  <div v-if="touched && errors.startAt" class="text-danger small ms-2 fw-bold">{{ errors.startAt }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">結束時間</label>
                  <div class="input-group-custom mb-1" :class="{ 'has-error': touched && errors.endAt }">
                    <el-date-picker
                      v-model="form.endAt"
                      type="datetime"
                      placeholder="選擇結束時間"
                      format="YYYY/MM/DD HH:mm"
                      value-format="YYYY-MM-DDTHH:mm"
                      size="large"
                      style="width: 100%;"
                    />
                    <i class="bi bi-clock-history"></i>
                  </div>
                  <div v-if="touched && errors.endAt" class="text-danger small ms-2 fw-bold">{{ errors.endAt }}</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-bold text-muted small ms-1">活動詳細敘述</label>
                  <div class="input-group-custom mb-1">
                    <textarea
                      v-model="form.description"
                      class="form-control py-3"
                      :class="{ 'is-invalid': touched && errors.description }"
                      rows="6"
                      placeholder="請填寫集合地點、注意事項、費用、是否歡迎新手、需要自備什麼... 等詳細資訊"
                      style="padding-left: 48px !important; border-radius: 12px; resize: none;"
                    ></textarea>
                    <i class="bi bi-card-text" style="top: 24px;"></i>
                  </div>
                  <div v-if="touched && errors.description" class="text-danger small ms-2 fw-bold">{{ errors.description }}</div>
                </div>
              </div>

              <div class="mt-auto pt-4 border-top border-light-subtle d-flex gap-3 justify-content-end align-items-center">
                <span v-if="touched && !isValid" class="text-danger fw-bold small me-auto"><i class="bi bi-exclamation-triangle-fill me-1"></i>請先修正表單錯誤</span>

                <button type="button" class="btn btn-light rounded-pill px-4 fw-bold border border-light-subtle shadow-sm" @click="goBack">取消</button>
                <button type="submit" class="btn btn-primary rounded-pill px-5 fw-bold shadow-sm" :disabled="isSaving">
                  {{ isSaving ? "建立中..." : "建立活動" }} <i class="bi bi-check-circle ms-1" v-if="!isSaving"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-select .el-input__wrapper),
:deep(.el-date-editor .el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(200, 200, 200, 0.6) inset;
  background-color: rgba(255, 255, 255, 0.7);
  height: 48px;
}

:deep(.el-select .el-input__wrapper.is-focus),
:deep(.el-date-editor .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--bs-primary) inset, 0 0 0 4px rgba(255, 71, 87, 0.15) !important;
  background-color: #fff !important;
}

.has-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--bs-danger) inset !important;
}

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