<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const LIST_ROUTE_NAME = "member-group";

const STORAGE_KEY = "activities_v1";

const form = ref({
  title: "",
  category: "吃飯",
  description: "", 
  startAt: "", 
  endAt: "",
  location: "", 
  need: 8, 
  image: "",
});


const touched = ref(false);
const isSaving = ref(false);

const CITY_DISTRICTS = {
  "台北市": ["中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區"],
  "新北市": ["板橋區","三重區","中和區","永和區","新莊區","新店區","樹林區","鶯歌區","三峽區","淡水區","汐止區","瑞芳區","土城區","蘆洲區","五股區","泰山區","林口區","深坑區","石碇區","坪林區","三芝區","石門區","八里區","平溪區","雙溪區","貢寮區","金山區","萬里區","烏來區"],
  "基隆市": ["仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區"],
  "桃園市": ["桃園區","中壢區","平鎮區","八德區","楊梅區","蘆竹區","大溪區","龜山區","大園區","觀音區","新屋區","龍潭區","復興區"],
  "新竹市": ["東區","北區","香山區"],
  "新竹縣": ["竹北市","竹東鎮","新埔鎮","關西鎮","湖口鄉","新豐鄉","芎林鄉","橫山鄉","北埔鄉","寶山鄉","峨眉鄉","尖石鄉","五峰鄉"],
  "苗栗縣": ["苗栗市","頭份市","竹南鎮","後龍鎮","通霄鎮","苑裡鎮","卓蘭鎮","大湖鄉","公館鄉","銅鑼鄉","南庄鄉","頭屋鄉","三義鄉","西湖鄉","造橋鄉","三灣鄉","獅潭鄉","泰安鄉"],
  "台中市": ["中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區","大安區"],
  "彰化縣": ["彰化市","員林市","和美鎮","鹿港鎮","溪湖鎮","田中鎮","北斗鎮","二林鎮","線西鄉","伸港鄉","福興鄉","秀水鄉","花壇鄉","芬園鄉","大村鄉","埔鹽鄉","埔心鄉","永靖鄉","社頭鄉","二水鄉","田尾鄉","埤頭鄉","芳苑鄉","大城鄉","竹塘鄉","溪州鄉"],
  "南投縣": ["南投市","埔里鎮","草屯鎮","竹山鎮","集集鎮","名間鄉","鹿谷鄉","中寮鄉","魚池鄉","國姓鄉","水里鄉","信義鄉","仁愛鄉"],
  "雲林縣": ["斗六市","斗南鎮","虎尾鎮","西螺鎮","土庫鎮","北港鎮","古坑鄉","大埤鄉","莿桐鄉","林內鄉","二崙鄉","崙背鄉","麥寮鄉","東勢鄉","褒忠鄉","台西鄉","元長鄉","四湖鄉","口湖鄉","水林鄉"],
  "嘉義市": ["東區","西區"],
  "嘉義縣": ["太保市","朴子市","布袋鎮","大林鎮","民雄鄉","溪口鄉","新港鄉","六腳鄉","東石鄉","義竹鄉","鹿草鄉","水上鄉","中埔鄉","竹崎鄉","梅山鄉","番路鄉","大埔鄉","阿里山鄉"],
  "台南市": ["中西區","東區","南區","北區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","大內區","山上區","新市區","安定區"],
  "高雄市": ["新興區","前金區","苓雅區","鹽埕區","鼓山區","旗津區","前鎮區","三民區","楠梓區","小港區","左營區","仁武區","大社區","岡山區","路竹區","阿蓮區","田寮區","燕巢區","橋頭區","梓官區","彌陀區","永安區","湖內區","茄萣區","鳳山區","大寮區","林園區","鳥松區","大樹區","旗山區","美濃區","六龜區","內門區","杉林區","甲仙區","桃源區","那瑪夏區","茂林區"],
  "屏東縣": ["屏東市","潮州鎮","東港鎮","恆春鎮","萬丹鄉","長治鄉","麟洛鄉","九如鄉","里港鄉","鹽埔鄉","高樹鄉","萬巒鄉","內埔鄉","竹田鄉","新埤鄉","枋寮鄉","新園鄉","崁頂鄉","林邊鄉","南州鄉","佳冬鄉","琉球鄉","車城鄉","滿州鄉","枋山鄉","霧台鄉","瑪家鄉","泰武鄉","來義鄉","春日鄉","獅子鄉","牡丹鄉","三地門鄉"],
  "宜蘭縣": ["宜蘭市","羅東鎮","蘇澳鎮","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","冬山鄉","五結鄉","三星鄉","大同鄉","南澳鄉"],
  "花蓮縣": ["花蓮市","鳳林鎮","玉里鎮","新城鄉","吉安鄉","壽豐鄉","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","秀林鄉","卓溪鄉"],
  "台東縣": ["台東市","成功鎮","關山鎮","卑南鄉","鹿野鄉","池上鄉","東河鄉","長濱鄉","太麻里鄉","大武鄉","綠島鄉","海端鄉","延平鄉","金峰鄉","達仁鄉","蘭嶼鄉"],
  "澎湖縣": ["馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉"],
  "金門縣": ["金城鎮","金沙鎮","金湖鎮","金寧鄉","烈嶼鄉","烏坵鄉"],
  "連江縣": ["南竿鄉","北竿鄉","莒光鄉","東引鄉"],
};

