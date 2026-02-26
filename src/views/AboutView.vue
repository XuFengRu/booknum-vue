<script setup>
import { onMounted } from 'vue'
// 如果您在 main.js 中沒有全域引入 bootstrap JS，請在這裡引入以讓 Modal/Dropdown 運作
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 如果您有 common.css，請確保已在 main.js 引入，或在這裡 import
// import '@/assets/common.css'

onMounted(() => {
  console.log('UI Guide Mounted')
})
</script>

<template>
  <div class="guide-wrapper">
    
    <div class="guide-header text-center">
      <div class="container">
        <h1 class="fw-bold text-gradient">UI Design System Guide</h1>
        <p class="text-muted">基於 common.css 的元件使用手冊</p>
      </div>
    </div>

    <div class="container">

      <div class="component-section">
        <h3 class="section-title">1. 色彩與文字 (Colors & Typography)</h3>
        <div class="row">
          <div class="col-md-6">
            <h6>品牌色 (Variables)</h6>
            <div class="row">
              <div class="col-6">
                <div class="color-swatch" style="background: var(--color-primary);">Primary</div>
                <small>var(--color-primary)</small>
              </div>
              <div class="col-6">
                <div class="color-swatch" style="background: var(--color-secondary);">Secondary</div>
                <small>var(--color-secondary)</small>
              </div>
            </div>
            <div class="mt-3">
              <div class="color-swatch bg-gradient">Gradient Main</div>
              <small>.bg-gradient / var(--gradient-main)</small>
            </div>
          </div>
          <div class="col-md-6">
            <h6>文字樣式</h6>
            <h2 class="text-gradient fw-bold">漸層標題 Text Gradient</h2>
            <p class="text-primary">主色文字 Text Primary</p>
            <div class="d-flex gap-3 align-items-center">
              <a href="#" class="text-gradient-hover active">導航連結 (Active)</a>
              <a href="#" class="text-gradient-hover">導航連結 (Hover Me)</a>
            </div>

            <div class="code-block">
&lt;span class="text-gradient"&gt;漸層文字&lt;/span&gt;
&lt;p class="text-primary"&gt;主色文字&lt;/p&gt;
&lt;a class="text-gradient-hover"&gt;導航特效&lt;/a&gt;
            </div>
          </div>
        </div>
      </div>

      <div class="component-section">
        <h3 class="section-title">2. 按鈕 (Buttons)</h3>
        <p class="text-muted mb-4">直接使用 Bootstrap 原生 class，CSS 會自動覆蓋為漸層風格。</p>

        <div class="row align-items-center">
          <div class="col-md-5 d-grid gap-2">
            <button class="btn btn-primary">主要按鈕</button>
            <button class="btn btn-primary rounded-pill">圓角按鈕</button>
            <button class="btn btn-outline-primary">外框按鈕 (Outline)</button>
            <button class="btn btn-primary btn-pulse rounded-pill">呼吸特效 (Pulse)</button>
            <a href="#" class="btn btn-primary">連結按鈕 (Link)</a>
          </div>
          <div class="col-md-7">
            <div class="code-block">
&lt;!-- 標準實心 --&gt;
&lt;button class="btn btn-primary"&gt;Button&lt;/button&gt;

&lt;!-- 圓角樣式 --&gt;
&lt;button class="btn btn-primary rounded-pill"&gt;Rounded&lt;/button&gt;

&lt;!-- 外框樣式 --&gt;
&lt;button class="btn btn-outline-primary"&gt;Outline&lt;/button&gt;

&lt;!-- 呼吸燈特效 (用於強調) --&gt;
&lt;button class="btn btn-primary btn-pulse"&gt;Pulse&lt;/button&gt;
            </div>
            <div class="mt-2">
              <span class="class-tag">.btn-primary</span>
              <span class="class-tag">.btn-outline-primary</span>
              <span class="class-tag">.rounded-pill</span>
              <span class="class-tag">.btn-pulse</span>
            </div>
          </div>
        </div>
      </div>

      <div class="component-section">
        <h3 class="section-title">3. 表單 (Forms)</h3>

        <div class="row">
          <div class="col-md-6">
            <h5 class="mb-3">基礎樣式</h5>
            <div class="mb-3">
              <label class="form-label">一般輸入框</label>
              <input type="text" class="form-control" placeholder="Focus me...">
            </div>
            <div class="mb-3">
              <label class="form-label">下拉選單</label>
              <select class="form-select">
                <option>請選擇...</option>
                <option>選項 A</option>
              </select>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="check1" checked>
              <label class="form-check-label" for="check1">已勾選 (粉色)</label>
            </div>
          </div>

          <div class="col-md-6">
            <h5 class="mb-3">帶圖示輸入框 (Icon Group)</h5>
            <div class="alert alert-light border">
              <small class="text-danger fw-bold">注意：</small> 必須包裹在 <code>.input-icon-group</code> 內，CSS 會自動調整 padding。
            </div>

            <div class="input-icon-group">
              <i class="bi bi-person"></i>
              <input type="text" class="form-control" placeholder="使用者帳號">
            </div>

            <div class="input-icon-group mt-3">
              <i class="bi bi-lock"></i>
              <input type="password" class="form-control" placeholder="密碼">
            </div>

            <div class="code-block">
&lt;div class="input-icon-group"&gt;
    &lt;i class="bi bi-person"&gt;&lt;/i&gt;
    &lt;input class="form-control"&gt;
