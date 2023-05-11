import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useTodoStore = defineStore('todo', {
  state: () => ({ todoLists: [] }),
  getters: {
    getTodoLists: (state) => JSON.parse(state.todoLists)
  },
  actions: {
    fetchTodoLists() {
      this.todoLists = JSON.parse(localStorage.getItem('todoLists'))
      return this.todoLists
    },
    addTodoListItem(item) {
      if (this.todoLists) {
        this.todoLists.push(toRaw(item))
      } else {
        this.todoLists = []
        this.todoLists.push(toRaw(item))
      }
      localStorage.setItem('todoLists', JSON.stringify(toRaw(this.todoLists)))
    }
  }
})
