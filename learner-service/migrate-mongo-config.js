const db = require("./db");

module.exports = {
  mongodb: {
    url: db.url,
    databaseName: "eduwave"
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",
};
