<template>
  <teleport to="body">
    <div class="modal fade" id="photoErrorModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered photo-error-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-danger">
              照片驗證失敗 <i class="bi bi-exclamation-triangle-fill text-danger ms-2"></i>
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            請提供清晰正臉照，提升交友品質！<br/>
            支援 JPG/PNG 格式。
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
/* 這個檔案只負責顯示彈窗，不需要額外邏輯 */
</script>

<style scoped>
.photo-error-modal .modal-content {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  min-width: 300px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.photo-error-modal .modal-header {
  border-bottom: none;
  justify-content: center;
}

.photo-error-modal .modal-title {
  font-weight: bold;
  text-align: center;
}

.photo-error-modal .modal-body {
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.photo-error-modal .modal-footer {
  border-top: none;
  display: flex;
  justify-content: center;
}
</style>