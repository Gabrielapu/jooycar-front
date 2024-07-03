<template>
  <div class="map">
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
      >
        <l-tooltip>
          <div> Inicio </div>
        </l-tooltip>
      </l-marker>
      <l-marker 
        :lat-lng="[
          tStore.selectedTrip.end.lat,
          tStore.selectedTrip.end.lon
        ]"
      >
        <l-tooltip>
          <div> Fin </div>
        </l-tooltip>
      </l-marker>
      <l-rectangle 
        :lat-lngs="getCoordinates()" 
        color="blue"
        fillColor="white"
      />
    </l-map>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { 
  LMap, 
  LTileLayer, 
  LMarker,
  LRectangle,
  LTooltip
} from "@vue-leaflet/vue-leaflet";
import { useTripStore } from '../stores/trip.js'
import { useRoute } from "vue-router";

const tStore = useTripStore()
const zoom = ref(15)
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

<style scoped>
.map {
  height: 95vh;
  width: 100%;
}
</style>