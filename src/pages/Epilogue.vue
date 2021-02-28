<template>
  <div :class="'page-' + page">
    <page-navigator />
  </div>
</template>

<script>
import PageNavigator from "@/components/PageNavigator";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { PageNavigator },
  setup() {
    const store = useStore();
    return {
      page: computed(() => store.state.epilogue.page)
    };
  }
};
</script>
