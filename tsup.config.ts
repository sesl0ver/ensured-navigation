import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/EnsuredNavigation.tsx'],
    format: ['esm', 'cjs'],
    dts: {
        entry: 'src/EnsuredNavigation.tsx',
        resolve: true,
    },
    outDir: 'dist',
    clean: true,
});