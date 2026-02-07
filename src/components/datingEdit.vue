<!-- src/components/EditProfile.vue -->
<script setup>
import { ref } from "vue";
import { ElSelect, ElOption, ElButton, ElSlider, ElForm, ElFormItem } from "element-plus";
import "element-plus/dist/index.css";


const emit = defineEmits(["save","cancel"]);  

const cities = [
  // 北部
  "基隆市","台北市","新北市","桃園市","新竹市","新竹縣","宜蘭縣",
  // 中部
  "苗栗縣","台中市","彰化縣","南投縣","雲林縣",
  // 南部
  "嘉義市","嘉義縣","台南市","高雄市","屏東縣",
  // 東部
  "花蓮縣","台東縣",
  // 離島
  "澎湖縣","金門縣","連江縣"
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
    ageRange: [18, 80],
    cities: []
  }
});

const rules = {
  avatar: [{ required: true, message: "請上傳照片", trigger: "change" }],
  nickname: [{ required: true, message: "請輸入綽號", trigger: "blur" }],
  location: [{ required: true, message: "請選擇現居地", trigger: "change" }],
  job: [{ required: true, message: "請輸入職業", trigger: "blur" }],
  intro: [{ required: true, message: "請輸入自我介紹", trigger: "blur" }]
};

const formRef = ref();

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      form.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function clearCities() {
  form.value.preference.cities = [];
}

function clearHobbies() {
  form.value.hobbies = [];
}

function submitForm() {
  formRef.value.validate(valid => {
    if (valid) {
      // 驗證通過才觸發 save
      emit("save", form.value);
    }
  });
}
</script>


<template>
  <div class="edit-form">
    <h3 class="text-gradient text-center">編輯交友資料</h3>

    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <!-- 照片 -->
      <el-form-item label="照片" prop="avatar">
        <div v-if="form.avatar" class="preview">
          <img :src="form.avatar" alt="預覽圖片" />
        </div>
        <input type="file" accept="image/*" @change="handleFileUpload" class="form-control"/>
      </el-form-item>

      <!-- 綽號 -->
      <el-form-item label="綽號" prop="nickname">
        <input v-model="form.nickname" type="text" class="form-control" />
      </el-form-item>

      <!-- 現居地 -->
      <el-form-item label="現居地" prop="location">
        <select v-model="form.location">
          <option disabled value="">請選擇</option>
          <option v-for="city in cities" :key="city" :value="city" class="form-select">{{ city }}</option>
        </select>
      </el-form-item>

      <!-- 職業 -->
      <el-form-item label="職業" prop="job">
        <input v-model="form.job" type="text" class=" form-control" />
      </el-form-item>

      <!-- 興趣 -->
      <el-form-item label="興趣 - 限 8 個">
        <el-select
          v-model="form.hobbies"
          multiple
          collapse-tags
          placeholder="選擇興趣"
          style="width: 100%;"
          :max-collapse-tags="10"
          size="large"
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
          <el-button type="danger" size="small" @click="clearHobbies" class=" btn-outline-primary">清除全部</el-button>
        </div>
      </el-form-item>

      <!-- 自我介紹 -->
      <el-form-item label="自我介紹 - 限 250 字" prop="intro">
        <textarea
          v-model="form.intro"
          rows="5"
          @input="form.intro = form.intro.slice(0,250)"
          class="form-textarea"></textarea>
        <p style="font-size: 13px;">剩餘字數 {{ 250 - form.intro.length }}</p>
      </el-form-item>

      <!-- 偏好設定 -->
      <h2 class="text-gradient text-center">偏好設定</h2>
      <el-form-item label="性別偏好">
        <select v-model="form.preference.gender" class="form-select">
          <option>女性</option>
          <option>男性</option>
          <option>不拘</option>
        </select>
      </el-form-item>

      <el-form-item label="年齡範圍偏好">
        <el-slider
          v-model="form.preference.ageRange"
          range
          :min="18"
          :max="80"
          :step="1"
          show-stops
          style="width: 100%;"
        />
        <p>選擇年齡：{{ form.preference.ageRange[0] }} ~ {{ form.preference.ageRange[1] }} 歲</p>
      </el-form-item>

      <el-form-item label="城市偏好">
        <el-select
          v-model="form.preference.cities"
          multiple
          collapse-tags
          placeholder="選擇城市"
          style="width: 100%;"
          :max-collapse-tags="10"
          size="large"
        >
          <el-option
            v-for="city in cities"
            :key="city"
            :label="city"
            :value="city"
          />
        </el-select>
        <div v-if="form.preference.cities.length" class="selected-cities">
          <el-button type="danger" size="small" @click="clearCities" class=" btn-outline-primary">清除全部</el-button>
        </div>
      </el-form-item>

      <!-- 儲存 & 返回按鈕 -->
      <div class="action-buttons">
        <button class="save-btn btn-outline-primary my-3" @click="$emit('cancel')">返回</button>
        <button class="save-btn btn-primary my-3" @click.prevent="submitForm">儲存</button>
      </div>
    </el-form>
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
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.save-btn {
  padding: 0.2rem 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
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
.btn-outline-primary {
  background-color: #e9e9e9;
}


:deep(.el-slider__bar) {
  background: linear-gradient(135deg, #ff4d94, #ffcc00);
}
:deep(.el-slider__button) {
  border-color: #ff4d94;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(255, 77, 148, 0.6);
}



/* 改選中的 tag 顏色 */
:deep(.el-select .el-tag) {
border:1px solid #ff4d94;;
  color: #ff4d94;
background-color: #f8f9fa;
}



@media (min-width: 1200px) {
  .edit-form {
    width: 50%;
  }
}
</style>

