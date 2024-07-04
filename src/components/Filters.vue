<template>
  <div class="filters">
    <DatePicker 
      v-model="startDate" 
      class="ml-4"
      placeholder="Fecha de inicio"
      @clear="startDate = null; emitFilters()"
    />
    <DatePicker 
      v-model="endDate" 
      placeholder="Fecha de inicio"
      :min-date="startDate"
      @clear="endDate = null; emitFilters()"
    />
    <v-text-field
      v-model="distance"
      label="Distancia"
      class="mr-2"
      variant="outlined"
      density="compact"
      clearable
      hide-details
      type="number"
      min="0"
      @click:clear="distance = null; emitFilters()"
    />
    <v-btn
      color="primary"
      variant="outlined"
      class="mr-4"
      @click="emitFilters()"
    >
      Buscar
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DatePicker from './DatePicker.vue';

const emit = defineEmits(['search'])

const startDate = ref(null)
const endDate = ref(null)
const distance = ref(null)

function emitFilters() {
  emit('search', {
    startDate: Date.parse(startDate.value),
    endDate: Date.parse(endDate.value),
    distance: distance.value
  })
}
</script>