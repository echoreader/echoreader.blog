import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        './src/**/*.{html,njk,md,liquid}',
        './_includes/*.{html,njk,md,liquid}',
      ],
      // exclude node_modules biar lebih ringan
      exclude: ['node_modules', '.git'],
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
  ],
  preflights: [
    {
      getCSS: () => `
        body {
          font-family: 'Open Sans', system-ui, sans-serif;
        }
      `,
    },
  ],
  safelist: [
    'border-2', 'border-black', 'border-solid',
    'text-white', 'text-black', 'no-underline',
    'hover:text-blue-600', 'rounded-lg', 'shadow-sm'
    ]
})
