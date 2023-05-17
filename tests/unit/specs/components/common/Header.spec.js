import Header from '@/components/common/Header.vue';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createStore } from 'vuex';

const store = createStore({
  getters: {
    'login/getUser'() {
      return {
        role: 'role',
      };
    },
  },
});

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });
  });

  it('expect element to exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
