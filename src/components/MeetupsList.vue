<template>
  <list-view :items="meetupsWithCoverAndBadge" v-slot="{ item: meetup }">
    <list-view-card
      tag="router-link"
      :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      :key="meetup.id"
      :title="meetup.title"
      :cover="meetup.cover"
      :badge="meetup.badge"
      :badge-success="meetup.badgeSuccess"
    >
      <meetup-info
        :date="meetup.date"
        :place="meetup.place"
        :organizer="meetup.organizer"
      />
    </list-view-card>
  </list-view>
  <!-- :to="{ name: 'meetup', params: { meetupId: meetup.id } }" -->
</template>
<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';
import MeetupInfo from './MeetupInfo';
import { getImageUrlByImageId } from '../data.js';

export default {
  name: 'MeetupsList',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: { ListView, ListViewCard, MeetupInfo },

  computed: {
    meetupsWithCoverAndBadge() {
      return this.meetups.map((meetup) => {
        const newMeetup = { ...meetup };
        if (meetup.attending) {
          newMeetup.badge = 'Участвую';
          newMeetup.badgeSuccess = true;
        } else if (meetup.organizing) {
          newMeetup.badge = 'Организую';
        }
        newMeetup.cover =
          meetup.imageId && getImageUrlByImageId(meetup.imageId);
        newMeetup.date = new Date(meetup.date);
        return newMeetup;
      });
    },
  },
};
</script>

<style></style>
