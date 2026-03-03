<script setup>
defineProps({
  person: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['like', 'reject'])
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-3 gap-md-5 w-100 px-2 px-md-0">
    <button v-if="showActions" class="btn btn-light btn-circle btn-circle-lg flex-shrink-0 btn-reject"
      @click="$emit('reject', person)" title="跳過">
      <i class="bi bi-x-lg text-danger opacity-75"></i>
    </button>

    <div class="card overflow-hidden border-0 rounded-5 flex-fill" style="max-width: 1050px">
      <div class="row g-0 h-100">
        <div class="col-md-5 position-relative image-container">
          <img :src="person.avatar" class="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
            :alt="person.name" style="object-position: top center" />
          <div class="d-md-none position-absolute bottom-0 start-0 w-100 h-25"
            style="background: linear-gradient(to top, rgba(255, 255, 255, 1), transparent)"></div>
        </div>

        <div class="col-md-7 bg-white">
          <div class="card-body p-4 p-lg-5 d-flex flex-column justify-content-center h-100 text-start">
            <div class="d-flex align-items-end mb-4">
              <h1 class="card-title fw-bolder mb-0 me-3 text-dark display-5">{{ person.name }}</h1>
              <span class="fs-3 text-muted">{{ person.age }}歲</span>
            </div>

            <div class="mb-5 text-secondary d-flex flex-wrap gap-4 fs-5 text-uppercase fw-bold"
              style="letter-spacing: 1px">
              <span class="d-flex align-items-center">
                <i class="bi bi-briefcase-fill me-2 text-primary opacity-50"></i>{{ person.job }}
              </span>
              <span class="d-flex align-items-center">
                <i class="bi bi-geo-alt-fill me-2 text-primary opacity-50"></i>{{ person.location }}
              </span>
            </div>

            <div class="mb-4">
              <h5 class="fw-bold text-muted mb-3">興趣愛好</h5>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="hobby in person.hobbies" :key="hobby"
                  class="badge bg-light text-dark border border-light-subtle rounded-pill fw-normal px-4 py-2 fs-6">
                  {{ hobby }}
                </span>
              </div>
            </div>

            <div>
              <h5 class="fw-bold text-muted mb-3">自我介紹</h5>
              <p class="card-text lh-lg text-dark fs-6 mb-0">
                {{ person.intro }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button v-if="showActions" class="btn btn-light btn-circle btn-circle-lg flex-shrink-0 btn-like"
      @click="$emit('like', person)" title="喜歡">
      <i class="bi bi-heart-fill text-danger opacity-75"></i>
    </button>
  </div>
</template>

<style scoped>
.btn-reject:hover {
  transform: scale(1.15) rotate(-10deg);
  box-shadow: 0 1rem 3rem rgba(220, 53, 69, 0.2) !important;
  color: var(--bs-danger) !important;
  border-color: rgba(220, 53, 69, 0.2);
}

.btn-reject:hover i {
  opacity: 1 !important;
  color: #dc3545 !important;
}

.btn-like:hover {
  transform: scale(1.15) rotate(10deg);
  box-shadow: 0 1rem 3rem rgba(255, 71, 87, 0.2) !important;
  color: var(--bs-primary) !important;
  border-color: rgba(255, 71, 87, 0.2);
}

.btn-like:hover i {
  opacity: 1 !important;
  color: var(--bs-primary) !important;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;

}

@media (max-width: 767.98px) {
  .image-container {
    height: 500px;
  }
}

@media (min-width: 768px) {
  .card {
    height: 650px;
  }
}
</style>
