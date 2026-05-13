import axios from 'axios'

const http = axios.create({
  baseURL: 'http://10.132.203.35:21571/api',
  timeout: 10000
})

export default http