"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _pinia = require("pinia");

var _elementPlus = _interopRequireDefault(require("element-plus"));

var _axios = _interopRequireDefault(require("axios"));

var _router = _interopRequireDefault(require("./router"));

require("bootstrap/dist/css/bootstrap.min.css");

require("bootstrap/dist/js/bootstrap.bundle.min.js");

require("bootstrap-icons/font/bootstrap-icons.css");

require("element-plus/dist/index.css");

require("./assets/common.css");

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = 'https://localhost:7091/api';

_axios["default"].interceptors.request.use(function (config) {
  // 打 API 前，去 Storage 找看有沒有 Token
  var token = localStorage.getItem('token') || sessionStorage.getItem('token'); // 塞進 Header 的 Authorization 欄位裡

  if (token) {
    config.headers.Authorization = "Bearer ".concat(token);
  }

  return config;
}, function (error) {
  return Promise.reject(error);
}); // 回應攔截器 (Response Interceptor)


_axios["default"].interceptors.response.use(function (response) {
  return response;
}, // 成功的話直接回傳
function (error) {
  if (error.response && error.response.status === 401) {
    // 避開登入 API
    if (error.config.url && error.config.url.includes('/Auth/Login')) {
      return Promise.reject(error);
    }

    _sweetalert["default"].fire({
      icon: 'warning',
      title: '登入已過期',
      text: '您的登入狀態已失效，請重新登入！',
      confirmButtonText: '確定',
      confirmButtonColor: '#0d6efd' // 可以配合你 Bootstrap 的 primary 顏色

    }).then(function () {
      // 等使用者點擊「確定」後，再執行清除與導覽
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      _router["default"].push('/login');
    });
  }

  return Promise.reject(error);
});

var app = (0, _vue.createApp)(_App["default"]);
app.use((0, _pinia.createPinia)());
app.use(_router["default"]);
app.use(_elementPlus["default"]);
app.mount('#app');