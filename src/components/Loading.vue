<template>
  <div class="valign-wrapper" style="height: 100%">
    <div class="container">
      <div class="center-align">
        <h3> {{ msg }} </h3>
      </div>
      <div class="progress grey darken-4">
        <div class="indeterminate orange"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    msg: String
  }
}
</script>
