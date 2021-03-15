<template>
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
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'MeetupInfo',

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
  },

  computed: {
    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    dateOnlyString() {
      return this.date.toISOString().split('T')[0];
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
</style>
