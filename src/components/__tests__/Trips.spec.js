import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import Trips from '@/views/Trips.vue'


describe('Trips.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Trips, {
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})