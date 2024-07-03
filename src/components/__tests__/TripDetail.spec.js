import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import TripDetail from '@/views/TripDetail.vue'


describe('TripDetail.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(TripDetail, {
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})