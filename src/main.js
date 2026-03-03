import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import axios from 'axios'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'element-plus/dist/index.css'
import './assets/common.css'
import Swal from 'sweetalert2'
import vue3GoogleLogin from 'vue3-google-login'

axios.defaults.baseURL = 'https://localhost:7091/api'
axios.interceptors.request.use(
    config => {
        // 打 API 前，去 Storage 找看有沒有 Token
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // 塞進 Header 的 Authorization 欄位裡
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 回應攔截器 (Response Interceptor)
axios.interceptors.response.use(
    response => response, // 成功的話直接回傳
    error => {
        if (error.response && error.response.status === 401) {
            
            // 避開登入 API
            if (error.config.url && error.config.url.includes('/Auth/Login')) {
                return Promise.reject(error);
            }

            Swal.fire({
                icon: 'warning',
                title: '登入已過期',
                text: '您的登入狀態已失效，請重新登入！',
                confirmButtonText: '確定',
                confirmButtonColor: '#0d6efd' // 可以配合你 Bootstrap 的 primary 顏色
            }).then(() => {
                // 等使用者點擊「確定」後，再執行清除與導覽
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                router.push('/login');
            });
        }
        return Promise.reject(error);
    }
);
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '102326183599-j7vh2u7th1eribr4cc679aj3sra2019v.apps.googleusercontent.com'
})
app.use(ElementPlus)


app.mount('#app')
