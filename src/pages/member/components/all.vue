<template>
  <div class="container" style="min-height: 597px;">
    <div
      class="block-list address-list section section-first js-no-webview-block"
      v-if="lists&&lists.length"
    >
      <a
        class="block-item js-address-item address-item"
        @click="toEdit(list)"
        :key="list.id"
        v-for="list in lists"
        :class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
      <div v-if="lists&&!lists.length">没有地址，请添加</div>
      <div class="block stick-bottom-row center">
        <router-link
          :to="{name:'form',query:{type:'add'}}"
          class="btn btn-blue js-no-webview-block js-add-address-btn"
        >新增地址</router-link>
      </div>
    </div>
  </div>
</template>


<script>
// import Address from "js/addressService.js";
import url from "js/api.js";
// import axios from "axios";
console.log(url.addressLists);
console.log(url.addressAdd);
export default {
  // data() {
  //   return {
  //     lists: null
  //   };
  // },
  computed:{
    lists(){
      return this.$store.state.lists
    }
  },
  created() {
    if(!this.lists){
      this.$store.dispatch('getLists')
    }
    // Address.list().then(res=>{
    //   console.log(res.data)
    //   this.lists = res.data.lists
    // })
    // this.getAddressList();

  },
  methods: {
    toEdit(list) {
      this.$router.push({
        name: "form",
        query: {
          type: "edit",
          instance: list
        }
      })
    },
    getAddressList() {
      axios.get(url.addressLists).then(res => {
        this.lists = res.data.lists;
      });
    }
  }
};
</script>