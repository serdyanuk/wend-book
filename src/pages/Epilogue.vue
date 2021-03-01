<template>
  <div class="page" :style="'background-image:url(' + bgImage + ')'">
    <div class="nav-container">
      <router-link
        v-if="page > 1"
        :to="'/epilogue/' + (page - 1)"
        class="prev"
      ></router-link>
      <router-link
        v-if="page < pages"
        :to="'/epilogue/' + (page + 1)"
        class="next"
      ></router-link>
    </div>
    <div class="pages-status-bar">Страница {{ page }}/{{ pages }}</div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { LOAD_PAGE } from "@/store/types";
import progressBar from "@/progressBar";

export default {
  setup() {
    const store = useStore();

    onBeforeRouteUpdate((to, from, next) => {
      const bar = progressBar.start();
      const page = to.params.page ? parseInt(to.params.page) : 1;
      store
        .dispatch(LOAD_PAGE, page)
        .then(() => {
          bar.finish();
          next(true);
        })
        .catch(() => {
          bar.fail();
          next("/404");
        });
    });

    return {
      page: computed(() => store.state.epilogue.page),
      pages: computed(() => store.state.epilogue.pages),
      bgImage: computed(() =>
        require("../assets/img/page-" + store.state.epilogue.page + ".jpg")
      )
    };
  }
};
</script>
