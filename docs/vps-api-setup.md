# VPS API Server Setup Guide

The contact form (`/contact`) POSTs to `/api/contact`, which is handled by the Express API server. Follow these steps once to get it running on the VPS.

---

## Prerequisites

- Node.js ≥ 18 and pnpm installed on the VPS
- PM2 installed globally: `npm install -g pm2`
- The site already built and serving via Nginx

---

## Step 1 — Set your SMTP password in the ecosystem config

Open `ecosystem.config.cjs` in the repo root and replace the placeholder:

```
SMTP_PASS: "REPLACE_WITH_SMTP2GO_PASSWORD",
```

with your real SMTP2GO password. **Do not commit this change** — keep the secret on the server only.

---

## Step 2 — Build the project (if you haven't already)

```bash
cd /home/administrator/apps/kayeflooring
git pull
pnpm install
BASE_PATH=/ pnpm build
sudo chmod -R o+rx artifacts/kaye-flooring/dist/public
```

---

## Step 3 — Start the API server under PM2

```bash
cd /home/administrator/apps/kayeflooring
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup   # copy and run the command it prints
```

Verify it's running:

```bash
pm2 status
curl http://localhost:8080/health
```

---

## Step 4 — Add the Nginx proxy for /api/

Edit your Nginx config:

```bash
sudo nano /etc/nginx/sites-available/kayeflooring.com.conf
```

Add the contents of `docs/nginx-api-proxy.conf` **inside the `server { }` block, before the final `location /` block**. Then reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Test from outside:

```bash
curl -s -o /dev/null -w "%{http_code}" https://kayeflooring.com/api/health
# should return 200
```

---

## Step 5 — Test the contact form end-to-end

Submit the form on https://kayeflooring.com/contact and confirm an email arrives at kayeflooring@gmail.com.

---

## After every future deploy

```bash
cd /home/administrator/apps/kayeflooring
git pull
pnpm install
BASE_PATH=/ pnpm build
sudo chmod -R o+rx artifacts/kaye-flooring/dist/public
pm2 restart kaye-api
```

---

## Environment variables reference

| Variable    | Value                  | Notes                          |
|-------------|------------------------|--------------------------------|
| `PORT`      | `8080`                 | Set in ecosystem.config.cjs    |
| `SMTP_HOST` | `mail.smtp2go.com`     | SMTP2GO standard host          |
| `SMTP_PORT` | `587`                  | STARTTLS                       |
| `SMTP_USER` | `info@kayeflooring.com`| SMTP2GO sender address         |
| `SMTP_FROM` | `info@kayeflooring.com`| From address in emails         |
| `SMTP_TO`   | `kayeflooring@gmail.com` | Destination for lead emails  |
| `SMTP_PASS` | *(secret)*             | Set manually on VPS only       |
