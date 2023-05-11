<template>
  <v-card class="pa-3">
    <v-form v-model="form" @submit.prevent="addTodoItem()">
      <v-card-title>
        <span class="text-h5">New Todo List</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Title*"
                v-model="formdata.title"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Creation Date*"
                v-model="formdata.createdAt"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                label="Description"
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
import { reactive, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default {
  setup(props, { emit }) {
    const form = ref(false)
    const formdata = reactive({
      title: null,
      description: '',
      createdAt: ''
    })

    const todoStore = useTodoStore()

    function addTodoItem() {
      if (!form.value) return
      todoStore.addTodoListItem(formdata)
      emit('close')
      emit('loadData')
    }

    function required(v) {
      return !!v || 'Field is required'
    }

    return {
      formdata,
      addTodoItem,
      form,
      required
    }
  }
}
</script>
