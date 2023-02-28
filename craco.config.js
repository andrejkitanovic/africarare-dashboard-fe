module.exports = {
  babel: {
    loaderOptions: {
      ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"], // https://docs.mapbox.com/mapbox-gl-js/api/#transpiling-v2
    },
  },
};
