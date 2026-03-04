<template>
  <teleport to="body">
    <div class="modal fade" id="subscribeSuccessModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered subscribe-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-success">
              訂閱成功！ <i class="bi bi-check-circle-fill text-success ms-2"></i>
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            恭喜你已成功開通訂閱服務！<br/>
            到期時間：{{ expiry }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import * as bootstrap from 'bootstrap'   // ✅ 只在這個檔案引入

const expiry = ref('')

// 提供一個方法讓父層呼叫
function showModal(expiryTime) {
  expiry.value = expiryTime
  const modal = new bootstrap.Modal(document.getElementById('subscribeSuccessModal'))
  modal.show()
}

defineExpose({ showModal })
</script>

<style scoped>
.subscribe-modal .modal-content {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  min-width: 300px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>