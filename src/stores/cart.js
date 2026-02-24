// src/stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const itemCount = computed(() => items.value.length)

  // 加入商品時強制轉型，避免 price / hours 是字串
  function addItem(item) {
    items.value.push({
      ...item,
      price: Number(item.price) || 0,
      hours: Number(item.hours) || 1
    })
  }

  function clearCart() {
    items.value = []
  }

  return { items, itemCount, addItem, clearCart }
})