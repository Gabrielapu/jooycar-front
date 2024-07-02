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
  <div style="height: 95vh" class="w-100">
    <l-map
      v-if="tStore.selectedTrip?.id"
      :zoom="zoom" 
      :center="center"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker 
        :lat-lng="[
          tStore.selectedTrip.start.lat,
          tStore.selectedTrip.start.lon
        ]"
      />
      <l-marker 
        :lat-lng="[
          tStore.selectedTrip.end.lat,
          tStore.selectedTrip.end.lon
        ]"
      />
      <l-polygon :lat-lngs="getCoordinates()" color="green"/>
    </l-map>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { 
  LMap, 
  LTileLayer, 
  LMarker,
  LPolygon
} from "@vue-leaflet/vue-leaflet";
import { useTripStore } from '../stores/trip.js'
import { useRoute } from "vue-router";

const tStore = useTripStore()
const zoom = ref(17)
const center = ref([])
const route = useRoute()

onBeforeMount(() => {
  console.log(route.params.id)
  tStore.setSelectedTrip(route.params.id)
  console.log(tStore.selectedTrip)
  if(tStore.selectedTrip?.id) {
    center.value = [
      tStore.selectedTrip.start.lat,
      tStore.selectedTrip.start.lon
    ]
  }
})

function getCoordinates() {
  return [
    [
      tStore.selectedTrip.boundingBox[0].lat,
      tStore.selectedTrip.boundingBox[0].lon
    ],
    [
      tStore.selectedTrip.boundingBox[1].lat,
      tStore.selectedTrip.boundingBox[1].lon
    ],
    [
      tStore.selectedTrip.boundingBox[2].lat,
      tStore.selectedTrip.boundingBox[2].lon
    ],
    [
      tStore.selectedTrip.boundingBox[3].lat,
      tStore.selectedTrip.boundingBox[3].lon
    ],
  ]
}
</script>