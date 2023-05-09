<template>
  <div>
    <v-card class="mx-auto pa-2" max-width="600">
      <v-list>
        <v-list-subheader class="text-h5">Todo Lists</v-list-subheader>
        <v-list-item
          v-for="(item, i) in todoLists"
          :key="i"
          :value="item"
          active-color="primary"
          rounded="xl"
          lines="three"
        >
          <v-list-item-title class="align-center d-flex justify-space-between">
            <span class="text-primary font-weight-medium">{{ item.text }}</span>
            <span class="text-amber text-caption">12/2/2022</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            Require password for purchase or use password to restrict purchase
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const todoLists = reactive([
      { text: 'Real-Time' },
      { text: 'Audience' },
      { text: 'Conversions' }
    ])
    return {
      todoLists
    }
  }
}
</script>
