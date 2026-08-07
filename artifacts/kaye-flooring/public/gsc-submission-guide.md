# Google Search Console – Sitemap Submission Guide

## Sitemap is ready at:
`https://kayeflooring.com/sitemap.xml`

It contains **10 URLs**:
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

---

## Step 4 – Confirm success

After submission, the Sitemaps report should show:
- URL: `https://kayeflooring.com/sitemap.xml`
- Status: **Success**
- Discovered URLs: **10**

If it shows fewer than 10, click the sitemap link to see which URLs were excluded and why.

---

## robots.txt is already configured

The site's `robots.txt` already points Google to the sitemap automatically:

```
User-agent: *
Allow: /
Sitemap: https://kayeflooring.com/sitemap.xml
```

This means even without a manual submission, Google will eventually find it. The manual submission just speeds up the process from weeks to days.