const selectedCity = ref("");
const selectedDistrict = ref("");

const cityOptions = computed(() => Object.keys(CITY_DISTRICTS));
const districtOptions = computed(() =>
  selectedCity.value ? CITY_DISTRICTS[selectedCity.value] : []
);

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

const startLabel = computed(() =>
  form.value.startAt ? form.value.startAt.replace("T", " ") : "（未選）"
);
const endLabel = computed(() =>
  form.value.endAt ? form.value.endAt.replace("T", " ") : "（未選）"
);

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

function toDisplay(dtLocal) {
  if (!dtLocal) return "";
  const [date, time] = dtLocal.split("T");
  const [y, m, d] = date.split("-");
  return `${y}/${m}/${d} ${time}`;
}

const errors = computed(() => {
  const e = {};
  const f = form.value;

  const title = f.title.trim();
  const description = f.description.trim();
  const location = f.location.trim();
  const image = f.image.trim();

  if (!title) e.title = "請輸入活動標題";
  if (!f.category) e.category = "請選擇類型";

  // 活動敘述
  if (!description) e.description = "請輸入活動敘述";

  if (!f.startAt) e.startAt = "請選擇開始時間";
  if (!f.endAt) e.endAt = "請選擇結束時間";
  if (!location) e.location = "請選擇地點";

  const need = Number(f.need);
  if (!Number.isFinite(need) || need < 1) e.need = "名額需為 1 以上";

  // 結束時間必須晚於開始時間
  if (f.startAt && f.endAt) {
    const s = new Date(f.startAt).getTime();
    const t = new Date(f.endAt).getTime();
    if (Number.isFinite(s) && Number.isFinite(t) && t <= s) {
      e.endAt = "結束時間必須晚於開始時間";
    }
  }


if (!image) {
  e.image = "請輸入活動封面圖片";
}

  return e;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);

async function submit() {
  touched.value = true;
  if (!isValid.value) return;

  const ok = window.confirm("確定要建立這個活動嗎？");
  if (!ok) return;

  isSaving.value = true;
  try {
    const list = loadActivities();

    const maxId = list.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0);
    const newId = maxId + 1;

    const f = form.value;

    const newActivity = {
      id: newId,
      title: f.title.trim(),
      category: f.category,
      description: f.description.trim(),
      need: Number(f.need) || 1,
      joined: 0,
      isJoinedByMe: false,
      createdByMe: true,
      joinedUsers: [],
      startAt: toDisplay(f.startAt),
      endAt: toDisplay(f.endAt),
      location: f.location.trim(),
      image: f.image.trim() || "",
    };

    list.unshift(newActivity);
    saveActivities(list);

    // ✅ 建立成功提示
    window.alert("建立成功！");

    router.push({ name: LIST_ROUTE_NAME });
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
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;

  form.value.startAt = toLocalInput(plus1);
  form.value.endAt = toLocalInput(plus2);
});
</script>

