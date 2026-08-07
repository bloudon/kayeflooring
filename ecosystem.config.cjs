/**
 * PM2 ecosystem config for Kaye Flooring API server.
 *
 * One-time setup on the VPS:
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 *   pm2 startup          # follow the printed command to enable auto-start on reboot
 *
 * After each deploy (git pull + pnpm build):
 *   pm2 restart kaye-api
 */
module.exports = {
  apps: [
    {
      name: "kaye-api",
      script: "dist/index.mjs",
      cwd: "/home/administrator/apps/kayeflooring/artifacts/api-server",
      node_args: "--enable-source-maps",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "production",
        PORT: "8080",
        // IMPORTANT: Set UPLOADS_DIR to a folder OUTSIDE the repo so that gallery
        // photos survive git pulls and re-deploys.  Create the folder first:
        //   mkdir -p /home/administrator/kaye-uploads
        // then uncomment the line below:
        // UPLOADS_DIR: "/home/administrator/kaye-uploads",
        // SMTP — replace SMTP_PASS with your real SMTP2GO password
        SMTP_HOST: "mail.smtp2go.com",
        SMTP_PORT: "587",
        SMTP_USER: "info@kayeflooring.com",
        SMTP_FROM: "info@kayeflooring.com",
        SMTP_TO: "kayeflooring@gmail.com",
        SMTP_PASS: "REPLACE_WITH_SMTP2GO_PASSWORD",
      },
    },
  ],
};
