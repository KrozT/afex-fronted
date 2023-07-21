import { defineStore } from 'pinia';
import { Theme } from '@/models/themeModel.ts';

interface State {
  appName: string | null,
  companyName: string | null,
  theme: Theme,
  language: string,
}

export const useApplicationStore = defineStore('application', {
  state: (): State => ({
    appName: null,
    companyName: null,
    theme: 'default',
    language: 'default',
  }),
  actions: {
    definePlatform(appName: string, companyName: string) {
      this.appName = appName;
      this.companyName = companyName;
    },
  },
  persist: true,
});
