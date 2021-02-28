<template>
  <div class="bg">
    <div class="error404">
      <div>
        Page not found <br />
        <router-link to="/">Main page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  text-align: center;
}
</style>
