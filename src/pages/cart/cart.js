import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

import qs from 'qs'

new Vue({
    el:'#app',
    data:{
        lists:null,
    },
    created(){
        this.getLists()
    },
    methods:{
        getLists(){
            axios.get(url.cartLists).then(res =>{
                this.lists = res.data.cartList
            })
        }
    },
    mixins:[mixin]
})