import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest'
import Filters from '@/components/Filters.vue';
import DatePicker from '@/components/DatePicker.vue';
import { nextTick } from 'vue';
import dayjs from 'dayjs';

describe('Filters.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Filters, {
      global: {
        provide: {
          dayjs: dayjs
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(DatePicker).exists()).toBe(true);
    expect(wrapper.find('.distance-input').exists()).toBe(true);
    expect(wrapper.find('.search-button').exists()).toBe(true);
  });

  it('updates startDate when DatePicker changes', async () => {
    const startDatePicker = wrapper.findComponent('.start-picker');
    startDatePicker.vm.$emit('update:modelValue', '2023-01-01');
    await nextTick();

    expect(wrapper.vm.startDate).toBe('2023-01-01');
  });

  it('updates endDate when DatePicker changes', async () => {
    const endDatePicker = wrapper.findComponent('.end-picker');
    endDatePicker.vm.$emit('update:modelValue', '2023-01-02');
    await nextTick();

    expect(wrapper.vm.endDate).toBe('2023-01-02');
  });
});
