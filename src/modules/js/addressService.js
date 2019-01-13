import fetch from './fetch.js'
import url from './api.js'

class Address {
  static list() {
    return fetch.get(url.addressLists)
  }

  static add(data) {
    return fetch.post(url.addressAdd, data)
  }

  static remove(id) {
    return fetch.post(url.addressRemove, id)
  }

  static update(data) {
    return fetch.post(url.addressUpdate, data)
  }
  static SetDefault(id) {
    return fetch.post(url.addressSetDefault, id)
  }
}

export default Address