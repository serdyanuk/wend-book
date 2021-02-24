<template>
  <div class="nav-container">
    <div
      v-if="currentPage > 1"
      class="prev"
      @click="goToPage(currentPage - 1)"
    ></div>
    <div
      v-if="currentPage < countPages"
      class="next"
      @click="goToPage(currentPage + 1)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    countPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ["updatePage"],
  methods: {
    goToPage(page) {
      this.$emit("updatePage", page);
    }
  }
};
</script>

<style scoped>
.nav-container {
  display: flex;
  width: 100%;
}

.prev,
.next {
  height: 79px;
  width: 80px;
}

.prev {
  background: url("../assets/img/prev.png") no-repeat;
}

.next {
  margin-left: auto;
  background: url("../assets/img/next.png") no-repeat;
}

.prev:hover,
.next:hover {
  cursor: pointer;
  transform: scale(0.99);
}
</style>