&lt;/div&gt;
            </div>
          </div>
        </div>
      </div>

      <div class="component-section">
        <h3 class="section-title">4. 卡片系統 (Cards)</h3>
        <p>整合了舊有的 base/noir/dating card，現在統一使用修飾符。</p>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">1. 基礎卡片</h5>
                <p class="text-muted">使用 <code>.card</code></p>
                <p class="card-text small">適合用於排版底座，靜態不浮動。</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card card-hover h-100">
              <div class="card-body">
                <h5 class="card-title text-primary">2. 懸浮卡片</h5>
                <p class="text-muted">使用 <code>.card.card-hover</code></p>
                <p class="card-text small">滑鼠移上來會上浮並發光，適合商品或可點擊項目。</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card card-login h-100">
              <div class="card-body text-center d-flex flex-column justify-content-center">
                <h5 class="card-title">3. 特色/登入卡</h5>
                <p class="text-muted">使用 <code>.card-login</code></p>
                <button class="btn btn-primary btn-sm rounded-pill mt-2">Action</button>
              </div>
            </div>
          </div>
        </div>

        <div class="code-block">
&lt;!-- 1. 靜態 --&gt;
&lt;div class="card"&gt;...&lt;/div&gt;

&lt;!-- 2. 動態懸浮 --&gt;
&lt;div class="card card-hover"&gt;...&lt;/div&gt;

&lt;!-- 3. 大圓角深陰影 (原 dating-card) --&gt;
&lt;div class="card card-login"&gt;...&lt;/div&gt;
        </div>
      </div>

      <div class="component-section">
        <h3 class="section-title">5. 導航與組件 (Nav & Components)</h3>

        <div class="row">
          <div class="col-md-6 mb-4">
            <h6>分頁 (Pagination)</h6>
            <nav>
              <ul class="pagination">
                <li class="page-item disabled"><a class="page-link" href="#">Prev</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
            <div class="code-block mt-2">
&lt;ul class="pagination"&gt;...&lt;/ul&gt;
            </div>
          </div>

          <div class="col-md-6 mb-4">
            <h6>膠囊標籤 (Pills)</h6>
            <ul class="nav nav-pills">
              <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
            </ul>
            <div class="code-block mt-2">
&lt;ul class="nav nav-pills"&gt;...&lt;/ul&gt;
            </div>
          </div>

          <div class="col-md-6">
            <h6>手風琴 (Accordion)</h6>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    點擊展開 (粉色背景)
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show">
                  <div class="accordion-body">
                    內容區域...
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <h6>標籤 (Badges)</h6>
            <div class="mb-3">
              <span class="badge bg-gradient me-1">New</span>
              <span class="badge bg-gradient rounded-pill me-1">Featured</span>
              <span class="badge bg-light text-dark">Default</span>
            </div>
            <div class="code-block">
&lt;span class="badge bg-gradient"&gt;Text&lt;/span&gt;
            </div>
          </div>
        </div>
      </div>

      <div class="component-section">
        <h3 class="section-title">6. 表格與模態框 (Tables & Modals)</h3>

        <div class="row">
          <div class="col-md-7 mb-4">
            <h5 class="mb-3">資料表格</h5>
            <p class="text-muted small">表頭有粉色下底線，滑鼠移動到每一列會有粉色背景。</p>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">使用者</th>
                    <th scope="col">狀態</th>
                    <th scope="col">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Alice Wang</td>
                    <td><span class="badge bg-gradient rounded-pill">Active</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Edit</button></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Bob Chen</td>
                    <td><span class="badge bg-secondary rounded-pill">Offline</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Edit</button></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Cindy Lo</td>
                    <td><span class="badge bg-gradient rounded-pill">Active</span></td>
                    <td><button class="btn btn-sm btn-outline-primary">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="code-block mt-2">
&lt;table class="table"&gt;
    &lt;thead&gt;...&lt;/thead&gt;
    &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;
            </div>
          </div>

          <div class="col-md-5 mb-4">
            <h5 class="mb-3">模態框 (Modal)</h5>
            <p class="text-muted small">點擊下方按鈕測試。Header 會有粉色底線。</p>

            <button type="button" class="btn btn-primary btn-pulse" data-bs-toggle="modal" data-bs-target="#exampleModal">
              開啟範例 Modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Modal 標題</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p>這裡的 Header 下方有一條粉紅色的線 (border-bottom)，這是 common.css 自動套用的樣式。</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary">確認</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="code-block mt-3">
&lt;!-- 標準 Bootstrap Modal 結構 --&gt;
&lt;div class="modal-header"&gt;
   &lt;!-- 自動套用粉色底線 --&gt;
&lt;/div&gt;
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 頁面專屬排版樣式 */
.guide-wrapper {
  background-color: #f4f6f8;
  min-height: 100vh;
  padding-bottom: 100px;
}

.guide-header {
  background: #fff;
  padding: 40px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 40px;
}

.component-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

.section-title {
  border-left: 5px solid #FF3366;
  padding-left: 15px;
  margin-bottom: 25px;
  font-weight: 700;
  color: #333;
}

.code-block {
  background: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  margin-top: 15px;
  position: relative;
  /* 讓過長代碼可捲動 */
  overflow-x: auto; 
}

.class-tag {
  display: inline-block;
  background: #ffe0e6;
  color: #FF3366;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: monospace;
  margin-right: 5px;
  font-weight: bold;
}

.color-swatch {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>