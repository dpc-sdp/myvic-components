const path = require("path");

const resolve = dir => {
  return path.join(__dirname, "..", dir);
};

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.resolve.alias.vue = "vue/dist/vue.js";

  // remove file-loader as it has conflicting config with url-loader
  config.module.rules = config.module.rules.filter(rule => {
    if (rule.loader && rule.loader.includes("file-loader")) {
      return false;
    }
    return rule;
  });

  config.module.rules.push(
    {
      test: /\.(scss|css)$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: [
        resolve("../node_modules"),
        resolve("node_modules"),
        resolve("../packages"),
        resolve("storybook-components"),
        resolve("storybook-components/scss")
      ],
      exclude: [resolve("../node_modules/ol")]
    },
    {
      test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: "url-loader",
      exclude: [
        resolve("static/custom_icons/"),
        resolve("../node_modules/@dpc-sdp/ripple-icon"),
        resolve("../packages/DataBlock/node_modules/@dpc-sdp/ripple-icon/assets/img/"),
        resolve("../packages/AutoComplete/node_modules/@dpc-sdp/ripple-icon/assets/img/")
      ]
    },
    {
      test: /\.svg$/,
      include: [
        resolve("../node_modules"),
        resolve("static/custom_icons/"),
        resolve("../packages/DataBlock/node_modules/@dpc-sdp/ripple-icon/assets/img/"),
        resolve("../packages/AutoComplete/node_modules/@dpc-sdp/ripple-icon/assets/img/")
      ],
      use: ["svg-sprite-loader", "svgo-loader"]
    },
    {
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      enforce: "pre",
      include: [
        resolve("../packages/"),
        resolve("storybook-components"),
        resolve("test")
      ],
      options: {
        formatter: require("eslint-friendly-formatter"),
        emitWarning: true
      }
    }
  );

  // Return the altered config
  return config;
};
