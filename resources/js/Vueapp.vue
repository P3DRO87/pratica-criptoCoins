<template>
  <div id="vueApp">
    <Header :links="links" />
    <transition name="fade" mode="out-in">
      <router-view class="d-flex justify-content-center mt-2"></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "VueInstance",

  components: {
    Header,
    Footer
  },

  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "CoinDetail", params: { id: "bitcoin" } }
        },

        {
          title: "ETH",
          to: { name: "CoinDetail", params: { id: "ethereum" } }
        },
        {
          title: "XRP",
          to: { name: "CoinDetail", params: { id: "ripple" } }
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
