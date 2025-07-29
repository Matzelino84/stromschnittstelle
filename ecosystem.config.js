// ecosystem.config.js
export default {
    apps: [
      {
        name: "strom-export-daily",
        script: "./export-runner.js",
        interpreter: "node",
        cron_restart: "0 20 * * *", // Täglich um 20:00 Uhr
        watch: false,
        autorestart: false,
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  }

  