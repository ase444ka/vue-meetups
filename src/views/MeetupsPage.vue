<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          v-model="filter.date"
          :options="$options.dateFilterOptions"
          name="date"
        />
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <app-input
            rounded
            ref="input-element"
            id="filters-panel__search"
            v-model="filter.search"
            placeholder="Поиск"
          >
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :selected.sync="view" />
        </div>
      </div>
    </div>

    <template v-if="meetups && meetups.length">
      <meetups-list v-if="meetups && view === 'list'" :meetups="meetups" />
      <meetups-calendar v-else-if="view === 'calendar'" :meetups="meetups" />
    </template>
    <div v-else>Митапов по заданным условиям не найдено...</div>
  </div>
</template>

<script>
import MeetupsList from '../components/MeetupsList';
import MeetupsCalendar from '../components/MeetupsCalendar';
import FormCheck from '../components/FormCheck';
import PageTabs from '../components/PageTabs';
import AppIcon from '../components/ui/AppIcon';
import AppInput from '../components/ui/AppInput';
import { fetchMeetups } from '../data.js';

export default {
  name: 'MeetupsPage',
  components: {
    MeetupsList,
    FormCheck,
    PageTabs,
    MeetupsCalendar,
    AppInput,
    AppIcon,
  },

  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  data() {
    return {
      meetups: null,
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      view: 'list',
    };
  },

  async mounted() {
    this.meetups = await fetchMeetups();
  },
};
</script>

<style scoped>
.meetup__empty {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  color: var(--blue-2);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  margin: 32px 0;
}

.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
