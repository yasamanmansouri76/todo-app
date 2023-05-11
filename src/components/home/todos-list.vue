<template>
  <v-list>
    <v-list-subheader class="text-h5 mb-3">
      <div class="align-center d-flex justify-space-between">
        <span class="mr-3">Todo Lists</span>
        <v-btn color="primary" size="small" rounded @click="$emit('open')">Create new</v-btn>
      </div>
    </v-list-subheader>
    <div v-if="!todoLists" class="pa-4 text-blue-grey-lighten-2 text-center">
      You don't have any todo list yet!
    </div>
    <v-list-item
      v-else
      v-for="(item, i) in todoLists"
      :key="i"
      :value="item"
      active-color="primary"
      rounded="xl"
      lines="three"
    >
      <div>
        <RouterLink :to="{ name: 'todosList', params: { id: item.id } }">
          <v-list-item-title class="align-center d-flex justify-space-between">
            <span class="text-primary font-weight-medium">{{ item.title }}</span>
            <span class="text-amber text-caption">{{ item.createdAt }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.description }}
          </v-list-item-subtitle>
        </RouterLink>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: ['todoLists']
}
</script>
