<template>
  <div class="page page_onboarding">
    <h3>{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  props: {
    title: {
      type: String,
      default: 'Страница авторизации',
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
