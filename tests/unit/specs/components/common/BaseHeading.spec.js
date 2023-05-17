import BaseHeading from '@/components/common/BaseHeading.vue';
import { shallowMount } from '@vue/test-utils';

describe('BaseHeading', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseHeading, {});
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
