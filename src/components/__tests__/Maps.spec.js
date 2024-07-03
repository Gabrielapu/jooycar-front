import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Map from '@/components/Map.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTripStore } from '@/stores/trip'
import { createRouter, createWebHistory } from 'vue-router'
import { LMap } from '@vue-leaflet/vue-leaflet'
import { nextTick } from 'vue'

// Mocking the leaflet components
vi.mock('@vue-leaflet/vue-leaflet', () => ({
  LMap: { template: '<div><slot /></div>' },
  LTileLayer: { template: '<div></div>' },
  LMarker: { template: '<div><slot /></div>' },
  LRectangle: { template: '<div></div>' },
  LTooltip: { template: '<div><slot /></div>' },
}))

describe('Map.vue', () => {
  let wrapper
  let router
  let tripStore

  beforeEach(() => {
    setActivePinia(createPinia())
    tripStore = useTripStore()
    router = createRouter({
      history: createWebHistory(),
      routes: []
    })
    wrapper = mount(Map, {
      global: {
        plugins: [router],
        provide: {
          leaflet: {}
        }
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('does not render the map when no trip is selected', () => {
    expect(wrapper.findComponent(LMap).exists()).toBe(false)
  })

  it('renders the map when a trip is selected', async () => {
    tripStore.selectedTrip = {
      id: 1,
      start: { lat: 10, lon: 20 },
      end: { lat: 15, lon: 25 },
      boundingBox: [
        { lat: 10, lon: 20 },
        { lat: 15, lon: 25 },
        { lat: 15, lon: 20 },
        { lat: 10, lon: 25 }
      ]
    }
    await nextTick()
    expect(wrapper.findComponent(LMap).exists()).toBe(true)
  })

  it('renders markers at the correct positions', async () => {
    tripStore.selectedTrip = {
      id: 1,
      start: { lat: 10, lon: 20 },
      end: { lat: 15, lon: 25 },
      boundingBox: [
        { lat: 10, lon: 20 },
        { lat: 15, lon: 25 },
        { lat: 15, lon: 20 },
        { lat: 10, lon: 25 }
      ]
    }
    await nextTick()
    const markers = wrapper.findAllComponents('.marker')
    expect(markers.length).toBe(2)
    expect(markers[0].attributes('lat-lng')).toEqual("10,20")
    expect(markers[1].attributes('lat-lng')).toEqual("15,25")
  })

  it('calculates coordinates for the rectangle correctly', () => {
    tripStore.selectedTrip = {
      id: 1,
      start: { lat: 10, lon: 20 },
      end: { lat: 15, lon: 25 },
      boundingBox: [
        { lat: 10, lon: 20 },
        { lat: 15, lon: 25 },
        { lat: 15, lon: 20 },
        { lat: 10, lon: 25 }
      ]
    }
    const expectedCoordinates = [
      [10, 20],
      [15, 25],
      [15, 20],
      [10, 25]
    ]
    expect(wrapper.vm.getCoordinates()).toEqual(expectedCoordinates)
  })
})
