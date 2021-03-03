<template>
  <div class="sound-bar">
    <div
      class="sound-btn"
      :class="{ off: isMuted }"
      @click="muteSwitcher"
    ></div>
  </div>
</template>

<script>
import { Howler } from "howler";

export default {
  data() {
    return {
      isMuted: false
    };
  },
  methods: {
    muteSwitcher() {
      this.isMuted = !this.isMuted;
      Howler.mute(this.isMuted);
    }
  }
};
</script>

<style scoped>
.sound-bar {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.sound-btn {
  width: 80px;
  height: 79px;
  cursor: pointer;
  background: url("../assets/img/sound-off.png") no-repeat;
}

.sound-btn.off {
  opacity: 0.5;
}
</style>
