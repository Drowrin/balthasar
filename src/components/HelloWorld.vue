<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    msg: String
  },
  setup() {
    const count = ref(1);
    return { count };
  }
}
</script>
