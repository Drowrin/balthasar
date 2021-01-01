<template>
  <div v-if="manifest">{{manifest}}</div>
  <HelloWorld v-else msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      manifest: null,
    }
  },
  mounted() {
    axios
      .get('http://localhost:3001/')
      .then(response => (this.manifest = response.data));
  }
}
</script>
