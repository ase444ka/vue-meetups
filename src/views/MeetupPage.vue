<template>
  <h3>MeetupPage #{{ meetupId }}</h3>
</template>

<script>
export default {
  name: 'MeetupPage',

  props: {
    meetupId: [Number, String],
  },
};
</script>

<style></style>
