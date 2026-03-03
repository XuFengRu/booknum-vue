<template>
  <teleport to="body">
    <div class="modal fade" id="unmatchModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered unmatch-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-danger">心碎了！<i class="bi bi-heartbreak text-danger me-2"></i> <i class="bi bi-heartbreak text-danger me-2"></i> <i class="bi bi-heartbreak text-danger me-2"></i> </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            確定要解除配對嗎？<br/>解除後將無法再與此人聊天。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmUnmatch" data-bs-dismiss="modal">
              確定解除
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import axios from 'axios'
const props = defineProps({ chat: Object })
const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
const userId = storedUser?.id

async function confirmUnmatch() {
  try {
    await axios.post('https://localhost:7091/api/MatchChat/unmatch', {
      roomId: props.chat.id,
      userId: userId
    })
    window.location.href = '/member/dating/messages'
  } catch (err) {
    console.error('解除配對失敗:', err)
  }
}
</script>

<style scoped>
/* 背景遮罩 */
.unmatch-modal .modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* Modal 外框 */
.unmatch-modal .modal-content {
  background: #fff;
  border-radius: 15px;       /* 方一點 */
  padding: 20px;            /* 內距 */
  min-width: 300px;         /* 最小寬度 */
  max-width: 400px;         /* 最大寬度 */
  height: 300px;            /* 固定高度，讓比例更方 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;       /* 文字置中 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.2); /* 陰影 */
}

/* 標題 */
.unmatch-modal .modal-title {
  font-weight: bold;
  margin-bottom: 10px;
}


/* 內容文字 */
.unmatch-modal .modal-body {
  word-wrap: break-word;
  white-space: normal;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 按鈕區 */
.unmatch-modal .modal-footer {
  border-top: none;         /* 移除上邊框 */
  display: flex;
  justify-content: center;  /* 按鈕置中 */
  gap: 10px;
}
</style>