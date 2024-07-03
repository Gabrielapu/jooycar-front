<template>
  <div class="filters">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="computeStartDate"
          class="ml-4 mr-2"
          variant="outlined"
          density="compact"
          hide-details
          locale="es-ES"
          label="Fecha de inicio"
          hide-header
          clearable
          v-bind="props"
          @click:clear="startDate = null"
        />
      </template>
      <v-date-picker 
        header="" 
        title="Seleccionar fecha" 
        v-model="startDate" />
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="computeEndDate"
          class="mr-2"
          variant="outlined"
          density="compact"
          hide-details
          label="Fecha de fin"
          clearable
          v-bind="props"
          @click:clear="endDate = null"
        />
      </template>
      <v-date-picker 
        v-model="endDate" 
        header=""
        title="Seleccionar fecha" 
        :min="startDate"
      />
    </v-menu>
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
      @click:clear="distance = null"
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
import { inject, ref, computed } from 'vue';

const emit = defineEmits(['search'])
const dayjs = inject('dayjs')
const startDate = ref(null)
const endDate = ref(null)
const distance = ref(null)

const computeStartDate = computed(() => {
  if(!startDate.value) return null
  return dayjs(startDate.value).format('DD-MM-YYYY')
})

const computeEndDate = computed(() => {
  if(!endDate.value) return null
  return dayjs(endDate.value).format('DD-MM-YYYY')
})

function emitFilters() {
  if(!startDate.value && !endDate.value && !distance.value) return
  emit('search', {
    startDate: startDate.value,
    endDate: endDate.value,
    distance: distance.value
  })
}
</script>