<template>
  <div class="page page_meetup-forms page_onboarding">
    <h3>{{ title }}</h3>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props: {
    title: {
      type: String,
      default: 'Создать митап',
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
.page.page_meetup-forms {
  padding: 70px 0;
}
@media all and (max-width: 992px) {
  .page.page_meetup-forms {
    padding: 48px 0;
  }
}
</style>
