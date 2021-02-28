<template>
  <div :class="'page-' + currentPage">
    <page-navigator
      :count-pages="countPages"
      :current-page="currentPage"
      @update-page="handler"
    />
  </div>
</template>

<script>
import PageNavigator from "@/components/PageNavigator";
import util from "@/util";

export default {
  components: { PageNavigator },
  data() {
    return {
      countPages: 2,
      currentPage: 1
    };
  },
  methods: {
    handler(page) {
      const src = require("../assets/img/page-" + page + ".jpg");
      util
        .loadImage(src)
        .then(() => (this.currentPage = page))
        .catch(e => console.error(e.message));
    }
  }
};
</script>
