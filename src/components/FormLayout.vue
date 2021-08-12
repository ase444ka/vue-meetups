<template>
  <main class="main">
    <div v-if="meetupIsLoading">Загрузка...</div>

    <div v-else class="page page_meetup-forms">
      <div class="container">
        <h2 class="page__title">Редактирование митапа</h2>
        <form class="form meetup-form">
          <div class="meetup-form__content">
            <fieldset class="form-section">
              <div class="form-group">
                <label class="form-label">Название</label>
                <div class="input-group">
                  <input class="form-control" v-model="meetup.title" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Дата</label>
                  <DateInput v-model="date" />
              </div>


              <div class="form-group">
                <label class="form-label">Место проведения</label>
                <div class="input-group">
                  <input class="form-control" v-model="meetup.place" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Описание</label>
                <div class="input-group">
                  <textarea
                    rows="3"
                    class="form-control"
                    v-model="meetup.description"
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Изображение</label>
                <div class="image-uploader">
                  <label class="image-uploader__preview">
                    <span>Загрузить изображение</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="form-control-file"
                    />
                  </label>
                </div>
              </div>
            </fieldset>

            <h3 class="form__section-title">Программа</h3>

            <template v-if="meetup.agenda">
              <MeetupAgendaItemEdit v-for="item in meetup.agenda" :agendaItem="item" :key="item.id"/>
            </template>



            <div class="form-section_append">
              <button type="button">+ Добавить этап программы</button>
            </div>
          </div>
          <div class="meetup-form__aside">
            <div class="meetup-form__aside_stick">
              <button
                type="button"
                class="button button_secondary button_block"
              >
                Отмена
              </button>
              <button type="submit" class="button button_primary button_block">
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { fetchMeetup } from '@/data';
import _ from 'lodash';
import MeetupAgendaItemEdit from '@/components/MeetupAgendaItemEdit'
import DateInput from '@/components/ui/DateInput';


export default {
  name: 'FormLayout',

  components: {
    MeetupAgendaItemEdit,
    DateInput,
  },

  props: {
    title: {
      type: String,
      default: 'Создать митап',
    },
    meetupId: {
      type: Number,
    },
  },

  data() {
    return {
      meetupIsLoading: true,
      meetup: {},
      date: new Date(),

    };
  },

  async created() {
    if (this.meetupId) {
      const meetupFromServer = await fetchMeetup(this.meetupId);
      this.meetup = _.cloneDeep(meetupFromServer);
    }
    this.meetupIsLoading = false;
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
.page.page_meetup-forms {
  padding: 70px 0;
}
@media all and (max-width: 992px) {
  .page.page_meetup-forms {
    padding: 48px 0;
  }
}
</style>
