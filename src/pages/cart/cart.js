import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Volecity from 'velocity-animate'
import Cart from 'js/cartServer.js'

new Vue({
  el: '#app',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: '',
    showInvalid: true,
    clearCart: false,
  },
  created() {
    this.getLists()
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
        return false
      }
    },
    selectLists() {
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists() {
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    },
  },
  methods: {
    getLists() {
      axios.get(url.cartLists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.editing = false
          shop.removeChecked = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    add(good) {
      // axios.get(url.cartAdd, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number++
      // })
      Cart.add(good.id).then(res=>{
        good.number++
      })
    },
    reduce(good) {
      if (good.number === 1) return
      // axios.get(url.cartReduce, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number--
      // })
      Cart.reduce(good.id).then(res=>{
        good.number--
      })
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      }
      this.removeMsg = '确定要删除该商品吗?'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },
    removeConfirm() {
      if (this.removeMsg === '确定要删除该商品吗?') {
        let {
          shop,
          shopIndex,
          good,
          goodIndex
        } = this.removeData
        axios.post(url.cartRemove, {
          id: good.id,
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if (!shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      } else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id == good.id
            })
            if (index === -1) {
              arr.push(good)  
            }
          })
          if (arr.length) {
            this.editingShop.goodsList = arr
          } else {
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeShop() {
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    clearcart() {
      this.clearCart = true
    },
    clearConfirm() {
      this.clearCart = false
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex) {
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(good.startX - endX > 100) {
        left = '-60px'
      }
      if(endX - good.startX > 100) {
        left = '0px'
      }
      Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
        left
      })
    },
    clearInvalid(){
      this.showInvalid = false
    }
  },
  mixins: [mixin]
})
