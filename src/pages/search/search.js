import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import qs from 'qs'
import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'
let {
  keyword,
  id
} = qs.parse(location.search.substr(1))

console.log(keyword,id)
new Vue({
  el: '.container',
  data: {
    searchList: null,
    keyword,
    isShow: false,
  },
  created() {
      this.getSearchList()
  },
  methods: {
    getSearchList() {
      axios.get(url.searchList, {
        keyword,
        id
      }).then(res=>{
          this.searchList = res.data.lists
      })
    },
    move(){
      console.log('move')
      console.log(document.documentElement.scrollTop)
      if(document.documentElement.scrollTop > 300){
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    toTop(){
      velocity(document.body, 'scroll', {duration: 500})
    },
  },
  mixins:[mixin]
})
