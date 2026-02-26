<script setup>
defineProps({
  image: String,
  name: String,
  tag: String,
  tagColor: {
    type: String,
    default: 'danger'
  },
  specialty: String,
  price: String
})
</script>

<template>
  <div class="card h-100 border-0 shadow-sm bg-white" style="border-radius: 20px;">
    <div class="position-relative p-2">
      <div class="ratio" style="--bs-aspect-ratio: 135%;">
        <img :src="image" class="w-100 h-100 object-fit-cover" :alt="name"
          style="border-radius: 20px; object-position: center;">
      </div>
    </div>

    <div class="card-body px-4 pb-4 pt-2 text-start d-flex flex-column">
      <div v-if="tag" class="mb-2">
        <span :class="`badge bg-${tagColor} rounded-pill px-2 shadow-sm text-uppercase`">
          {{ tag }}
        </span>
      </div>

      <h5 class="card-title fw-bold mb-1 text-dark">{{ name }}</h5>
      <p class="card-text text-muted small mb-3 flex-grow-1">{{ specialty }}</p>

      <div class="mt-auto pt-2 border-top border-light-subtle">
        <slot>
          <h6 class="text-gradient fw-bold fs-5 mb-0">{{ price }}</h6>
        </slot>
      </div>
    </div>
  </div>
</template>