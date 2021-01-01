<template>
  <Suspense>
    <template #default>
      <Main/>
    </template>
    <template #fallback>
      <Loading msg="Loading"/>
    </template>
  </Suspense>
</template>

<script>
import Loading from './components/Loading.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Loading,
    Main,
  }
}
</script>
