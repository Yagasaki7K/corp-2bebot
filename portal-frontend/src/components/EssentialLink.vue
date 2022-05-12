<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    exact
  >
    <q-item-section class="teste"
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />

      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>

  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
  .teste{

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 0!important;
  }
  .teste:hover{
    color: #ffd366;
  }

  .q-router-link--active {

    color: #ffd366;
  }

</style>
