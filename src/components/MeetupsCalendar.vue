<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button
            class="rangepicker__selector-control-left"
            @click="rewindMonth"
          ></button>
          <div>{{ month }}</div>
          <button
            class="rangepicker__selector-control-right"
            @click="forwardMonth"
          ></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          class="rangepicker__cell"
          :class="{ rangepicker__cell_inactive: !day.isActive }"
          v-for="day in days"
          :key="day.key"
        >
          {{ day.num }}
          <template v-if="day.events">
            <a
              class="rangepicker__event"
              v-for="event in day.events"
              :key="event"
              >{{ event }}</a
            >
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Возвращает следующий день после текущего
 * @param date {Date} - текущая дата
 * @return {Date} - следующий день
 */
function setNextDay(date) {
  return new Date(date.setDate(date.getDate() + 1));
}

/**
 * Возвращает первый день для отобра;ения в текущем представлении сетки
 * @param date {Date} - первый день текущего месяца
 * @return {Date} - объект даты
 */
function getFirstInGrid(date) {
  let day = date.getDay() ? date.getDay() - 1 : 6; //день недели, с которого начинается месяц
  return new Date(date.setDate(date.getDate() - day));
}

/**
 * Возвращает сколько всего дней дол;но быть в сетке
 * @param date - первый день текущего месяца
 * @return {Number} - количество ячеек в сетке
 */
function getTotalDays(date) {
  let month = date.getMonth(); //текущий месяц
  let day = date.getDay() ? date.getDay() - 1 : 6; //день недели, с которого начинается месяц
  let _daysInMonth = new Date(
    new Date(new Date(date).setMonth(month + 1)).setDate(0),
  ).getDate();
  let _rest = (_daysInMonth + day) % 7 ? 7 - ((_daysInMonth + day) % 7) : 0;
  let total = _daysInMonth + day + _rest;
  return total;
}

/**
 * Возвращает строку даты без часов / минут
 * @param date {Date} - объект даты
 * @return {string} - строка даты
 */
function makeDateString(date) {
  return new Date(date).toDateString();
}

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(new Date().setDate(1)),
    };
  },

  computed: {
    //митапы отсортированные по датам (только названия)
    shedule() {
      let shedule = {};
      this.meetups.forEach((meetup) => {
        let _date = makeDateString(meetup.date);
        if (!shedule[_date]) {
          shedule[_date] = [];
        }
        shedule[_date].push(meetup.title);
      });
      return shedule;
    },

    //текущий месяц в строковом формате
    month() {
      return this.date
        ? this.date.toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
          })
        : '';
    },

    //данные для ячеек сетки
    days() {
      let result = [];

      let _current = new Date(this.date); //первый день текущего месяца
      let _month = _current.getMonth(); //текущий месяц

      _current = getFirstInGrid(_current); //понедельник первой недели месяца

      let cells = getTotalDays(_current); //сколько всего ячеек в сетке текущего месяца

      for (let cell = 1; cell <= cells; cell++) {
        let day = {
          num: _current.getDate(),
          isActive: true,
          key: +_current,
        };
        if (_current.getMonth() != _month) day.isActive = false; //если не текущий месяц, ячейки неактивные

        let _date = makeDateString(_current); //проверка, есть ли мероприятия
        if (this.shedule[_date]) day['events'] = this.shedule[_date];

        result.push(day); //запись данных ячейки в результат
        _current = setNextDay(_current); //переход на следующую итерацию
      }
      return result;
    },
  },

  methods: {
    rewindMonth() {
      let _date = new Date(this.date);
      let _currentMonth = _date.getMonth();
      this.date = new Date(_date.setMonth(_currentMonth - 1));
    },

    forwardMonth() {
      let _date = new Date(this.date);
      let _currentMonth = _date.getMonth();
      this.date = new Date(_date.setMonth(_currentMonth + 1));
    },
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }

  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
