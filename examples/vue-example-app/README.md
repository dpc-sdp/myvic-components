# Example for using MyVictoria components in Vue.js (Not Nuxt.js)

This is an example of using MyVictoria components in a Vue.js app.

## Intro

This example was created with Vue CLI as a clean project.

### Dependencies

Install below dev dependencies in your Vue project to make icon work.

```
npm install sass-resources-loader svgo svgo-loader svg-sprite-loader --save-dev
```

### Webpack configs

Some config required for making things like icon working.

Check [/vue.config.js](/vue.config.js) for more details.

## Project setup
```
yarn install
```
or
```
npm install
```

### Compiles and hot-reloads for development
```
yarn serve
```
or
```
npm run serve
```

### Covid-19 map

This app is used for Covid-19 map for now. Below env variable is required for building the map.

```shell
VUE_APP_COVID_MAP_BASEMAP_PROVIDER=Mapbox
VUE_APP_COVID_MAP_RADIUS=20000
VUE_APP_COVID_MAP_GEOCODE_PROVIDER=Mapbox
VUE_APP_COVID_MAP_VICMAP_API_KEY=xxxxxxx
VUE_APP_COVID_MAP_LABEL=Restriction zone
```

- `VUE_APP_COVID_MAP_BASEMAP_PROVIDER` value: `Mapbox` or `Vicmap`.
- `VUE_APP_COVID_MAP_GEOCODE_PROVIDER` value: `Mapbox`, `DELWP` or `VicmapAddressAPI`
