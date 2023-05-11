import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useTodoStore = defineStore('todo', {
  state: () => ({ todoLists: [], todoItems: [] }),
  getters: {
    getTodoLists: (state) => JSON.parse(state.todoLists)
  },
  actions: {
    fetchTodoLists() {
      this.todoLists = JSON.parse(localStorage.getItem('todoLists'))
      return this.todoLists
    },
    addTodoList(item) {
      if (this.todoLists) {
        this.todoLists.push(toRaw(item))
      } else {
        this.todoLists = []
        this.todoLists.push(toRaw(item))
      }
      localStorage.setItem('todoLists', JSON.stringify(toRaw(this.todoLists)))
    },
    getTodoListItems(key) {
      const allItems = JSON.parse(localStorage.getItem('todoItems'))
      const selectedListItems = allItems.filter((elm) => elm.todoId === key)
      return selectedListItems
    },
    addTodoItem(item) {
      this.todoItems = JSON.parse(localStorage.getItem('todoItems'))
      if (this.todoItems) {
        this.todoItems.push(toRaw(item))
      } else {
        this.todoItems = []
        this.todoItems.push(toRaw(item))
      }
      localStorage.setItem('todoItems', JSON.stringify(toRaw(this.todoItems)))
    },
    deleteTodoItem(item) {
      const items = JSON.parse(localStorage.getItem('todoItems'))
      const todo = items.find((elm) => elm.id === item.id)
      const index = items.indexOf(todo)
      if (index > -1) {
        items.splice(index, 1)
        this.todoItems = items
        localStorage.setItem('todoItems', JSON.stringify(toRaw(items)))
      }
    },
    editTodoItem(item) {
      const items = JSON.parse(localStorage.getItem('todoItems'))
      const todo = items.find((elm) => elm.id === item.id)
      const index = items.indexOf(todo)
      if (index > -1) {
        items[index] = item
        this.todoItems = items
        localStorage.setItem('todoItems', JSON.stringify(toRaw(items)))
      }
    }
  }
})
