import ColorChangeButton from '@/components/header-items/ColorChangeButton.vue';
import { mount } from '@vue/test-utils';

describe('ColorChangeButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ColorChangeButton, {});
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should change style', () => {
    delete window.location;
    window.location = { reload: jest.fn() };
    wrapper.vm.changeStyle();
    expect(localStorage.getItem('mode')).toEqual('light');

    wrapper.vm.changeStyle();
    expect(localStorage.getItem('mode')).toEqual('dark');
  });
});
