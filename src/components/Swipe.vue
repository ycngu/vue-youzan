<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" v-bind:href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

export default {
  name: "swipe",
  props: {
    lists: {
      type: Array,
      require: true
    },
    name: {}
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      pagination: {
       el: '.swiper-pagination',
      },
      autoplay: {
        delay: 3000
      }
    });
  }
  // watch:{
  //     lists(val, oldval){
  //         this.$nextTick(()=>{

  //         })
  //     }
  // }
};
</script>

<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
