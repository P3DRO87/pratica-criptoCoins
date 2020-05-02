<template>
  <div class="wrap mt-4">
    <div class="container">
      <div class="col d-flex justify-content-center">
        <scale-loader :loading="isLoading" :color="`#6c757d`" :size="200"></scale-loader>
      </div>
      <template v-if="!isLoading">
        <div class="row">
          <div class="col-lg-4 d-flex align-items-center">
            <div class="ml-4">
              <img
                class="stupid-img-v2"
                :src="
            `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
          "
                :alt="asset.name"
              />
            </div>
            <div class="d-flex ml-2 justify-content-center">
              <h1>{{ asset.name }}</h1>
              <small>{{ asset.symbol }}</small>
            </div>
          </div>

          <div class="col-lg-4 mt-3">
            <ul class="text-info none-ul">
              <li class="d-flex justify-content-between">
                <b>Ranking</b>
                <h4>#{{ asset.rank }}</h4>
              </li>
              <li class="d-flex justify-content-between">
                <b>Precio actual</b>
                <h4>{{ asset.priceUsd | dollar }}</h4>
              </li>
              <li class="d-flex justify-content-between">
                <b>Precio más bajo</b>
                <h4>{{ min | dollar }}</h4>
              </li>
              <li class="d-flex justify-content-between">
                <b>Precio más alto</b>
                <h4>{{ max | dollar }}</h4>
              </li>
              <li class="d-flex justify-content-between">
                <b>Precio Promedio</b>
                <h4>{{ avg | dollar }}</h4>
              </li>
              <li class="d-flex justify-content-between">
                <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                <h4>{{ asset.changePercent24Hr | percent }}</h4>
              </li>
            </ul>
          </div>
          <div class="col-lg-4">
            <div class="d-flex justify-content-center">
              <div></div>
              <div class="flex flex-row my-5">
                <label class="w-100" for="convertValue">
                  <button @click="toggleConverter" class="btn btn-secondary w-100">
                    <b>{{fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD`}}</b>
                  </button>
                </label>
                <div class="mt-2">
                  <input
                    v-model="convertValue"
                    id="convertValue"
                    type="number"
                    class="form-control"
                    :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                  />
                </div>
                <div class="mt-2 d-flex justify-content-center">
                  <p>{{convertResult}} {{fromUsd ? asset.symbol : 'USD'}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <line-chart
              class="my-10"
              :colors="['#007bff']"
              :min="min"
              :max="max"
              :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
            />
          </div>
          <div class="row">
            <div class="mt-4 ml-4 col-lg-12">
              <h4>Mejores ofertas de cambio :D</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <b-col class="table d-flex mt-4 justify-content-center">
            <table class="w-100">
              <tbody>
                <tr v-for="item in markets" :key="`${item.exchangeId}-${item.priceUsd}`">
                  <td>
                    <b>{{item.exchangeId}}</b>
                  </td>
                  <td>{{item.priceUsd | dollar}}</td>
                  <td>{{item.baseSymbol }} / {{item.quoteSymbol}}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <Button
                        :isLoading="item.isLoading || false"
                        v-if="!item.url"
                        @custom-click="getWebsite(item)"
                      >
                        <slot>Obtener Link</slot>
                      </Button>
                      <a :href="item.url" v-else target="_blank">{{item.url}}</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Button from "../components/Button";
export default {
  name: "CoinDetail",

  components: {
    Button
  },

  data() {
    return {
      asset: {},
      history: [],
      isLoading: true,
      markets: [],
      fromUsd: true,
      convertValue: null
    };
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;

      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    }
  },

  watch: {
    $route() {
      this.getCoin();
    }
  },

  created() {
    this.getCoin();
  },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },

    getWebsite(exchange) {
      this.$set(exchange, "isLoading", true);

      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => {
          this.$set(exchange, "isLoading", false);
        });
    },

    getCoin() {
      const id = this.$route.params.id;
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
