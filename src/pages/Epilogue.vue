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
    <div class="pages-status-bar">
      <input
        :value="page + '/' + pages"
        class="input-pages"
        :class="{ error: inputError }"
        @keyup.enter="inputPage($event)"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
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
        next(vm => vm.setTurningPageSound(sound));
      })
      .catch(() => {
        bar.fail();
        next("/404");
      });
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let turningPageSound = null;
    const inputError = ref(0);

    onBeforeRouteUpdate((to, from, next) => {
      const bar = progressBar.start();
      const page = to.params.page ? parseInt(to.params.page) : 1;
      store
        .dispatch(LOAD_PAGE, page)
        .then(() => {
          inputError.value = false;
          bar.finish();
          playTurningPageSound();
          next();
        })
        .catch(() => {
          bar.fail();
          next("/404");
        });
    });

    const playTurningPageSound = () => {
      turningPageSound.play();
    };

    const inputPage = e => {
      const values = e.target.value.split("/");
      let page = parseInt(values[0]);
      if (page > 0 && page < store.state.epilogue.pages) {
        router.push("/epilogue/" + page);
      } else {
        inputError.value = true;
      }
    };

    return {
      page: computed(() => store.state.epilogue.page),
      pages: computed(() => store.state.epilogue.pages),
      bgImage: computed(() =>
        require("../assets/img/page-" + store.state.epilogue.page + ".jpg")
      ),
      setTurningPageSound: sound => {
        turningPageSound = sound;
      },
      inputPage,
      inputError
    };
  }
};
</script>
