import axios from 'axios'

export default {
  install (Vue, options) {
    const defaultOptions = {
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken'
    }
    const initOptions = {
      ...defaultOptions,
      ...options
    }
    Vue.prototype.$http = axios.create(initOptions)
  }
}
