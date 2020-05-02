<template>
  <button @click="onButtonClick" class="btn btn-dark">
    <beat-loader :loading="isLoading" :color="'white'" :size="8" />
    <div v-show="!isLoading">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: "Button",

  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onButtonClick() {
      this.$emit("custom-click");
    }
  }
};
</script>
