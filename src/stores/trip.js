import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTripStore = defineStore('tripStore', () => {
  const trips = ref([])
  const selectedTrip = ref({})
  const mockTrip = {
    id : "manualTrip",
    start : {
      time : 1642539928000,
      lat : -40.275898,
      lon : -73.071979,
      address : "Arturo Prat 6"
    },
    end : {
      time : 1642541428000,
      lat : -40.300796,
      lon : -73.085338,
      address : "Arturo Prat 105"
    },
    distance : 3,
    duration : 300000,
    overspeedsCount : 2,
    boundingBox : [
      {
        lat : -40.275898,
        lon : -73.071979,
      }, 
      {
        lat : -40.300877,
        lon : -73.071979
      },            
      {
        lat : -40.300877,
        lon : -73.085338,
      },
      {
        lat : -40.275898,
        lon : -73.085338
      },  
    ]
  }
  const baseUrl = 
    'https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0'
  
  async function getTrips(filters) {
    try {
      const url = `${baseUrl}/api/trips/v1`
        // url += ``
      const res = await axios.get(url)
      trips.value = []
      trips.value = res.data.trips
    } catch (e) {
      console.error(e)
    } finally {
      const isTrip = trips.value
        .find(trip => trip.id === 'manualTrip')
      if(!isTrip) trips.value.push(mockTrip)
    }
  }

  function setSelectedTrip(id) {
    selectedTrip.value = trips.value.find(trip => trip.id === id)
  }

  return { trips, getTrips, setSelectedTrip, selectedTrip }
})
