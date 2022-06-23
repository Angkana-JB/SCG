<template>
  <div id="app">
    <GoogleMap />
  </div>
</template>

<script>
import GoogleMap from './components/GoogleMap.vue'

export default {
  name: 'App',
  components: {
    GoogleMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pac-target-input {
  padding: 10px;
  width: 20%;
}

.btn {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: greenyellow;
}
</style>


