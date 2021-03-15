<template>
  <div class="meetups-list">
    <slot v-for="item in items" :item="item">
      {{ item }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: Array,
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
