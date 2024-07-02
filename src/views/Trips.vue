<template>
  <div class="d-flex justify-space-between align-center mx-4 my-2">
    <h1 class="text-h6"> 
      Listado de viajes
      <h2 class="text-subtitle-1">Este es un listado de tus viajes</h2> 
    </h1>
  </div>
  <v-table 
    v-if="!loading"
    class="elevation-1 mx-4 border-sm rounded-lg"
  >
    <thead>
      <tr>
        <th class="text-body-1 text-center">
          Inicio
        </th>
        <th class="text-body-1 text-center">
          Término
        </th>
        <th class="text-body-1 text-center">
          Distancia y tiempo
        </th>
        <th class="text-body-1 text-center">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody v-if="loading">
      <tr class="text-center">
        <td colspan="4">
          <v-progress-circular
            color="primary"
            class="my-10"
            :size="50"
            indeterminate
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="!loading">
      <tr
        v-for="trip in trips"
        :key="trip.id"
        class="text-center"
      >
        <td>
          {{ getCustomDateFormat(trip.start.time) }} <br>        
          {{ trip.start.address }}
        </td>
        <td>
          {{ getCustomDateFormat(trip.end.time) }} <br>        
          {{ trip.end.address }}
        </td>
        <td>
          {{ `${trip.distance} km` }} <br>
          {{ `${getMinutesFromMilliseconds(trip.duration)} minutos` }}
        </td>
        <td>
          <v-btn
            color="primary"
            variant="outlined"
            density="compact"
            @click="goToTripDetail(trip.id)"
          >
            Ver detalle
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { onMounted, reactive, ref, inject } from 'vue';
import { useTripStore } from '../stores/trip.js';
import { useRouter } from 'vue-router'

const dayjs = inject('dayjs')
const tStore = useTripStore()
const loading = ref(false)
const router = useRouter()
let trips = reactive([])

onMounted(async () => {
  loading.value = true
  await tStore.getTrips()
  trips = tStore.trips
  loading.value = false
})

function getCustomDateFormat(miliseconds) {
  const date = new Date(miliseconds)
  return dayjs(date).format('HH:mm - DD/MM/YYYY')
}

function getMinutesFromMilliseconds(miliseconds) {
  const date = new Date(miliseconds);
  const minutes = date.getMinutes();
  return minutes.toString()
}

function goToTripDetail(id) {
  tStore.setSelectedTrip(id)
  router.push(`/trip/${id}`)
}

</script>