<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon class="info-list__icon" :alt="icon" :icon="icon" v-if="icon" />
    </div>
    <div class="meetup-agenda__item-col" v-if="period">{{ period }}</div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">{{ title }}</h5>
      <p v-if="isTalk">
        <span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span
        ><span class="meetup-agenda__dot"></span
        ><span class="meetup-agenda__lang" v-if="agendaItem.language">{{
          agendaItem.language
        }}</span>
      </p>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<script>
import { agendaItemIcons, agendaItemTitles } from '../data.js';
import AppIcon from './AppIcon';
export default {
  name: 'MeetupAgendaItem',

  components: {
    AppIcon,
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      return agendaItemIcons[this.agendaItem.type];
    },

    //установка названия по умолчанию если нужно
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
    },

    //проверка выступление или нет - указывать ли спикера
    isTalk() {
      return this.agendaItem.type === 'talk';
    },
    period() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
  },
};
</script>

<style scoped>
.meetup-agenda__item {
  padding: 24px 0;
  border-top: 1px solid var(--grey-3);
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__item:first-child {
  border-top: none;
}

.meetup-agenda__item-col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.meetup-agenda__item-col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.meetup-agenda__item-col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.meetup-agenda__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__lang {
  font-style: italic;
}

.meetup-agenda__dot::before {
  content: '•';
  color: var(--grey);
  padding: 0 1ch;
}

.meetup-agenda__item p {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .meetup-agenda__item {
    padding: 40px 0;
  }
}
</style>
