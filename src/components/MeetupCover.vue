<template>
  <div class="meetup-cover" :style="coverStyle">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>
<script>
export default {
  name: 'MeetupCover',

  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
      default: 'Unnamed meetup',
    },
  },

  computed: {
    coverStyle() {
      return this.link ? { '--bg-url': `url(${this.link})` } : {};
    },
  },
};
</script>
