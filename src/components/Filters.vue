<template>
  <div class="filters">
    <DatePicker 
      v-model="startDate" 
      class="start-picker ml-4"
      placeholder="Fecha de Inicio"
      @clear="startDate = null; emitFilters()"
    />
    <DatePicker 
      v-model="endDate" 
      class="end-picker"
      placeholder="Fecha de inicio"
      :min-date="startDate"
      @clear="endDate = null; emitFilters()"
    />
    <v-text-field
      v-model="distance"
      label="Distancia"
      class="distance-input mr-2"
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
      class="search-button mr-4"
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