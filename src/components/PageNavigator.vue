<template>
  <div class="nav-container">
    <div v-if="page > 1" class="prev" @click="loadPage(page - 1)"></div>
    <div v-if="page < pages" class="next" @click="loadPage(page + 1)"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { LOAD_PAGE } from "@/store/types";

export default {
  setup() {
    const store = useStore();
    return {
      page: computed(() => store.state.epilogue.page),
      pages: computed(() => store.state.epilogue.pages),
      loadPage: page => store.dispatch(LOAD_PAGE, page)
    };
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
