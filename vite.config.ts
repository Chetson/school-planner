import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
    svgr({
      svgrOptions: {
        exportType: 'default',
        svgo: true,
        memo: true,
      },
      include: '**/*.svg',
    }),
  ],

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  resolve: {
    alias: {
      '@app/*': 'src/app/*',
      '@pages/*': 'src/pages/*',
      '@widgets/*': 'src/widgets/*',
      '@features/*': 'src/features/*',
      '@entities/*': 'src/entities/*',
      '@shared/*': 'src/shared/*',
    },
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunk.[hash].[format].js',
        entryFileNames: 'entry-[name].[hash].[format].js',
        inlineDynamicImports: false,
      },
    },
  },
});
