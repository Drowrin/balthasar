<template>
  <Suspense>
    <template #default>
      <Main/>
    </template>
    <template #fallback>
      <div class="valign-wrapper" style="height: 100%">
        <div class="container">
          <div class="progress grey darken-4">
            <div class="indeterminate orange"/>
          </div>
        </div>
      </div>
    </template>
  </Suspense>
</template>

<script>
import Main from './Main.vue'

export default {
  name: 'App',
  components: {
    Main,
  }
}
</script>
