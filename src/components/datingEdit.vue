<!-- src/components/EditProfile.vue -->
<script setup>
import { ref } from "vue";
import { ElSelect, ElOption, ElButton } from "element-plus";
import "element-plus/dist/index.css";

const cities = [
  "台北市","新北市","桃園市","台中市","台南市","高雄市", // 直轄市
  "基隆市","新竹市","嘉義市", // 市
  "新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣",
  "屏東縣","宜蘭縣","花蓮縣","台東縣",
  "澎湖縣","金門縣","連江縣" // 縣
];

const hobbyOptions = [
  "旅行","攝影","咖啡","爬山","閱讀","音樂","電影","健身","程式","美食"
];

const form = ref({
  nickname: "",
  location: "",
  job: "",
  hobbies: [],
  intro: "",
  avatar: "",   // 照片欄位
  preference: {
    gender: "不拘",
    ageRange: [20, 40],
    cities: []
  }
});

function saveProfile() {
  emit("save", form.value);
}

// 處理檔案選擇
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      form.value.avatar = e.target.result; // base64 URL
    };
    reader.readAsDataURL(file);
  }
}

// 清除所有已選城市
function clearCities() {
  form.value.preference.cities = [];
}

// 清除所有已選興趣
function clearHobbies() {
  form.value.hobbies = [];
}
</script>

<template>
  <div class="edit-form">
    <h2>編輯交友資料</h2>

    <!-- 照片 -->
    <label>照片</label> 
    <div v-if="form.avatar" class="preview">
      <img :src="form.avatar" alt="預覽圖片" />
    </div>
    <input type="file" accept="image/*" @change="handleFileUpload" class="form-control" />

    <!-- 綽號 -->
    <label>綽號</label>
    <input v-model="form.nickname" type="text" class="form-control" />

    <!-- 現居地 -->
    <label>現居地</label>
    <select v-model="form.location">
      <option disabled value="">請選擇</option>
      <option v-for="city in cities" :key="city" :value="city" class="form-select">{{ city }}</option>
    </select>

    <!-- 職業 -->
    <label>職業</label>
    <input v-model="form.job" type="text" class="form-control" />

    <!-- 興趣 -->
    <label>興趣 (最多 8 個)</label>
    <el-select
      v-model="form.hobbies"
      multiple
      collapse-tags
      placeholder="選擇興趣"
      style="width: 100%;"
      :max-collapse-tags="10"
    >
      <el-option
        v-for="hobby in hobbyOptions"
        :key="hobby"
        :label="hobby"
        :value="hobby"
        :disabled="form.hobbies.length >= 8 && !form.hobbies.includes(hobby)"
      />
    </el-select>
    <div v-if="form.hobbies.length" class="selected-hobbies">
      <el-button type="danger" size="small" @click="clearHobbies">清除全部</el-button>
    </div>

    <!-- 自我介紹 -->
    <label>自我介紹 （最多 250 字）</label>
    <textarea
      v-model="form.intro"
      rows="5"
      @input="form.intro = form.intro.slice(0,250)"
      class="form-textarea"></textarea>
    <p>剩餘字數：{{ 250 - form.intro.length }}</p>

    <!-- 偏好設定 -->
    <h3>偏好設定</h3>
    <label>性別偏好</label>
    <select v-model="form.preference.gender" class="form-select">
      <option>女性</option>
      <option>男性</option>
      <option>不拘</option>
    </select>

    <label>年齡範圍偏好</label>
    <input type="number" v-model="form.preference.ageRange[0]" min="18" max="99" class="form-control" /> ~
    <input type="number" v-model="form.preference.ageRange[1]" min="18" max="99" class="form-control" />

    <label>城市偏好</label>
    <el-select
      v-model="form.preference.cities"
      multiple
      collapse-tags
      placeholder="選擇城市"
      style="width: 100%;"
      :max-collapse-tags="10"
    >
      <el-option
        v-for="city in cities"
        :key="city"
        :label="city"
        :value="city"
      />
    </el-select>
    <div v-if="form.preference.cities.length" class="selected-cities">
      <el-button type="danger" size="small" @click="clearCities">清除全部</el-button>
    </div>

    <button class="save-btn" @click="saveProfile">儲存</button>
  </div>
</template>

<style scoped>
.edit-form {
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 5px #6e6b6b;
}
label {
  display: block;
  margin-top: 0.8rem;
  font-weight: bold;
}
input, select, textarea {
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.save-btn {
  margin-top: 1rem;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
.form-textarea {
  border: 2px solid transparent;
  background-color: #f8f9fa;
  color: #212529;
  transition: all 0.3s ease;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
}
.form-textarea:focus {
  background-color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--color-primary-rgb), 0.25);
  color: #212529;
  outline: none;
}
.preview {
  margin-top: 0.2rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: center;
}
.preview img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2);
}
.selected-cities,
.selected-hobbies {
  margin-top: 0.5rem;
}
@media (min-width: 1200px) {
  .edit-form {
    width: 50%;
  }
}
</style>