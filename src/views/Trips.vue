<template>
  <div class="d-flex justify-space-between align-center mx-4 my-2">
    <h1 class="text-h6"> 
      Listado de viajes
      <h2 class="text-subtitle-1">Este es un listado de tus viajes</h2> 
    </h1>
  </div>
  <hr class="mx-4 mb-2">
  <Table
    :loading="loading"
    :trips="trips"
  />
</template>

<script setup>
import Table from '../components/Table.vue'
import { onMounted, reactive, ref } from 'vue';
import { useTripStore } from '../stores/trip.js';

const tStore = useTripStore()
const loading = ref(false)
let trips = reactive([])

onMounted(async () => {
  loading.value = true
  await tStore.getTrips()
  trips = tStore.trips
  loading.value = false
})

</script>