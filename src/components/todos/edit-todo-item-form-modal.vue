<template>
  <v-card class="pa-3">
    <v-form v-model="form" @submit.prevent="editTodoItem()">
      <v-card-title>
        <span class="text-h5">Edit {{ todoItem.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="Title*"
                v-model="formdata.title"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="formdata.priority"
                label="priority"
                :items="['High', 'Low']"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Due Date*" v-model="formdata.dueDate" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                label="Description*"
                v-model="formdata.description"
                :rules="[required]"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('close')"> Close </v-btn>
        <v-btn color="primary" type="submit"> Save </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { reactive, ref, onMounted, toRaw } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default {
  props: ['selectedItem'],
  setup(props, { emit }) {
    const form = ref(false)
    const todoItem = reactive(props.selectedItem)

    const formdata = reactive({
      id: null,
      title: null,
      description: null,
      priority: 'High',
      todoId: props.todoListId,
      dueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    })

    const todoStore = useTodoStore()

    function editTodoItem() {
      if (!form.value) return
      todoStore.editTodoItem(formdata)
      emit('close')
      emit('loadData')
    }

    function required(v) {
      return !!v || 'Field is required'
    }

    function setData() {
      let item = toRaw(toRaw(todoItem).raw)
      formdata.title = item.title
      formdata.priority = item.priority
      formdata.id = item.id
      formdata.todoId = item.todoId
      formdata.description = item.description
      formdata.dueDate = item.dueDate
    }

    onMounted(() => {
      setData()
    })

    return {
      formdata,
      editTodoItem,
      form,
      required,
      todoItem
    }
  }
}
</script>
