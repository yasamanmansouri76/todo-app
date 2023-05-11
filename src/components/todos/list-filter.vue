<template>
  <div>
    <!-- <v-text-field
      density="compact"
      label="Search todos description or title..."
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      outlined
      class="mb-4"
    ></v-text-field> -->
    <v-select
      v-model="filters.priority"
      :items="['High', 'Low']"
      item-value="value"
      item-text="text"
      placeholder="Priority filter"
      :menu-props="{ offsetY: true }"
      outlined
      @update:modelValue="filterPriority()"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup(props, { emit }) {
    let filters = reactive({
      priority: null
    })

    function filterPriority() {
      emit('filter', filters.priority)
    }

    return {
      filters,
      filterPriority
    }
  }
}
</script>
