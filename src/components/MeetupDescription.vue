<template>
  <p class="meetup-description">{{ description }}</p>
</template>
<script>
export default {
  name: 'MeetupDescription',
  props: {
    description: {
      type: String,
      default: 'No descriprion provided',
    },
  },
};
</script>
