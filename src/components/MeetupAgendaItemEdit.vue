<template>
  <div class="form-section form-section_inner mb-3">
    <button type="button" class="remove-button">
      <AppIcon icon="trash" />
    </button>
    <div class="form-group">
      <DropdownButton
        title="Тип"
        v-model="localAgendaItem.type"
        :options="opts"
      />
    </div>
    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <DateInput type="time" v-model="localAgendaItem.startsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <DateInput type="time" v-model="localAgendaItem.endsAt" />
        </div>
      </div>
    </div>

    <template v-if="isTalk">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <div class="input-group">
            <AppInput v-model="localAgendaItem.title"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Докладчик</label>
          <AppInput v-model="localAgendaItem.speaker"/>
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <AppInput multiline v-model="localAgendaItem.description"/>
      </div>
      <div class="form-group">
        <label class="form-label">Язык</label>
        <DropdownButton
          title="Язык"
          v-model="localAgendaItem.language"
          :options="languages"
        />
      </div>
    </template>
    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <AppInput />
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import DropdownButton from '@/components/ui/DropdownButton';
import DateInput from '@/components/ui/DateInput';
import AppInput from '@/components/ui/AppInput';
import AppIcon from '@/components/ui/AppIcon';

export default {
  name: 'MeetupAgendaItemEdit.vue',

  components: {
    AppIcon,
    AppInput,
    DropdownButton,
    DateInput,
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.localAgendaItem = _.cloneDeep(this.agendaItem);
  },

  data() {
    return {
      localAgendaItem: {},
      opts: [
        { text: 'Открытие', icon: 'coffee', value: 'opening' },
        { text: 'Регистрация', icon: 'clock', value: 'registration' },
        { text: 'Перерыв', icon: 'coffee', value: 'break' },
        { text: 'Coffee break', icon: 'clock', value: 'coffee' },
        { text: 'Закрытие', icon: 'user', value: 'closing' },
        { text: 'After Party', icon: 'clock', value: 'afterparty' },
        { text: 'Доклад', icon: 'coffee', value: 'talk' },
        { text: 'Другое', icon: 'clock', value: 'other' },
      ],
      languages: [
        { text: 'RU', value: 'RU' },
        { text: 'EN', value: 'EN' },
        { text: 'Не указано', value: null },
      ],
    };
  },

  computed: {
    isTalk() {
      return this.localAgendaItem.type === 'talk';
    },
  },
};
</script>

<style scoped></style>
