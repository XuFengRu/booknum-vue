<script setup>
import { ref } from 'vue'

// 模擬資料 (對應截圖中的欄位)
const formData = ref({
    name: '張小明',
    gender: 'M',
    birthday: '1990-05-15',
    phone: '+886 912 345 678',
    email: 'xiaoming@example.com',
    role: '一般會員',
    status: '啟用',
    id: '#1',
    createdAt: '2024-01-15',
    lastLogin: '2026-01-28 09:30',
    lastIp: '192.168.1.100'
})
</script>

<template>
    <div class="profile-settings">
        <div class="mb-4">
            <h3 class="fw-bold mb-1">個人資料</h3>
            <p class="text-muted small">更新您的個人資訊和帳戶資料</p>
        </div>

        <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-lg-5">
                
                <h6 class="fw-bold mb-3 border-bottom pb-2" style="color: var(--text-main);">基本資料</h6>
                <div class="row g-4 mb-4">
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">姓名 (Name)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-person"></i>
                            <input type="text" v-model="formData.name" class="form-control rounded-pill" placeholder="您的姓名">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">性別 (Gender)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-gender-ambiguous"></i>
                            <select v-model="formData.gender" class="form-select form-control rounded-pill" style="cursor: pointer;">
                                <option value="M">男性</option>
                                <option value="F">女性</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">生日 (Birthdate)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-calendar-event"></i>
                            <input type="date" v-model="formData.birthday" class="form-control rounded-pill">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">電話號碼 (Phone)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-phone"></i>
                            <input type="text" v-model="formData.phone" class="form-control rounded-pill" placeholder="09xxxxxxxx">
                        </div>
                    </div>
                </div>

                <h6 class="fw-bold mb-3 border-bottom pb-2 mt-5" style="color: var(--text-main);">帳戶資訊</h6>
                <div class="row g-4 mb-4">
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">登入帳號 (Account)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-envelope-at"></i>
                            <input type="text" v-model="formData.email" class="form-control rounded-pill bg-light" disabled>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">Email 驗證狀態</label>
                        <div class="d-flex align-items-center h-100 pb-3 ps-2">
                            <span class="badge bg-success rounded-pill px-3 py-2 shadow-sm">
                                <i class="bi bi-check-circle-fill me-1"></i> 已驗證
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">會員角色 (Role)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-person-badge"></i>
                            <input type="text" v-model="formData.role" class="form-control rounded-pill bg-light" disabled>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label small fw-bold text-muted ms-2">帳戶狀態 (Status)</label>
                        <div class="input-icon-group">
                            <i class="bi bi-toggle-on"></i>
                            <select class="form-select form-control rounded-pill bg-light" disabled>
                                <option selected>啟用</option>
                                <option>停用</option>
                            </select>
                        </div>
                    </div>
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

                <h6 class="fw-bold mb-3 mt-5 ms-2">帳戶詳細資訊</h6>
                <div class="bg-light rounded-4 p-4 border-0">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <small class="text-muted d-block mb-1">帳戶 ID</small>
                            <span class="fw-bold text-dark">{{ formData.id }}</span>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted d-block mb-1">建立時間 (CreateAt)</small>
                            <span class="fw-bold text-dark">{{ formData.createdAt }}</span>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted d-block mb-1">最後登入時間</small>
                            <span class="fw-bold text-dark">{{ formData.lastLogin }}</span>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted d-block mb-1">最後登入 IP</small>
                            <span class="fw-bold text-dark">{{ formData.lastIp }}</span>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end gap-3 mt-5">
                    <button class="btn btn-light rounded-pill px-4 fw-bold text-muted border">取消</button>
                    <button class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm btn-pulse">
                        儲存
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>