// // nuxt.config.ts
// import { defineNuxtConfig } from 'nuxt/config'
// import tailwindcss from '@tailwindcss/vite'
// import type { VitePWAOptions } from 'vite-plugin-pwa'

// export default defineNuxtConfig({
//   // Работаем как SPA
//   ssr: false,

//   // Публичные переменные окружения
//   runtimeConfig: {
//     public: {
//       apiBase: process.env.NUXT_PUBLIC_API_BASE!
//     }
//   },

//   // Подключаем модули
//   modules: [
//     '@pinia/nuxt',
//     '@nuxt/eslint',
//     '@vite-pwa/nuxt'   // ← PWA-модуль
//   ],

//   // Совместимость
//   compatibilityDate: '2025-05-15',
//   devtools:           { enabled: true },

//   // Глобальные стили
//   css: ['~/assets/css/main.css'],

//   // Vite-плагины
//   vite: {
//     plugins: [
//       tailwindcss()
//     ]
//   },

//   // Минимальный блок PWA (приведён к Partial, чтобы TS не ругался)
//   pwa: <Partial<VitePWAOptions>>{
//     registerType: 'autoUpdate',
//     manifest: {
//       name:       'MyApp',
//       short_name: 'App',
//       display:    'standalone',
//       start_url:  '/',
//       icons: [
//         { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
//         { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
//       ]
//     }
//   },

//   // Кастомный заголовок вкладки
//   app: {
//     head: {
//       title: 'MyApp'
//     }
//   }
// })


import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {
     public: {
       apiBase: process.env.NUXT_PUBLIC_API_BASE!
     }
  },
  modules: [// ...твой(и) другие модули,
  '@pinia/nuxt', '@nuxt/eslint'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
      plugins: [
        tailwindcss(),
      ],

    },
  ssr: false,
})
