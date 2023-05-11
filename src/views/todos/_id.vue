<template>
  <v-card class="pa-4">
    <list-filter @filter="filter" />
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
      item-disabled="disabled"
    >
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="grey--text text-caption"> Table Headers </span>
      </template>
    </v-select>
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
          <v-btn
            fab
            size="small"
            class="ma-2"
            text
            icon
            color="primary"
            @click="toggleEditTodoItemFormDialog(item)"
          >
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
    <v-dialog v-model="editTodoItemFormDialog" persistent width="1024">
      <edit-todo-item-form-modal
        :selected-item="selectedItem"
        @close="toggleEditTodoItemFormDialog()"
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
import editTodoItemFormModal from '@/components/todos/edit-todo-item-form-modal.vue'
import listFilter from '@/components/todos/list-filter.vue'

export default {
  name: 'TodoList',
  components: {
    todoItemFormModal,
    editTodoItemFormModal,
    listFilter
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
          key: 'description',
          disabled: false
        },
        {
          index: 3,
          title: 'Due Date',
          key: 'dueDate',
          disabled: false
        },
        {
          index: 4,
          title: 'Priority',
          key: 'priority',
          disabled: false
        },
        {
          index: 5,
          title: 'Actions',
          key: 'actions',
          value: 'actions',
          disabled: false
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
          key: 'description',
          disabled: false
        },
        {
          index: 3,
          title: 'Due Date',
          key: 'dueDate',
          disabled: false
        },
        {
          index: 4,
          title: 'Priority',
          key: 'priority',
          disabled: false
        },
        {
          index: 5,
          title: 'Actions',
          key: 'actions',
          value: 'actions',
          disabled: false
        }
      ]
    })

    let loading = ref(false)
    let todoItemFormDialog = ref(false)
    let editTodoItemFormDialog = ref(false)

    let selectedItem = reactive({})

    const route = useRoute()
    const todoListId = route.params.id

    const store = useTodoStore()

    function loadData() {
      todoItems.value = store.getTodoListItems(todoListId)
    }

    function toggleTodoItemFormDialog() {
      todoItemFormDialog.value = !todoItemFormDialog.value
    }

    function toggleEditTodoItemFormDialog(item) {
      selectedItem = toRaw(toRaw(item).raw)
      // editTodoItemFormDialog.value = !editTodoItemFormDialog.value
    }

    function deleteItem(item) {
      store.deleteTodoItem(toRaw(toRaw(item).raw))
      loadData()
    }

    function filter(priority) {
      loadData()
      todoItems.value = todoItems.value.filter((elm) => elm.priority === priority)
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
      deleteItem,
      toggleEditTodoItemFormDialog,
      editTodoItemFormDialog,
      selectedItem,
      filter
    }
  }
}
</script>
