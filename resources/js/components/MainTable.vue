<template>
  <div class="container mt-4 d-flex justify-content-end">
    <table class="table-responsive ml-4">
      <thead>
        <tr class="bg-secondary text-light">
          <th scope="col"></th>
          <th scope="col">
            <div class="d-flex justify-content-center">Ranking</div>
          </th>
          <th scope="row">
            <div class="d-flex justify-content-center">Nombre</div>
          </th>
          <th scope="row">
            <div class="d-flex justify-content-center">precio</div>
          </th>
          <th scope="row">
            <div class="d-flex justify-content-center">Cap. de Mercado</div>
          </th>
          <th scope="row">
            <div class="d-flex justify-content-center">Variacion 24hs</div>
          </th>
          <td>
            <input
              class="form-control"
              id="filter"
              placeholder="Buscar..."
              type="text"
              v-model="filter"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredAssets" :key="item.id">
          <td>
            <img
              class="stupid-img"
              :src="
                `https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`
              "
              alt
            />
          </td>
          <td>
            <b># {{ item.rank }}</b>
          </td>
          <td>
            <div>
              <router-link :to="{ name: 'CoinDetail', params: { id: item.id } }">
                <h5>{{ item.name }}</h5>
              </router-link>
            </div>
            <div>
              <small>{{ item.symbol }}</small>
            </div>
          </td>
          <td>{{ item.priceUsd | dollar }}</td>
          <td>{{ item.marketCapUsd | dollar }}</td>
          <td
            :class="
              item.changePercent24Hr.includes('-')
                ? 'text-danger'
                : 'text-success'
            "
          >{{ item.changePercent24Hr | percent }}</td>
          <td class="d-flex justify-content-center">
            <Button @custom-click="goTocoin(item.id)">Detalle</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "MainTable",

  components: {
    Button
  },

  data() {
    return {
      filter: ""
    };
  },

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filteredAssets() {
      if (!this.filter) {
        return this.assets;
      }

      return this.assets.filter(
        item =>
          item.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  },

  methods: {
    goTocoin(id) {
      this.$router.push({ name: "CoinDetail", params: { id } });
    }
  }
};
</script>

<style scoped>
td {
  text-align: center;
}
</style>
