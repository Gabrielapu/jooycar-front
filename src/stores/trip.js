import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTripStore = defineStore('tripStore', () => {
  const trips = ref([])
  const selectedTrip = ref({})
  const baseUrl = 
    'https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0'
  
  async function getTrips({start, end, distance}) {
    try {
      let url = `${baseUrl}/api/trips/v1?limit=10`

      if(start) url += `&start_gte=${start}`
      if(end) url += `&start_lte=${end}`
      if(distance !== null && distance !== undefined) {
        url += `&distance_gte=${distance}`
      }
      const res = await axios.get(url)
      trips.value = []
      trips.value = res.data.trips
    } catch (e) {
      console.error(e)
    }
  }

  function setSelectedTrip(id, trips) {
    trips.value = trips
    selectedTrip.value = trips.value.find(trip => trip.id === id)
  }

  return { trips, getTrips, setSelectedTrip, selectedTrip }
})
