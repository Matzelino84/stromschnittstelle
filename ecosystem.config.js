// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "strom-export",
      script: "./export-runner.js",
      interpreter: "node",
      cron_restart: "0 6 * * *", // Jeden Tag um 6:00 Uhr morgens
      watch: false
    }
  ]
};
