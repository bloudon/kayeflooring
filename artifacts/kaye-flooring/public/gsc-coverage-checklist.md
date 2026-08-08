# Google Search Console – Coverage & Indexing Checklist

Use this checklist after submitting the sitemap to confirm Google has indexed all 14 pages.

---

## ⏰ Reminder Schedule

| When | What to check |
|------|---------------|
| **Immediately after submission** | Use URL Inspection to request indexing for the 2 new county pages |
| **1 week after submission** | Open Coverage report — confirm status shows "Success", check for Errors |
| **2 weeks after submission** | Verify all 14 URLs are "Valid"; investigate any "Excluded" entries |
| **Monthly (ongoing)** | Spot-check new city pages rank in search; re-check if new pages are added |

> **Set a calendar reminder now** for 1 week and 2 weeks from today so you don't forget.

---

## Step 1 – Open the Coverage Report

1. Go to: https://search.google.com/search-console
2. Sign in and select the **kayeflooring.com** property
3. In the left sidebar, click **"Pages"** (under Indexing)

---

## Step 2 – Check the Sitemap Status

1. In the left sidebar, click **"Sitemaps"** (under Indexing)
2. Find `https://kayeflooring.com/sitemap.xml`
3. Confirm:
   - **Status:** Success ✅
   - **Discovered URLs:** 14

If it shows fewer than 14, click the sitemap link to see which URLs were excluded.

---

## Step 3 – Review the Coverage Report

In the **Pages** report, look at each status tab:

### ✅ "Valid" — Good
All pages listed here are indexed and eligible to appear in Google search results.

**Goal:** All 14 of these URLs should eventually appear as Valid:
- `https://kayeflooring.com/`
- `https://kayeflooring.com/services`
- `https://kayeflooring.com/gallery`
- `https://kayeflooring.com/about`
- `https://kayeflooring.com/testimonials`
- `https://kayeflooring.com/contact`
- `https://kayeflooring.com/villages-fl-flooring-installation`
- `https://kayeflooring.com/ocala`
- `https://kayeflooring.com/clermont`
- `https://kayeflooring.com/apopka`
- `https://kayeflooring.com/lady-lake`
- `https://kayeflooring.com/leesburg`
- `https://kayeflooring.com/citrus-county-flooring` ← new
- `https://kayeflooring.com/hernando-county-flooring` ← new

---

### ⚠️ "Excluded" — Investigate

Excluded pages are not indexed. Common reasons and fixes:

| Reason | What it means | Fix |
|--------|---------------|-----|
| **"Crawled – currently not indexed"** | Google visited but chose not to index | Wait 1–2 more weeks; check page has real content |
| **"Discovered – currently not indexed"** | Google found it but hasn't crawled yet | Wait; use "Request Indexing" (see Step 4) |
| **"Duplicate without canonical tag"** | Google thinks another URL is the main version | Add `<link rel="canonical">` tag to the page |
| **"Blocked by robots.txt"** | robots.txt is preventing crawl | Check `https://kayeflooring.com/robots.txt` |
| **"Redirect error"** | Page redirects in a loop or to a broken URL | Fix the redirect chain |

---

### ❌ "Error" — Fix Immediately

Error pages are actively broken. Common errors:

| Error | Fix |
|-------|-----|
| **404 Not Found** | Page doesn't exist — ensure the route is deployed |
| **Server error (5xx)** | The server is returning errors — check hosting/server logs |

---

## Step 4 – Request Indexing for Slow Pages

If a specific page hasn't been indexed after 2 weeks:

1. In Google Search Console, click the **URL Inspection** tool (top search bar)
2. Paste the full URL (e.g. `https://kayeflooring.com/citrus-county-flooring`)
3. Click **"Request Indexing"**

This asks Google to prioritize crawling that specific page. You can do this for each of the 14 URLs if needed.

> **Limit:** Google allows ~10 "Request Indexing" requests per day per property.

---

## Step 5 – Confirm All 14 Pages Are Valid ✅

Once all 14 URLs appear in the "Valid" tab, the indexing task is complete.

Check them off here:

- [ ] `https://kayeflooring.com/`
- [ ] `https://kayeflooring.com/services`
- [ ] `https://kayeflooring.com/gallery`
- [ ] `https://kayeflooring.com/about`
- [ ] `https://kayeflooring.com/testimonials`
- [ ] `https://kayeflooring.com/contact`
- [ ] `https://kayeflooring.com/villages-fl-flooring-installation`
- [ ] `https://kayeflooring.com/ocala`
- [ ] `https://kayeflooring.com/clermont`
- [ ] `https://kayeflooring.com/apopka`
- [ ] `https://kayeflooring.com/lady-lake`
- [ ] `https://kayeflooring.com/leesburg`
- [ ] `https://kayeflooring.com/citrus-county-flooring` ← new
- [ ] `https://kayeflooring.com/hernando-county-flooring` ← new

---

## Quick Reference – Newest Pages to Watch Closely

These are the most recent pages and the most important to confirm indexed:

| Page | URL | Target Searches |
|------|-----|-----------------|
| Citrus County | `/citrus-county-flooring` | "flooring Crystal River FL", "hardwood floors Citrus County", "flooring Inverness FL" |
| Hernando County | `/hernando-county-flooring` | "flooring Brooksville FL", "hardwood floors Hernando County", "flooring Spring Hill FL" |
| Lady Lake | `/lady-lake` | "flooring Lady Lake FL", "hardwood floors Lady Lake" |
| Leesburg | `/leesburg` | "flooring Leesburg FL", "flooring installer Leesburg" |

Once indexed, you can verify ranking by searching Google for these terms and looking for kayeflooring.com in the results.
