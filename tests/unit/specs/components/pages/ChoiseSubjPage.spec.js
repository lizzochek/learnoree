import ChoiseSubjPage from '@/components/pages/ChoiseSubjPage.vue';
import { shallowMount } from '@vue/test-utils';
import router from '@/router';
import { createStore } from 'vuex';

jest.mock('@/assets/css/components/choise-subj-page.scss', () => {
  return {};
});

const store = createStore({
  getters: {
    'login/getUser'() {
      return {
        role: 'admin',
      };
    },
  },
  actions: {
    'subjects/getChoiseSubjects'() {
      return [];
    },
    'subjects/getChosenSubjects'() {
      return [];
    },
  },
});

describe('ChoiseSubjPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ChoiseSubjPage, {
      global: {
        plugins: [router, store],
      },
      stubs: ['router-link'],
    });
  });

  it('should wrapper exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