<template>
  <div class="container py-4">
    <div class="panel p-4 rounded-4 border shadow-sm">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <div class="title-pill">
            <i class="fa-solid fa-plus me-2"></i>
            建立活動
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary rounded-pill px-3" @click="goBack">
            返回
          </button>
        </div>
      </div>

      <!-- 內容：左預覽 / 右表單 -->
      <div class="mt-4">
        <div class="row g-4">
          <!-- 左：圖片預覽 -->
          <div class="col-12 col-lg-4">
            <div class="preview-card sticky-preview p-3 rounded-4 border">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="fw-bold">封面預覽</div>
              </div>

              <div class="img-wrap rounded-4 overflow-hidden" v-if="form.image.trim()">
                <img :src="form.image.trim()" alt="preview" />
              </div>

              <div
                class="img-wrap rounded-4 overflow-hidden d-flex align-items-center justify-content-center text-muted"
                v-else
              >
                尚未設定封面圖片
              </div>

              <div class="mt-3">
                <div class="text-muted small mb-1">標題</div>
                <div class="fw-bold">{{ form.title.trim() || "（尚未輸入）" }}</div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">敘述</div>
                <div class="small text-dark preline">
                  {{ form.description.trim() || "（尚未輸入）" }}
                </div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">地點</div>
                <div>{{ form.location.trim() || "（尚未選擇）" }}</div>
              </div>

              <div class="mt-2">
                <div class="text-muted small mb-1">時間</div>
                <div class="small">{{ startLabel }} ～ {{ endLabel }}</div>
              </div>

              <div class="mt-2">
                <span class="badge-pill badge-pill--hot">
                  {{ form.category || "未選擇類型" }}
                </span>
                <span class="ms-2 text-muted small">
                  名額 {{ Number(form.need) || 0 }}
                </span>
              </div>
            </div>
          </div>

          <!-- 右：表單 -->
          <div class="col-12 col-lg-8">
            <form @submit.prevent="submit">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-bold">活動標題</label>
                  <input
                    v-model="form.title"
                    class="form-control input-lg"
                    placeholder="例如：一起吃拉麵（新宿）"
                  />
                  <div v-if="touched && errors.title" class="err">{{ errors.title }}</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-bold">活動類型</label>
                  <select v-model="form.category" class="form-select input-lg">
                    <option value="吃飯">吃飯</option>
                    <option value="運動">運動</option>
                    <option value="桌遊">桌遊</option>
                    <option value="聊天">聊天</option>
                    <option value="其他">其他</option>
                  </select>
                  <div v-if="touched && errors.category" class="err">{{ errors.category }}</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-bold">活動敘述</label>
                  <textarea
                    v-model="form.description"
                    class="form-control input-lg"
                    rows="4"
                    placeholder="例如：集合地點、注意事項、費用、是否歡迎新手、需要自備什麼..."
                  ></textarea>
                  <div v-if="touched && errors.description" class="err">
                    {{ errors.description }}
                  </div>
                </div>

                <!-- Time -->
                <div class="col-12 col-md-6">
                  <label class="form-label fw-bold">開始時間</label>
                  <input v-model="form.startAt" type="datetime-local" class="form-control input-lg" />
                  <div v-if="touched && errors.startAt" class="err">{{ errors.startAt }}</div>
                </div>

                <div class="col-12 col-md-6">
                  <label class="form-label fw-bold">結束時間</label>
                  <input v-model="form.endAt" type="datetime-local" class="form-control input-lg" />
                  <div v-if="touched && errors.endAt" class="err">{{ errors.endAt }}</div>
                </div>

                <!-- Location: 縣市 + 行政區 -->
                <div class="col-12">
                  <label class="form-label fw-bold">地點</label>

                  <div class="row g-2">
                    <div class="col-12 col-md-6">
                      <select
                        v-model="selectedCity"
                        class="form-select input-lg"
                        @change="onCityChange"
                      >
                        <option value="">請選擇縣市</option>
                        <option v-for="c in cityOptions" :key="c" :value="c">
                          {{ c }}
                        </option>
                      </select>
                    </div>

                    <div class="col-12 col-md-6">
                      <select
                        v-model="selectedDistrict"
                        class="form-select input-lg"
                        :disabled="!selectedCity"
                        @change="onDistrictChange"
                      >
                        <option value="">
                          {{ selectedCity ? "請選擇行政區" : "請先選縣市" }}
                        </option>
                        <option v-for="d in districtOptions" :key="d" :value="d">
                          {{ d }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div v-if="touched && errors.location" class="err">
                    {{ errors.location }}
                  </div>

                  <div v-if="form.location" class="text-muted small mt-2">
                    已選擇：{{ form.location }}
                  </div>
                </div>

                <!-- Need -->
                <div class="col-12">
                  <label class="form-label fw-bold">名額上限</label>
                  <input
                    v-model.number="form.need"
                    type="number"
                    min="1"
                    class="form-control input-lg"
                  />
                  <div v-if="touched && errors.need" class="err">{{ errors.need }}</div>
                </div>

                <!-- Image -->
                <div class="col-12">
                  <label class="form-label fw-bold">封面圖片(網址)</label>
                  <input
                    v-model="form.image"
                    class="form-control input-lg"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <div v-if="touched && errors.image" class="err">{{ errors.image }}</div>
                </div>
              </div>

              <!-- Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  class="btn btn-outline-secondary rounded-pill px-4 btn-lgish"
                  @click="goBack"
                >
                  取消
                </button>

                <button
                  type="submit"
                  class="btn rounded-pill px-4 btn-lgish btn-gradient"
                  :disabled="isSaving"
                >
                  {{ isSaving ? "建立中..." : "建立活動" }}
                </button>
              </div>

              <div v-if="touched && !isValid" class="hint mt-3">
                請先修正上方欄位錯誤再送出。
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /內容 -->
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

.input-lg {
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 16px;
}

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

.err {
  margin-top: 6px;
  font-size: 13px;
  color: #d93025;
  font-weight: 700;
}

.hint {
  font-size: 13px;
  color: #d93025;
  font-weight: 700;
}

/* 左側預覽卡 */
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

.preline {
  white-space: pre-line;
}
</style>
