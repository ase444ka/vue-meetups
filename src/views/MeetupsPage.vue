<template>
  <meetups-list v-if="meetups" :meetups="meetups" />
</template>

<script>
import MeetupsList from '../components/MeetupsList';
import { fetchMeetups } from '../data.js';

export default {
  name: 'MeetupsPage',
  components: { MeetupsList },

  data() {
    return {
      meetups: null,
    };
  },

  async mounted() {
    this.meetups = await fetchMeetups();
  },
};
</script>

<style></style>
