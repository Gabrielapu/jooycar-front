import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Table from '@/components/Table.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTripStore } from '@/stores/trip'
import { createRouter, createWebHistory } from 'vue-router'
import dayjs from 'dayjs'

vi.mock('dayjs', () => {
  return {
    default: vi.fn(() => ({
      format: vi.fn(() => '12:00 - 01/01/2024')
    }))
  }
})

describe('Table.vue', () => {
  let wrapper
  let router

  beforeEach(() => {
    setActivePinia(createPinia())
    router = createRouter({
      history: createWebHistory(),
      routes: []
    })
    router.push = vi.fn()

    wrapper = mount(Table, {
      global: {
        provide: {
          dayjs: dayjs
        },
        plugins: [router]
      },
      props: {
        loading: false,
        trips: [
          {
            id: 1,
            start: { time: 1620211200000, address: 'Start Address' },
            end: { time: 1620214800000, address: 'End Address' },
            distance: 10,
            duration: 3600000
          }
        ]
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the table headers correctly', () => {
    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('Inicio')
    expect(headers[1].text()).toBe('Término')
    expect(headers[2].text()).toBe('Distancia y tiempo')
    expect(headers[3].text()).toBe('Acciones')
  })

  it('renders the table rows correctly', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    const columns = rows[0].findAll('td')
    expect(columns.length).toBe(4)
    expect(columns[0].text()).toContain('12:00 - 01/01/2024')
    expect(columns[0].text()).toContain('Start Address')
    expect(columns[1].text()).toContain('12:00 - 01/01/2024')
    expect(columns[1].text()).toContain('End Address')
    expect(columns[2].text()).toContain('10 km  0 minutos')
    expect(columns[3].find('.my-button').exists()).toBe(true)
  })

  it('calls goToTripDetail on button click', async () => {
    const tripStore = useTripStore()
    tripStore.setSelectedTrip = vi.fn()
    const button = wrapper.find('.my-button')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(tripStore.setSelectedTrip).toHaveBeenCalledWith(1, wrapper.vm.trips)
    expect(router.push).toHaveBeenCalledWith('/trip/1')
  })
})
