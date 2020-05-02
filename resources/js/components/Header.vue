<template>
  <div class="header">
    <b-navbar class="navbar p-4" toggleable="md" type="dark" variant="dark">
      <div class="ml-5">
        <Icon />
        <router-link :to="{ name: 'Home' }" class="ml-2 font-weight-bold text-white">Cripto Coins</router-link>
      </div>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-5 d-flex">
          <router-link :to="item.to" v-for="item in links" :key="item.title">
            <b-nav-item :to="item.to">{{item.title}}</b-nav-item>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Icon from "./Icon";

export default {
  name: "Header",

  components: {
    Icon
  },

  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
};
</script>
