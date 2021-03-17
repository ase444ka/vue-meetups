<template>
  <AppInput
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :value="formattedDate"
    @input.native="updateAll($event.target)"
    @change.native="updateAll($event.target)"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

function formatToDate(date) {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}

function formatToTime(date, step) {
  let hours = date.getUTCHours();
  let minutes = date.getMinutes();
  let seconds = '';
  if (step) {
    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (!seconds) return `${hours}:${minutes}`;
  return `${hours}:${minutes}:${seconds}`;
}

function formatToDateTime(date) {
  return `${formatToDate(date)}T${formatToTime(date)}`;
}

export default {
  name: 'DateInput',
  data() {
    return {
      datee: new Date(),
    };
  },

  components: { AppInput },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
  },
  methods: {
    updateNumber(value) {
      /* let date;
      if (value.match(/^\d\d:\d\d$/) || value.match(/^\d\d:\d\d:\d\d$/))
        date = new Date(`1970-01-01 ${value}`);
      else date = new Date(value);
      let h = date.getHours();
      date.setUTCHours(h);
      return +date; */
      return value.valueAsNumber;
    },
    updateDate(value) {
      /* let date = new Date(value);
      let h = date.getHours();
      date.setUTCHours(h);
      return date; */
      return new Date(value.valueAsNumber);
    },
    updateAll(value) {
      this.$emit('update:valueAsNumber', this.updateNumber(value));
      this.$emit('update:valueAsDate', this.updateDate(value));
    },
  },

  computed: {
    step() {
      return this.$attrs.step && this.$attrs.step % 60;
    },
    formattedDate() {
      let res;
      if (!this.valueAsNumber && !this.valueAsDate) return this.value;
      let date = this.valueAsNumber
        ? new Date(this.valueAsNumber)
        : this.valueAsDate;
      switch (this.type) {
        case 'date':
          res = formatToDate(date);
          break;
        case 'time':
          res = formatToTime(date, this.step);
          break;
        case 'datetime-local':
          res = formatToDateTime(date);
          break;
        // }
      }
      return res;
    },
  },
};
</script>

<style scoped></style>
