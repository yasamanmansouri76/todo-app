<template>
  <v-card class="pa-4">
    <v-select
      v-model="headers.selectedHeaders"
      :items="headers.allHeaders"
      :menu-props="{ offsetY: true }"
      label="Select"
      multiple
      return-object
      outlined
      hide-details
      dense
      density="compact"
      class="mb-4"
    >
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="grey--text text-caption"> Table Headers </span>
      </template></v-select
    >
    <v-text-field
      :loading="loading"
      density="compact"
      label="Search todos description or title..."
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      outlined
      class="mb-4"
      @click:append-inner="onClick"
    ></v-text-field>
    <v-data-table
      :headers="headers.selectedHeaders"
      :items="todos"
      item-value="name"
      class="elevation-1"
      :items-per-page="-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-row class="flex-nowrap">
          <v-btn fab size="small" class="ma-2" text icon color="primary">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn fab size="small" class="ma-2" text icon color="primary">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'TodoList',
  setup() {
    const todos = [
      {
        title: 'Frozen Yogurt',
        description: 'test desc',
        dueDate: '22/3/2022',
        priority: 'high'
      }
    ]

    let headers = reactive({
      allHeaders: [
        {
          index: 1,
          title: 'Title',
          key: 'title',
          sortable: false,
          disabled: true
        },
        {
          index: 2,
          title: 'Description',
          key: 'description'
        },
        {
          index: 3,
          title: 'Due Date',
          key: 'dueDate'
        },
        {
          index: 4,
          title: 'Priority',
          key: 'priority'
        },
        {
          index: 5,
          title: '',
          key: 'actions',
          value: 'actions'
        }
      ],
      selectedHeaders: [
        {
          index: 1,
          title: 'Title',
          key: 'title',
          sortable: false,
          disabled: true
        },
        {
          index: 2,
          title: 'Description',
          key: 'description'
        },
        {
          index: 3,
          title: 'Due Date',
          key: 'dueDate'
        },
        {
          index: 4,
          title: 'Priority',
          key: 'priority'
        },
        {
          index: 5,
          title: '',
          key: 'actions',
          value: 'actions'
        }
      ]
    })

    let loading = ref(false)

    return {
      todos,
      headers,
      loading
    }
  }
}
</script>
