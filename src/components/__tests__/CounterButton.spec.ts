import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CounterButton from '../CounterButton.vue';

describe('CounterButton', () => {
  it('adds properly', async () => {
    const wrapper = mount(CounterButton);
    expect(wrapper.text()).toBe('Clicked 0 times');
    await wrapper.trigger('click');
    expect(wrapper.text()).toBe('Clicked 1 times');
  });
});
