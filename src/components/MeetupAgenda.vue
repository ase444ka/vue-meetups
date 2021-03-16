<template>
  <div class="meetup-agenda">
    <p class="meetup-agenda__empty" v-if="noAgenda">
      Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь
      появится!
    </p>
    <MeetupAgendaItem
      v-for="item in agenda"
      :agendaItem="item"
      :key="item.id"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from './MeetupAgendaItem.vue';
export default {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  computed: {
    noAgenda() {
      return !this.agenda.length; //проверка есть ли программа
    },
  },
};
</script>

<style scoped>
.meetup-agenda {
  margin: 0;
}
</style>
