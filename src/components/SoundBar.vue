<template>
  <div class="sound-bar">
    <div
      class="sound-btn"
      :class="{ off: isActive }"
      @click="isActive = !isActive"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
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
