import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            'h1, h2, h3, h4': {
              color: 'inherit',
              fontWeight: '600',
            },
            'h1': { fontSize: '1.5em', marginTop: '0.5em', marginBottom: '0.5em' },
            'h2': { fontSize: '1.25em', marginTop: '0.5em', marginBottom: '0.5em' },
            'h3': { fontSize: '1.125em', marginTop: '0.5em', marginBottom: '0.5em' },
            'pre': {
              backgroundColor: '#f3f4f6',
              color: '#374151',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              padding: '0.75em',
              borderRadius: '0.375rem',
            },
            'blockquote': {
              borderLeftColor: '#3b82f6',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.375rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
