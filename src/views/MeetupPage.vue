<template>
  <div>
    <MeetupCover v-if="meetup" :link="coverLink" :title="meetup.title" />

    <div class="container">
      <div class="meetup">
        <div class="meetup__content" v-if="meetup">
          <h3>Описание</h3>
          <MeetupDescription :description="meetup.description" />
          <h3>Программа</h3>
          <MeetupAgenda :agenda="agenda" />
        </div>

        <div class="meetup__aside" v-if="meetup">
          <MeetupInfo
            :organizer="meetup.organizer"
            :place="meetup.place"
            :date="date"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMeetup } from '../data.js';
import MeetupCover from '../components/MeetupCover.vue';
import MeetupDescription from '../components/MeetupDescription.vue';
import MeetupAgenda from '../components/MeetupAgenda.vue';
import MeetupInfo from '../components/MeetupInfo.vue';
import { getMeetupCoverLink } from '../data.js';
export default {
  name: 'MeetupPage',

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  // props
  props: {
    meetupId: {
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
    };
  },

  async mounted() {
    this.meetup = await fetchMeetup(this.meetupId);
  },

  computed: {
    date() {
      if (this.meetup) return new Date(this.meetup.date);
      return '';
    },
    agenda() {
      if (this.meetup) return this.meetup.agenda || [];
      return '';
    },

    coverLink() {
      if (this.meetup)
        return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : null;
      return '';
    },
  },
};
</script>

<style scoped>
.meetup-cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-url);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}

.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup-description {
  padding-top: 33px;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}



@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }

  .meetup__empty {
    height: 340px;
  }
}
</style>
