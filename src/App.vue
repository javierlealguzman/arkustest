<template>
  <div id="app">
    <Header />
    <md-content>
      <router-view />
    </md-content>

    <Dialog />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "app",
  components: {
    Header
    
  }
};
</script>

<style scoped>
.md-content {
  padding: 20px;
}
</style>