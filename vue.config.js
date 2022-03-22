module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    themeColor: "#ffffff",
    msTileColor: "#000000",
    manifestOptions: {
      name: "無限冒險重製版",
      short_name: "無限",
      start_url: "./game",
      icons: [
        { src: "./img/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "./img/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },
  },
};
