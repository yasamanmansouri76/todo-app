<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <RouterLink to="/" class="text-white text-h6 pa-2 mr-4">Home</RouterLink>
        <RouterLink to="/todo-list" class="text-white pa-2 text-h6">Todo List</RouterLink>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <RouterView />
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
