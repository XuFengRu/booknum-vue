"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartStore = void 0;

var _pinia = require("pinia");

var _vue = require("vue");

// src/stores/cart.js
var useCartStore = (0, _pinia.defineStore)('cart', function () {
  var items = (0, _vue.ref)([]);
  var itemCount = (0, _vue.computed)(function () {
    return items.value.length;
  });

  function addItem(item) {
    items.value.push(item);
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items: items,
    itemCount: itemCount,
    addItem: addItem,
    clearCart: clearCart
  };
});
exports.useCartStore = useCartStore;