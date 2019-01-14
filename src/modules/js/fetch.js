import axios from 'axios'

function fetchPost(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      let status = res.data.status
      // if (status === 200) {
      //   resolve(res)
      // } 
      // if (status === 300) {
      //   location.href = 'login.html'
      //   resolve(res)
      // } 
      resolve(res)
    }).catch(error => {
        reject(error)
    })
  })
}

function fetchGet(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, data).then(res => {
      let status = res.data.status
      // if (status === 200) {
      //   resolve(res)
      // } 
      // if (status === 300) {
      //   location.href = 'login.html'
      //   resolve(res)
      // } 
      resolve(res)
    }).catch(error => {
        reject(error)
    })
  })
}

export default {get:fetchGet,post:fetchPost}