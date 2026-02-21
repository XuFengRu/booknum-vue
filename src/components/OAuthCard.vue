<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="auth-container">
<RouterLink to="/" 
                class="btn btn-light btn-circle btn-circle-md position-absolute" 
                style="top: 25px; left: 25px; z-index: 100;" 
                title="返回首頁">
      <i class="bi bi-arrow-left"></i>
    </RouterLink>

    <div class="card auth-card mx-auto">
      <div class="row g-0">
        
        <div class="col-lg-5 d-none d-lg-flex brand-section p-5">
          <div class="deco-circle" style="width: 300px; height: 300px; top: -50px; left: -50px;"></div>
          <div class="deco-circle" style="width: 150px; height: 150px; bottom: 80px; right: -20px;"></div>

          <slot name="left-side"></slot>
        </div>

        <div class="col-lg-7 form-section p-4 p-md-5">
          <div class="w-100 mx-auto" style="max-width: 420px;">
            <slot></slot>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>