<script setup>
import { ref, onMounted } from 'vue'
import { ElSelect, ElOption, ElSlider } from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

const props = defineProps({
  initialData: { type: Object, required: true },
})
const emit = defineEmits(['save', 'cancel'])

const cities = [
  '基隆市',
  '台北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '宜蘭縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '台南市',
  '高雄市',
  '屏東縣',
  '花蓮縣',
  '台東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
]

// 興趣清單
const hobbyOptions = ref([])

const form = ref({
  name: '',
  location: '',
  job: '',
  avatar: '',
  hobbies: [],
  intro: '',
  preference: { gender: '不拘', ageRange: [18, 70], cities: [] },
})

onMounted(async () => {
  form.value = JSON.parse(JSON.stringify(props.initialData))

  try {
    const res = await axios.get('https://localhost:7091/api/matchinfo/hobbies')
    hobbyOptions.value = res.data // [{ hobbyId, hobbyName }]
  } catch (err) {
    console.error('載入興趣清單失敗:', err)
  }
})

//照片
async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append("file", file)

  try {
    const res = await axios.post("https://localhost:7091/api/matchinfo/upload-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    form.value.avatar = res.data.path  // ✅ 有人臉 → 保留
  } catch (err) {
    form.value.avatar = form.value.avatar             // ❌ 沒有人臉 → 清空
    alert(err.response?.data || "照片上傳失敗")
  }
}
async function submitForm() {
  if (
    !form.value.name ||
    !form.value.location ||
    !form.value.job ||
    !form.value.intro ||
    !form.value.avatar
  ) {
    alert('請填寫必填欄位！（相片、姓名、職業、所在地、自我介紹）')
    return
  }

  try {
    const dto = {
      Nickname: form.value.name,
      Bio: form.value.intro,
      CurrentCity: form.value.location,
      Photo: form.value.avatar,
      Job: form.value.job,

      // 傳 HobbyId
      Hobbies: form.value.hobbies.map((id) => ({ HobbyId: id })),

      GenderPrefer:
        form.value.preference.gender === '不拘'
          ? null
          : form.value.preference.gender === '男性'
            ? 1
            : 0,

      AgeMin: form.value.preference.ageRange[0],
      AgeMax: form.value.preference.ageRange[1],
      Cities: form.value.preference.cities,
    }

    await axios.put(`https://localhost:7091/api/matchinfo/${props.initialData.userId}`, dto)

    alert('更新成功！')
    emit('save', form.value)
  } catch (err) {
    console.error('更新失敗:', err)
    alert('更新失敗，請稍後再試')
  }
}
</script>

<template>
  <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto" style="max-width: 1300px; height: 650px">
    <div class="row g-0 h-100">
      <div class="col-lg-4 h-100 position-relative bg-dark">
        <img v-if="form.avatar" :src="form.avatar" class="w-100 h-100 object-fit-cover opacity-75" alt="Preview" />

        <div class="position-absolute top-50 start-50 translate-middle text-center w-100">
          <label class="btn btn-light rounded-pill fw-bold" style="cursor: pointer">
            <i class="bi bi-camera-fill me-2 text-gradient"></i>更換照片
            <input type="file" accept="image/*" class="d-none" @change="handleFileUpload" />
          </label>
        </div>
      </div>

      <div class="col-lg-4 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end border-light-subtle">
        <h4 class="fw-bolder text-dark mb-4 text-gradient">
          <i class="bi bi-pencil-square me-2"></i>基本資料（必填）
        </h4>

        <div class="mb-3">
          <label class="form-label fw-bold text-muted small">姓名 / 綽號</label>
          <input v-model="form.name" type="text" class="form-control" placeholder="輸入名稱" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold text-muted small">職業</label>
          <input v-model="form.job" type="text" class="form-control" placeholder="例如：設計師" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold text-muted small">所在地</label>
          <el-select v-model="form.location" placeholder="請選擇" size="large" style="width: 100%">
            <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
          </el-select>
        </div>

        <div class="mb-3 flex-grow-1 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-end mb-1">
            <label class="form-label fw-bold text-muted small mb-0">自我介紹</label>
            <small class="text-muted">{{ form.intro?.length || 0 }} / 250</small>
          </div>
          <textarea v-model="form.intro" class="form-control flex-grow-1" maxlength="250"
            placeholder="介紹一下自己吧..."></textarea>
        </div>
      </div>

      <div class="col-lg-4 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
        <div class="flex-grow-1">
          <h4 class="fw-bolder text-dark mb-4 text-gradient">
            <i class="bi bi-sliders me-2"></i>偏好與興趣
          </h4>

          <div class="mb-4">
            <label class="form-label fw-bold text-muted small">興趣愛好 (最多 8 個)</label>
            <el-select v-model="form.hobbies" multiple collapse-tags placeholder="選擇興趣" style="width: 100%"
              :max-collapse-tags="5" size="large">
              <el-option v-for="hobby in hobbyOptions" :key="hobby.hobbyId" :label="hobby.hobbyName"
                :value="hobby.hobbyId" :disabled="form.hobbies.length >= 8 && !form.hobbies.includes(hobby.hobbyId)" />
            </el-select>
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold text-muted small">期望性別</label>
            <el-select v-model="form.preference.gender" placeholder="請選擇性別" size="large" style="width: 100%">
              <el-option label="女性" value="女性" />
              <el-option label="男性" value="男性" />
              <el-option label="不拘" value="不拘" />
            </el-select>
          </div>

          <div class="mb-4 px-2">
            <label class="form-label fw-bold text-muted small mb-0">期望年齡 ({{ form.preference.ageRange[0] }} ~
              {{ form.preference.ageRange[1] }} 歲)</label>
            <el-slider v-model="form.preference.ageRange" range :min="18" :max="70" :step="1" />
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold text-muted small">期望所在地區</label>
            <el-select v-model="form.preference.cities" multiple collapse-tags placeholder="選擇城市 (留空為不拘)"
              style="width: 100%" :max-collapse-tags="5" size="large">
              <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
            </el-select>
          </div>
        </div>

        <div class="d-flex gap-3 mt-auto pt-3">
          <button @click="$emit('cancel')" class="btn btn-light rounded-pill flex-fill text-nowrap">
            取消
          </button>
          <button @click="submitForm" class="btn btn-primary rounded-pill flex-fill text-nowrap">
            儲存變更
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-slider__bar) {
  background: var(--bs-primary);
}

:deep(.el-slider__button) {
  border-color: var(--bs-primary);
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(200, 200, 200, 0.6) inset;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--bs-primary) inset !important;
}

@media (max-width: 991.98px) {
  .card {
    height: auto !important;
  }

  .col-lg-4 {
    height: auto !important;
  }

  .col-lg-4 img {
    height: 350px;
  }
}
</style>
