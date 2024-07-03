import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Filters from '@/components/Filters.vue'  

describe('Filters.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Filters)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
