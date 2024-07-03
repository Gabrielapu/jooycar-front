<template>
  <div class="mx-4 my-2">
    <h1 class="text-h6"> 
      Listado de viajes
      <h2 class="text-subtitle-1">Este es un listado de tus viajes</h2> 
    </h1>
  </div>
  <hr class="mx-4 mb-2">
  <Filters @search="e => fetchTrips(e)"/>
  <Table
    :loading="loading"
    :trips="trips"
  />
</template>

<script setup>
import Table from '../components/Table.vue'
import Filters from '../components/Filters.vue'
import { onMounted, reactive, ref } from 'vue';
import { useTripStore } from '../stores/trip.js';

const tStore = useTripStore()
const loading = ref(false)
let trips = reactive([])

onMounted(async () => {
  await fetchTrips()
})

async function fetchTrips(filters) {
  loading.value = true
  let payload = {};
  if(filters) {
    const { startDate, endDate, distance } = filters
    payload = {
      start: startDate ? Date.parse(startDate) : null,
      end: endDate ? Date.parse(endDate) : null,
      distance: distance !== null
        ? Math.abs(distance) 
        : null  
    }
  }
  await tStore.getTrips(payload)
  trips = tStore.trips
  loading.value = false
}
</script>

<style scoped> 
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>