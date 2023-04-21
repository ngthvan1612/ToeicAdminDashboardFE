import axios from "axios"

let BASE_URL = null;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8080'
}
else {
  BASE_URL = 'http://toeic-app.uteoj.com'
}

const contextInstance = axios.create({
  baseURL: BASE_URL
})

export {
  contextInstance
}
