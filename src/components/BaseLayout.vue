<template>
  <div class="wrapper bg-grey">
    <TheHeader />
    <main class="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';
export default {
  components: { TheHeader, TheFooter },
  name: 'BaseLayout',
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
