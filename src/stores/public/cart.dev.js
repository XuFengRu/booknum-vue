"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartStore = void 0;

var _pinia = require("pinia");

var _vue = require("vue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useCartStore = (0, _pinia.defineStore)('cart', function () {
  var items = (0, _vue.ref)([]);
  var itemCount = (0, _vue.computed)(function () {
    return items.value.length;
  }); // 加入商品時強制轉型，避免 price / hours 是字串

  function addItem(item) {
    items.value.push(_objectSpread({}, item, {
      price: Number(item.price) || 0,
      hours: Number(item.hours) || 1
    }));
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