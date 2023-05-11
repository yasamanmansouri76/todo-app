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
    <v-btn color="primary" size="small" class="mb-3" rounded @click="toggleTodoItemFormDialog()"
      >Create new</v-btn
    >
    <v-data-table
      :headers="headers.selectedHeaders"
      :items="todoItems"
      item-value="name"
      class="elevation-1"
      :items-per-page="-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-row class="flex-nowrap">
          <v-btn fab size="small" class="ma-2" text icon color="primary">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn fab size="small" class="ma-2" text icon color="primary" @click="deleteItem(item)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="todoItemFormDialog" persistent width="1024">
      <todo-item-form-modal
        :todo-list-id="todoListId"
        @close="toggleTodoItemFormDialog()"
        @load-data="loadData()"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { reactive, ref, onMounted, toRaw } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { useRoute } from 'vue-router'
import todoItemFormModal from '@/components/todos/todo-item-form-modal.vue'

export default {
  name: 'TodoList',
  components: {
    todoItemFormModal
  },
  setup() {
    const todoItems = ref([])
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
    let todoItemFormDialog = ref(false)

    const route = useRoute()
    const todoListId = route.params.id

    const store = useTodoStore()

    function loadData() {
      todoItems.value = store.getTodoListItems(todoListId)
    }

    function toggleTodoItemFormDialog() {
      todoItemFormDialog.value = !todoItemFormDialog.value
    }

    function deleteItem(item) {
      store.deleteTodoItem(toRaw(toRaw(item).raw))
      loadData()
    }

    onMounted(() => {
      loadData()
    })

    return {
      todoItems,
      headers,
      loading,
      todoItemFormDialog,
      toggleTodoItemFormDialog,
      loadData,
      todoListId,
      deleteItem
    }
  }
}
</script>
