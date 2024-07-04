import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import Trips from '@/views/Trips.vue'
import dayjs from 'dayjs'

describe('Trips.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Trips, {
      global: {
        provide: {
          dayjs: dayjs
        },
        plugins: [createPinia()]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})