// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
	app:{
		head:{
			title: 'DLS',
			titleTemplate: "Cricket | %s",
			meta:[
				{charset: 'utf-8'},
				{
					hid: "viewport",
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{ hid: "description", property: "description", content: "" },
				{ property: "format-detection", content: "telephone=no" },
				{
					hid: "og:type",
					property: "og:type",
					content: "",
				},
				{
					hid: "og:title",
					property: "og:title",
					content: "",
				},
				{
					hid: "og:description",
					property: "og:description",
					content: "",
				},
				{
					hid: "og:url",
					property: "og:url",
					content: "",
				},
				{
					hid: "og:site_name",
					property: "og:site_name",
					content: "",
				},
				{
					hid: "Keywords",
					property: "Keywords",
					content: "",
				},
				{
					hid: "Description",
					property: "Description",
					content: "",
				},
			],
			link:[
				{ rel: "icon", type: "image/x-icon", href: "/images/cricket_favicon.png" },
			]
		}
	},
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
