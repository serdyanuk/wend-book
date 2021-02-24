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
      this.currentPage = page;
    }
  }
};
</script>
