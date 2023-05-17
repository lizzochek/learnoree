import BaseCard from '@/components/common/BaseCard.vue';
import { shallowMount } from '@vue/test-utils';

describe('BaseCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseCard, {});
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
