// src/stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const itemCount = computed(() => items.value.length)

  function addItem(item) {
    items.value.push(item)
  }

  function clearCart() {
    items.value = []
  }

  return { items, itemCount, addItem, clearCart }
})