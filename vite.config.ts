import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '毎日こゝろ',
        short_name: '毎日こゝろ',
        description: '新聞連載のように『こゝろ』を読もう',
        theme_color: '#778899',
        icons: [
          {
            src: `${process.argv.includes('dev') ? '' : process.env.BASE_PATH}/favicon.png`,
            sizes: '128x128',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
