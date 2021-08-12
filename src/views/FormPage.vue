<template>
  <form-layout title="Создать митап" :meetupId="meetupId">
    <form>Meetup Form</form>
  </form-layout>
</template>

<script>
import FormLayout from '../components/FormLayout';
export default {
  name: 'FormPage',
  props: {
    meetupId: {
      type: Number,
    },
  },
  components: { FormLayout },
};
</script>

<style scoped></style>
