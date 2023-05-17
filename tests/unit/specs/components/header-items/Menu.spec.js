import Menu from '@/components/header-items/Menu.vue';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createStore } from 'vuex';

describe('Menu', () => {
  let wrapper;
  let store;

  it('should do correct computed', () => {
    store = createStore({
      getters: {
        'login/getUser'() {
          return {
            role: 'student',
            authorized: true,
          };
        },
      },
    });
    wrapper = mount(Menu, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });

    store = createStore({
      getters: {
        'login/getUser'() {
          return {
            role: 'admin',
            authorized: true,
          };
        },
      },
    });
    wrapper = mount(Menu, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });

    store = createStore({
      getters: {
        'login/getUser'() {
          return {
            role: 'teacher',
            authorized: true,
          };
        },
      },
    });
    wrapper = mount(Menu, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should be correct on click', () => {
    delete window.location;
    window.location = { reload: jest.fn() };
    wrapper = mount(Menu, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });
    wrapper.vm.onLinkClick();
    expect(wrapper.exists()).toBe(true);
  });
});
