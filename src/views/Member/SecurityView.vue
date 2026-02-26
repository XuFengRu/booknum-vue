<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()
const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const pwForm = ref({
    current: '',
    new: '',
    confirm: ''
})

// 🌟 處理停用或刪除 (兩者都是設為 Status = 0)
const handleDeactivate = (actionType) => {
    const title = actionType === 'disable' ? '確定要停用帳戶嗎？' : '確定要永久刪除帳戶嗎？';
    const text = actionType === 'disable' ? '停用後您的檔案將不會被其他人看見。' : '系統會將您的狀態設為刪除，此操作無法復原。';
    const confirmBtnText = actionType === 'disable' ? '確認停用' : '確認刪除';

    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: confirmBtnText,
        cancelButtonText: '取消',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                Swal.fire({ title: '處理中...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } })

                // 呼叫 API 將 Status 設為 0
                await axios.post('/Member/Deactivate', {}, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                })

                await Swal.fire({ icon: 'success', title: '操作成功', text: '您的帳號已成功停用/刪除，即將登出。', confirmButtonColor: '#0d6efd' })

                // 清除本地儲存並登出
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
                
                router.push('/login')
            } catch (error) {
                Swal.fire({ icon: 'error', title: '操作失敗', text: '系統忙碌中，請稍後再試。' })
            }
        }
    })
}
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto" 
         style="max-width: 1300px; height: 650px;">
      <div class="row g-0 h-100">
        
        <div class="col-lg-6 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end border-light-subtle">
          
          <div class="mb-4 pb-3 border-bottom border-light-subtle">
            <h3 class="fw-bolder mb-0 text-gradient"><i class="bi bi-shield-lock-fill me-2"></i>帳號安全</h3>
          </div>

          <h5 class="fw-bold text-dark mb-4">修改密碼</h5>
          
          <div class="row g-4">
              <div class="col-12">
                  <label class="form-label fw-bold text-muted small ms-1">目前密碼</label>
                  <div class="input-group-custom mb-0">
                      <input type="password" v-model="pwForm.current" class="form-control" placeholder="請輸入目前密碼">
                      <i class="bi bi-unlock"></i>
                  </div>
              </div>
              <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">新密碼</label>
                  <div class="input-group-custom mb-0">
                      <input type="password" v-model="pwForm.new" class="form-control" placeholder="請設定新密碼">
                      <i class="bi bi-key"></i>
                  </div>
              </div>
              <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">確認新密碼</label>
                  <div class="input-group-custom mb-0">
                      <input type="password" v-model="pwForm.confirm" class="form-control" placeholder="請再次輸入新密碼">
                      <i class="bi bi-check-circle"></i>
                  </div>
              </div>
              <div class="col-12 mt-2">
                  <p class="text-muted small ms-2 mb-0"><i class="bi bi-info-circle me-1"></i>至少 8 個字元，建議包含英文和數字</p>
              </div>
          </div>
          
          <div class="d-flex justify-content-end align-items-center mt-auto pt-4 border-top border-light-subtle">
              <button class="btn btn-light rounded-pill flex-fill text-nowrap fw-bold">取消</button>
              <button class="btn btn-primary rounded-pill flex-fill text-nowrap shadow-sm">更新密碼</button>

          </div>

        </div>

        <div class="col-lg-6 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
          
          <h5 class="fw-bold text-dark mb-3"><i class="bi bi-link-45deg text-primary me-2 opacity-75"></i>社群帳號連結</h5>
          <div class="row g-3">
              <div class="col-12">
                  <div class="d-flex align-items-center justify-content-between p-3 rounded-4 bg-white border border-light-subtle shadow-sm">
                      <div class="d-flex align-items-center gap-3">
                          <div class="bg-light rounded-circle d-flex align-items-center justify-content-center border" style="width: 48px; height: 48px;">
                              <i class="bi bi-google fs-5 text-danger"></i>
                          </div>
                          <div class="text-start">
                              <h6 class="fw-bold mb-0 text-dark">Google</h6>
                              <small class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i>已連結</small>
                          </div>
                      </div>
                      <button class="btn btn-danger fw-bold rounded-pill px-4 shadow-sm text-nowrap">解除</button>
                  </div>
              </div>
              <div class="col-12">
                  <div class="d-flex align-items-center justify-content-between p-3 rounded-4 bg-white border border-light-subtle shadow-sm">
                      <div class="d-flex align-items-center gap-3">
                          <div class="bg-light rounded-circle d-flex align-items-center justify-content-center border" style="width: 48px; height: 48px;">
                              <i class="bi bi-facebook fs-5 text-primary"></i>
                          </div>
                          <div class="text-start">
                              <h6 class="fw-bold mb-0 text-dark">Facebook</h6>
                              <small class="text-muted fw-bold">尚未連結</small>
                          </div>
                      </div>
                      <button class="btn btn-outline-primary rounded-pill px-4 fw-bold text-nowrap">連結帳號</button>
                  </div>
              </div>
          </div>

          <div class="border border-danger border-opacity-50 rounded-4 p-4 mt-auto bg-white shadow-sm">
              <h6 class="fw-bold text-danger mb-3"><i class="bi bi-exclamation-triangle-fill me-2"></i>危險區域</h6>
              <p class="small text-muted mb-4">這些操作無法復原，請謹慎使用</p>
              
              <div class="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom border-danger border-opacity-25">
                  <div>
                      <h6 class="fw-bold mb-1 text-dark">停用帳戶</h6>
                      <small class="text-muted">暫時停用您的帳戶 (Status = 0)</small>
                  </div>
                  <button @click="handleDeactivate('disable')" class="btn btn-outline-danger fw-bold rounded-pill px-4">停用</button>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                  <div>
                      <h6 class="fw-bold mb-1 text-dark">刪除帳戶</h6>
                      <small class="text-muted">永久刪除您的帳戶和所有資料</small>
                  </div>
                  <button @click="handleDeactivate('delete')" class="btn btn-danger fw-bold rounded-pill px-4 shadow-sm">刪除帳戶</button>
              </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 991.98px) {
  .card { height: auto !important; }
  .col-lg-6 { height: auto !important; }
}
</style>