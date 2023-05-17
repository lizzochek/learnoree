import LinkButton from '@/components/common/LinkButton.vue';
import { mount } from '@vue/test-utils';
import router from '@/router';

describe('LinkButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LinkButton, {
      global: {
        plugins: [router],
      },
      props: {
        text: 'text',
        backgroundTheme: 'dark',
      },
      stubs: ['router-link'],
    });
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
