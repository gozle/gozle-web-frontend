const Backend = require("i18next-http-backend");

const isBrowser = typeof window !== "undefined";

module.exports = {
  i18n: {
    defaultLocale: "tk",
    locales: ["tk", "en", "ru"],
  },
  use: isBrowser ? [Backend] : [],
  init: {
    interpolation: {
      format: (value, format, lng) => {
        if (format === "number") {
          return new Intl.NumberFormat(lng).format(value);
        }
      },
    },
  },
  serializeConfig: false,
};
