# Google Search Console – Sitemap Submission Guide

## Sitemap is ready at:
`https://kayeflooring.com/sitemap.xml`

It now contains **14 URLs**:
- `/` (Home)
- `/services`
- `/gallery`
- `/about`
- `/testimonials`
- `/contact`
- `/villages-fl-flooring-installation`
- `/ocala`
- `/clermont`
- `/apopka`
- `/lady-lake`
- `/leesburg`
- `/citrus-county-flooring` ← new
- `/hernando-county-flooring` ← new

---

## Step 1 – Open Google Search Console

Go to: https://search.google.com/search-console

Sign in with the Google account that owns the kayeflooring.com property.

---

## Step 2 – Verify kayeflooring.com (if not already done)

If the domain isn't verified yet:
1. Click **"Add property"** → choose **"Domain"** → type `kayeflooring.com`
2. Copy the TXT record Google provides
3. Log in to your DNS host (GoDaddy, Namecheap, Cloudflare, etc.) and add that TXT record
4. Click **"Verify"** in Search Console — it can take a few minutes

---

## Step 3 – Submit the sitemap

1. In the left sidebar, click **"Sitemaps"** (under Index)
2. In the "Add a new sitemap" box, type: `sitemap.xml`
   (Search Console already knows your domain, so just the filename is enough)
3. Click **"Submit"**

> **If the sitemap was already submitted previously**, you may see it listed. Click the sitemap row, then click **"Resubmit"** — this tells Google to re-crawl and pick up the two new county pages.

---

## Step 4 – Confirm success

After submission, the Sitemaps report should show:
- URL: `https://kayeflooring.com/sitemap.xml`
- Status: **Success**
- Discovered URLs: **14**

If it shows fewer than 14, click the sitemap link to see which URLs were excluded and why.

---

## Step 5 – Request indexing for the two new pages immediately

Don't wait for Google to crawl on its own — use URL Inspection to request indexing for each new page right away:

1. In Google Search Console, click the **URL Inspection** tool (search bar at the top)
2. Paste: `https://kayeflooring.com/citrus-county-flooring`
3. Click **"Request Indexing"**
4. Repeat for: `https://kayeflooring.com/hernando-county-flooring`

> **Limit:** Google allows ~10 "Request Indexing" requests per day per property.

---

## robots.txt is already configured

The site's `robots.txt` already points Google to the sitemap automatically:

```
User-agent: *
Allow: /
Sitemap: https://kayeflooring.com/sitemap.xml
```

This means even without a manual submission, Google will eventually find it. The manual submission just speeds up the process from weeks to days.

---

## Step 6 – Monitor Indexing (1–2 weeks later)

After submitting, check back in 1–2 weeks to confirm all 14 URLs have been indexed by Google.

**→ Follow the Coverage Checklist:** [`gsc-coverage-checklist.md`](./gsc-coverage-checklist.md)

That checklist walks you through:
- Reading the Coverage/Pages report in Search Console
- What "Valid", "Excluded", and "Error" statuses mean
- How to request indexing for any slow pages
- A sign-off checklist for all 14 sitemap URLs
