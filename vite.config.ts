// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '@testing-library/jest-dom',
    mockReset: true,
    coverage: {
      reporter: ['text', 'json', 'html'], // Formats you want for the coverage report
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.js', // Exclude all test files
        '**/*.spec.js', // Exclude spec files
        '**/*.test.ts', // If you're using TypeScript
        '**/*.spec.ts',
        '**/*.test.tsx', // If you're using TypeScript
        '**/*.spec.tsx',
        '**/*.config.js'
      ],
    },
  },
});
