<template>
  <VueDatePicker
    v-model="model"
    locale="es"
    auto-apply
    class="w-25"
    time-picker-inline
    :min-date="minDate"
  >
    <template #trigger>
      <v-text-field
        v-model="computedDate"
        class="mr-2"
        variant="outlined"
        density="compact"
        hide-details
        :placeholder="placeholder"
        clearable
        readonly
        @click:clear="emit('clear')"
      />
    </template>
  </VueDatePicker>
</template>

<script setup>
import { computed, inject } from 'vue'

const dayjs = inject('dayjs')
const model = defineModel()
const props = defineProps({
  placeholder: String,
  minDate: Date
})
const emit = defineEmits(['clear'])

const computedDate = computed(() => {
  if(!model.value) return null
  return dayjs(model.value).format('DD-MM-YYYY')
})
</script>