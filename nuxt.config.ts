// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pinia: {
    autoImports: [
			"defineStore",
			"storeToRefs",
      ["defineStore", "definePiniaStore"],
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_config.scss" as *;'
        }
      }
    }
	},
  css:[
		"~/assets/css/main.scss",
  ],
  modules: ["@pinia/nuxt",]
})
