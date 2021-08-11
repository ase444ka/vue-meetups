<template>
  <div>
    <ul class="info-list">
      <li>
        <app-icon icon="user" class="info-list__icon" />
        {{ organizer }}
      </li>
      <li>
        <app-icon icon="map" class="info-list__icon" />
        {{ place }}
      </li>
      <li>
        <app-icon icon="cal-lg" class="info-list__icon" />
        <time :datetime="dateOnlyString">{{ localDate }}</time>
      </li>
    </ul>
    <div class="meetup__aside-buttons">
      <button class="button button_primary" v-if="rand">
        Участвовать
      </button>
      <button class="button button_secondary" v-else>Отменить участие</button>
      <router-link :to="meetupLink" tag="button" class="button button_primary"
      >Редактировать</router-link
      >
      <button class="button button_danger">Удалить</button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';
import { localDate } from '@/scripts';

export default {
  name: 'MeetupInfo',

  data() {
    return {
      rand: Math.round(Math.random()) % 2,
    };
  },

  components: { AppIcon },

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  computed: {
    localDate() {
      return localDate(this.date);
    },

    dateOnlyString() {
      return new Date(this.date).toISOString().split('T')[0];
    },

    meetupLink() {
      return `/meetups/${this.id}/edit`;
    },
  },
};
</script>

<style scoped>
.info-list {
  margin: 0;
  padding: 0;
}

.info-list li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.info-list li:last-child {
  margin: 0;
}

.info-list__icon {
  position: absolute;
  left: 0;
  top: 0;
}
.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
  width: 100%;
}
</style>
