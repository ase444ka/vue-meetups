<template>
  <div class="form-check">
    <div
      v-for="option in optionsWithKeys"
      class="form-check__group"
      :key="option.key"
    >
      <input
        class="form-check__input"
        type="radio"
        :name="name"
        :checked="option.value === value"
        @input="$emit('change', option.value)"
        :value="option.value"
      />
      <label class="form-check__label">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
  name: 'FormCheck',

  data() {
    return {
      optionsWithKeys: [],
    };
  },

  props: {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
  },

  wath: {
    options: {
      immediate: true,
      handler(value) {
        for (let option of value) {
          if (
            this.optionsWithKeys.some((optionWithKey) => {
              optionWithKey.value === option.value;
            })
          )
            continue;
          let result = { ...option, key: nanoid() };
          this.optionsWithKeys.push(result);
        }
      },
    },
  },

  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>

<style scoped>
.form-check {
  display: flex;
  flex-direction: row;
}

.form-check__group {
  position: relative;
  display: inline-flex;
}

.form-check__label {
  margin-right: 16px;
  height: 44px;
  padding: 6px 16px;
  border-radius: 22px;
  border: 2px solid transparent;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  transition: 0.2s all;
}

.form-check__label:hover,
.form-check__input:checked ~ .form-check__label {
  border-color: var(--blue);
}

.form-check__input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

@media all and (max-width: 767px) {
  .form-check__label {
    margin-right: 8px;
    padding: 6px 8px;
  }
}
</style>
