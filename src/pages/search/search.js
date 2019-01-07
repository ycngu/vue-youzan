import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import qs from 'qs'
import mixin from 'js/mixin.js'
// import velocity from 'velocity-animate'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
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
    loading:false,
    pageNum: 1,
    pageSize: 6,
    allLoaded: false,
  },
  created() {
      this.getSearchList()
  },
  methods: {
    getSearchList() {
      if(this.allLoaded) return

      this.loading = true
      axios.get(url.searchList, {
        keyword,
        id,
        pageNumL:this.pageNum,
        pageSize:this.pageSize
      }).then(res=>{
          let curList = res.data.lists
          if(curList.length < this.pageSize) {
            this.allLoaded = ture
          }

          if(this.searchList){
            this.searchList = this.searchList.concat(curList)
          } else {
            this.searchList = curList
          }

          this.pageNum ++
          this.loading = false
      })
    },
    // move(){
    //   if(document.documentElement.scrollTop > 300){
    //     this.isShow = true
    //   } else {
    //     this.isShow = false
    //   }
    // },
    toTop(){
      document.querySelector('.js-list').scrollIntoView()
      window.scrollTo(0,0)
    },
  },
  mixins:[mixin]
})
