<template>
  <div class="home">
    <v-card class="mx-auto pa-2" max-width="700px">
      <todos-list :todo-lists="todoLists" @open="toggleTodoFormDialog()" />
    </v-card>
    <v-dialog v-model="todoFormDialog" persistent width="1024">
      <todo-form-modal @close="toggleTodoFormDialog()" @load-data="loadData()" />
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import todoFormModal from '@/components/home/todo-form-modal.vue'
import todosList from '@/components/home/todos-list.vue'

export default {
  name: 'HomeView',
  components: {
    todoFormModal,
    todosList
  },
  setup() {
    let todoFormDialog = ref(false)
    let todoLists = ref([])

    const store = useTodoStore()

    function toggleTodoFormDialog() {
      todoFormDialog.value = !todoFormDialog.value
    }

    function loadData() {
      todoLists.value = store.fetchTodoLists()
    }

    onMounted(() => {
      loadData()
    })

    return {
      todoLists,
      todoFormDialog,
      toggleTodoFormDialog,
      loadData
    }
  }
}
</script>

<style lang="scss">
.home {
  .v-list-subheader__text {
    width: 100%;
  }
}
</style>
