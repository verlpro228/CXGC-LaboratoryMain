import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器 
http.interceptors.request.use(
  config => {
    // 在发送请求之前做什么
    const token = localStorage.getItem('xg_token')
    if (token) {
      // 每次请求都添加token
      config.headers.Authorization = `Bearer ${token}`
    }
    // 返回配置 继续请求
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
http.interceptors.response.use(
  // 处理成功响应
  response => {
    // 文件下载直接返回 不做处理
    // 下载的文件是blob类型 二进制数据 不处理
    if (response.config.responseType === 'blob') return response
    // 获取响应式数据中的code和message
    const { code, message } = response.data
    // 成功
    if (code === 200) return response
    //错误
    ElMessage.error(message || '操作失败')
    return Promise.reject(new Error(message || '操作失败'))
  },
  // 处理错误响应
  error => {
    //token过期或无效
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('xg_token')
      window.location.href = '/login'
      ElMessage.error('登录已过期，请重新登录')
      return Promise.reject(error)
    }
    // 其他错误
    ElMessage.error('其他错误，请稍后重试')
    return Promise.reject(error)
  }
)

export default http
