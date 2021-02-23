<template>
  <div class="container">
    <router-view></router-view>
    <sound-bar></sound-bar>
  </div>
</template>

<script>
import SoundBar from "@/components/SoundBar";

export default {
  components: { SoundBar }
};
</script>

<style src="./assets/css/main.css"></style>
