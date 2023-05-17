import BaseModal from '@/components/common/BaseModal.vue';
import { shallowMount } from '@vue/test-utils';

describe('BaseModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseModal, {});
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
