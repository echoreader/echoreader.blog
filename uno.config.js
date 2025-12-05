import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        './src/**/*.{html,njk,md,liquid}',
        './_includes/*.{html,njk,md,liquid}',
      ],
      exclude: ['node_modules', '.git'],
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  preflights: [
    {
      getCSS: () => `
        html {
          overflow-y: scroll;
        }

        body {
          font-family: 'Open Sans', system-ui, sans-serif;
        }
      
        table {
          border-collapse: collapse;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }

        table th,
        table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }

        table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        table tr:nth-child(even) {
          background-color: #fafafa;
        }

        blockquote { border-left: 4px solid #828282; padding-left: 12px; font-style: italic; }
        details { margin-bottom: 1rem; }
        summary { cursor: pointer; font-weight: bold; }`,
    },
  ],
  safelist: [
    'border-2', 'border-black', 'border-solid',
    'text-white', 'text-black', 'no-underline',
    'hover:text-blue-600', 'rounded-lg', 'shadow-sm'
    ]
})