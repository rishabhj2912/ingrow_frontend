import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter'],
        Poppins: ['Poppins'],
      },
      colors: {
        'blue-primary': '#297AFF',
        'black-primary': '#172935',
        'grey-primary': '#17293599',
        'grey-secondary': '#17293566',
        'light-grey-primary': '#17293533',
        'yellow-primary': '#FEC400',
        'green-primary': '#6DDA8B',
        'red-primary': '#FF4A4A',
        'purple-primary': '#756bf6',
      },
    },
  },
  plugins: [],
};
export default config;
