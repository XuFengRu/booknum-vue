<!-- src/components/EditProfile.vue -->
<script setup>
import { ref } from "vue";

// 模擬台灣縣市
const cities = ["台北市","新北市","桃園市","台中市","台南市","高雄市","新竹市","嘉義市","宜蘭縣","花蓮縣","台東縣"];

const form = ref({
  nickname: "",
  location: "",
  job: "",
  hobbies: [],
  intro: "",
  preference: {
    gender: "不拘",
    ageRange: [20, 40],
    cities: []
  }
});

// 興趣分類
const hobbyOptions = ["旅行","攝影","咖啡","爬山","閱讀","音樂","電影","健身","程式","美食"];

function saveProfile() {
  emit("save", form.value);
}


</script>

<template>
  <div class="edit-form">
    <h2>編輯個人資料</h2>

    <!-- 綽號 -->
    <label>綽號</label>
    <input v-model="form.nickname" type="text" />

    <!-- 現居地 -->
    <label>現居地</label>
    <select v-model="form.location">
      <option disabled value="">請選擇</option>
      <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
    </select>

    <!-- 職業 -->
    <label>職業</label>
    <input v-model="form.job" type="text" />

    <!-- 興趣 -->
    <label>興趣 (最多 8 個)</label>
    <div class="hobby-list">
      <label v-for="hobby in hobbyOptions" :key="hobby">
        <input 
          type="checkbox" 
          :value="hobby" 
          v-model="form.hobbies" 
          :disabled="form.hobbies.length >= 8 && !form.hobbies.includes(hobby)" 
        />
        {{ hobby }}
      </label>
    </div>

    <!-- 自我介紹 -->
    <label>自我介紹 (最多 250 字，換行扣 30 字)</label>
    <textarea 
      v-model="form.intro" 
      rows="5"
      @input="form.intro = form.intro.slice(0,250)"
    ></textarea>
    <p>剩餘字數：{{ 250 - form.intro.length }}</p>

    <!-- 偏好設定 -->
    <h3>偏好設定</h3>
    <label>性別</label>
    <select v-model="form.preference.gender">
      <option>女性</option>
      <option>男性</option>
      <option>不拘</option>
    </select>

    <label>年齡範圍</label>
    <input type="number" v-model="form.preference.ageRange[0]" min="18" max="99" /> ~
    <input type="number" v-model="form.preference.ageRange[1]" min="18" max="99" />

    <label>城市</label>
    <div class="city-list">
      <label v-for="city in cities" :key="city">
        <input type="checkbox" :value="city" v-model="form.preference.cities" />
        {{ city }}
      </label>
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
.hobby-list, .city-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.save-btn {
  margin-top: 1rem;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>