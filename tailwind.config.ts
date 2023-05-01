import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line global-require
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#136AE4',
        },
      },
    ],
  },
} satisfies Config;
