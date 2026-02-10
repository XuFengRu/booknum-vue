<script setup>
// 這裡之後可以放修改密碼的邏輯
</script>

<template>
    <div class="security-settings">
        <div class="mb-4">
            <h3 class="fw-bold mb-1">安全設定</h3>
            <p class="text-muted small">管理您的密碼和帳戶安全性</p>
        </div>

        <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-lg-5">
                
                <h6 class="fw-bold mb-3 border-bottom pb-2" style="color: var(--text-main);">修改密碼</h6>

                <div class="mb-4">
                    <label class="form-label small fw-bold text-muted ms-2">目前密碼</label>
                    <div class="input-icon-group">
                        <i class="bi bi-lock"></i> <input type="password" class="form-control rounded-pill" placeholder="請輸入目前密碼">
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label small fw-bold text-muted ms-2">新密碼</label>
                    <div class="input-icon-group">
                        <i class="bi bi-key"></i> <input type="password" class="form-control rounded-pill" placeholder="請輸入新密碼">
                    </div>
                    <div class="text-muted small ms-3 mt-1">
                        <i class="bi bi-info-circle me-1"></i>至少 8 個字元，包含英文和數字
                    </div>
                </div>

                <div class="mb-5">
                    <label class="form-label small fw-bold text-muted ms-2">確認新密碼</label>
                    <div class="input-icon-group">
                        <i class="bi bi-check-circle"></i>
                        <input type="password" class="form-control rounded-pill" placeholder="請再次輸入新密碼">
                    </div>
                </div>
                <div class="d-flex justify-content-end gap-3 mb-5">
                    <button class="btn btn-light rounded-pill px-4 fw-bold text-muted border">取消</button>
                    <button class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm btn-pulse">
                        更新密碼
                    </button>
                </div>
                <h6 class="fw-bold mb-3 border-bottom pb-2 mt-5" style="color: var(--text-main);">第三方登入 (AuthProvider)</h6>
                <div class="vstack gap-3 mb-4">
                    <div class="border rounded-4 p-3 d-flex align-items-center justify-content-between bg-white shadow-sm">
                        <div class="d-flex align-items-center gap-3">
                            <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                <i class="bi bi-google text-danger fs-5"></i>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">Google</h6>
                                <small class="text-muted">使用 Google 帳號登入</small>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-4 fw-bold">連結</button>
                    </div>
                    
                    <div class="border rounded-4 p-3 d-flex align-items-center justify-content-between bg-white shadow-sm">
                        <div class="d-flex align-items-center gap-3">
                            <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                <i class="bi bi-facebook text-primary fs-5"></i>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">Facebook</h6>
                                <small class="text-muted">使用 Facebook 帳號登入</small>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-4 fw-bold">連結</button>
                    </div>
                </div>



                <div class="border border-danger border-opacity-50 rounded-4 p-4 mt-5">
                    <h6 class="fw-bold text-danger mb-3"><i class="bi bi-exclamation-triangle-fill me-2"></i>危險區域</h6>
                    <p class="small text-muted mb-4">這些操作無法復原，請謹慎使用</p>
                    
                    <div class="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom border-danger border-opacity-25">
                        <div>
                            <h6 class="fw-bold mb-1 text-dark">停用帳戶</h6>
                            <small class="text-muted">暫時停用您的帳戶 (Status = 0)</small>
                        </div>
                        <button class="btn btn-outline-danger fw-bold rounded-pill px-4">停用</button>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="fw-bold mb-1 text-dark">刪除帳戶</h6>
                            <small class="text-muted">永久刪除您的帳戶和所有資料</small>
                        </div>
                        <button class="btn btn-outline-danger fw-bold rounded-pill px-4">刪除帳戶</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>