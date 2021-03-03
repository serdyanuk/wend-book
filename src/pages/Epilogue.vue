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
import store from "@/store";
import { Howl } from "howler";

export default {
  beforeRouteEnter: (to, from, next) => {
    const bar = progressBar.start();
    const page = to.params.page ? parseInt(to.params.page) : 1;
    const sound = new Howl({
      src: [require("../assets/media/turning-page.mp3")]
    });
    store
      .dispatch(LOAD_PAGE, page)
      .then(() => {
        bar.finish();
        next(vm => vm.setScrollSound(sound));
      })
      .catch(() => {
        bar.fail();
        next("/404");
      });
  },
  setup() {
    const store = useStore();
    let scrollSound = null;

    onBeforeRouteUpdate((to, from, next) => {
      const bar = progressBar.start();
      const page = to.params.page ? parseInt(to.params.page) : 1;
      store
        .dispatch(LOAD_PAGE, page)
        .then(() => {
          bar.finish();
          playScrollSound();
          next();
        })
        .catch(() => {
          bar.fail();
          next("/404");
        });
    });

    const playScrollSound = () => {
      scrollSound.play();
    };

    return {
      page: computed(() => store.state.epilogue.page),
      pages: computed(() => store.state.epilogue.pages),
      bgImage: computed(() =>
        require("../assets/img/page-" + store.state.epilogue.page + ".jpg")
      ),
      setScrollSound: sound => {
        scrollSound = sound;
      }
    };
  }
};
</script>
