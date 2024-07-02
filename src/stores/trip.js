import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTripStore = defineStore('tripStore', () => {
  const trips = ref([])
  const selectedTrip = ref({})
  const baseUrl = 'https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0'
  
  async function getTrips(filters) {
    const url = `${baseUrl}/api/trips/v1`
      // url += ``
    const res = await axios.get(url)
    trips.value = res.data.trips
  }

  function setSelectedTrip(id) {
    selectedTrip.value = trips.value.find(trip => trip.id === id)
  }

  return { trips, getTrips, setSelectedTrip, selectedTrip }
})
