<template>
  <div class="d-flex justify-space-between align-center mx-4 my-2">
    <h1 class="text-h6"> 
      Detalle del viaje
      <h2 class="text-subtitle-1">Marcadores de inicio y fin</h2> 
    </h1>
    <v-btn
      to="/"
      color="primary"
      variant="outlined"
      density="compact"
    >
      Volver
    </v-btn>
  </div>
  <hr class="mx-2 mb-2">
  <Map />
</template>

<script setup>
import Map from '../components/Map.vue'
</script>