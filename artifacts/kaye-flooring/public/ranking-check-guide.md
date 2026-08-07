# Ranking Check Guide — Ocala, Clermont & Apopka City Pages

Use this guide to check where kayeflooring.com appears in Google results for each city, see
how the pages are performing in Search Console, and act on the recommendations below if the
pages are not yet on page 1.

---

## Part 1 — Google Search Check (Do This Manually)

Open an **incognito/private browser window** (this removes personalisation from your results)
and search Google for each term. Record the page and position where kayeflooring.com appears.

| Search term | What to look for | Expected timeline |
|---|---|---|
| `flooring Ocala FL` | kayeflooring.com/ocala | 8–16 weeks after indexing |
| `hardwood floors Ocala` | kayeflooring.com/ocala | 8–16 weeks after indexing |
| `flooring installer Ocala FL` | kayeflooring.com/ocala | 8–16 weeks after indexing |
| `flooring Clermont FL` | kayeflooring.com/clermont | 8–16 weeks after indexing |
| `flooring installer Clermont` | kayeflooring.com/clermont | 8–16 weeks after indexing |
| `flooring Apopka FL` | kayeflooring.com/apopka | 8–16 weeks after indexing |
| `hardwood floors Apopka` | kayeflooring.com/apopka | 8–16 weeks after indexing |

> **Important:** These pages were published on 2026-08-07. New pages from a low-authority
> domain typically take 8–16 weeks to appear on page 1. Checking before that window
> often shows nothing — that is normal, not a problem.

**How to record your results:**

| Date checked | Search term | Page # | Position | Notes |
|---|---|---|---|---|
| | `flooring Ocala FL` | | | |
| | `flooring Clermont FL` | | | |
| | `flooring Apopka FL` | | | |
| | `hardwood floors Ocala` | | | |
| | `flooring installer Clermont` | | | |
| | `hardwood floors Apopka` | | | |

---

## Part 2 — Google Search Console Performance Report

### Step-by-step

1. Go to https://search.google.com/search-console
2. Select the **kayeflooring.com** property
3. In the left sidebar, click **"Performance"** → **"Search results"**
4. Set the date range to **Last 3 months** (or the full period since launch)
5. Click **"Pages"** tab at the bottom of the report
6. Look for each city page URL in the list:
   - `https://kayeflooring.com/ocala`
   - `https://kayeflooring.com/clermont`
   - `https://kayeflooring.com/apopka`

### What the numbers mean

| Column | What it tells you | What's a healthy sign |
|---|---|---|
| **Clicks** | People who clicked through to the site | Any clicks = page is ranking somewhere |
| **Impressions** | Times the page appeared in any result | Impressions before clicks = ranking low, need improvement |
| **CTR** | Click-through rate | Above 3% is solid for local service pages |
| **Position** | Average ranking position | Under 10 = page 1; under 20 = page 2 |

### Drilling into a specific city page

1. Click the city page URL in the Pages table
2. Then click the **"Queries"** tab
3. This shows exactly which search terms are triggering impressions for that page
4. Sort by **Impressions** descending — the top queries tell you what Google thinks the page is about

---

## Part 3 — What to Do If Pages Are Not on Page 1

### Understand the baseline first

Before making changes, check:
- Are the pages **indexed** at all? (See `gsc-coverage-checklist.md`)
- Are there **any impressions** in the Performance report?
  - Zero impressions = not indexed or not crawled yet → wait
  - Impressions but no clicks = ranking pages 2–5 → content improvements will help
  - Clicks but low position = good, focus on CTR and deeper content

---

### Content improvements — by priority

These are ranked by impact. Address them in order.

---

#### Priority 1 — Add meta description tags ⚡ HIGH IMPACT

**Problem:** The city pages set the page `<title>` tag in JavaScript but do not set a
`<meta name="description">` tag. Without a meta description, Google writes its own snippet
from whatever text it finds on the page — often a poor result that hurts click-through rate.

**Fix:** In each city page component (`Ocala.tsx`, `Clermont.tsx`, `Apopka.tsx`), add a
`<meta name="description">` tag inside the `useEffect` block, the same way `document.title`
is already being set.

Suggested descriptions:

- **Ocala:** `Kaye Flooring Inc installs hardwood and luxury vinyl plank flooring in Ocala, FL and Marion County. Family-owned, fully licensed. Free in-home estimates — call (352) 988-4006.`
- **Clermont:** `Kaye Flooring Inc installs hardwood and luxury vinyl plank flooring in Clermont, FL and Lake County. Family-owned, fully licensed. Free in-home estimates — call (352) 988-4006.`
- **Apopka:** `Kaye Flooring Inc installs hardwood and luxury vinyl plank flooring in Apopka, FL and northwest Orange County. Family-owned, fully licensed. Free in-home estimates — call (352) 988-4006.`

---

#### Priority 2 — Add internal links from the homepage and services page ⚡ HIGH IMPACT

**Problem:** Google follows links to discover and re-evaluate pages. If the city pages are
only reachable from the site's navigation, they receive very little "link authority" from the
rest of the site. Adding contextual links from high-traffic pages signals that the city pages
are important.

**Fix:** On the homepage (`Home.tsx`) and the services page, add a short paragraph or a
"Service areas" section that links directly to each city page with descriptive anchor text:

> We serve homeowners across Central Florida, including  
> [Ocala & Marion County](/ocala), [Clermont & Lake County](/clermont),  
> and [Apopka & Orange County](/apopka).

The anchor text (the visible words in the link) should describe the destination, not just say
"click here."

---

#### Priority 3 — Add a review count and city-specific testimonials ⚡ MEDIUM IMPACT

**Problem:** The structured data on each page claims `"reviewCount": "47"` but the reviews
shown in the testimonial section are generic and some are from other cities (e.g., the
Clermont page shows a Winter Garden testimonial). Google cross-references review claims with
the content of the page. Mismatches weaken trust signals.

**Fix:**
- Use only reviews from (or clearly relevant to) each city on that city's page
- Consider adding a third review to each city page so the testimonial section feels fuller
- Ensure the `reviewCount` in the structured data matches or is close to the actual number of
  Google reviews on the Business Profile

---

#### Priority 4 — Expand the "why" content with more specific local detail MEDIUM IMPACT

**Problem:** All three city pages follow an identical structure with largely interchangeable
body copy. Google's quality guidelines favor unique, genuinely useful content over templated
pages. As these pages age, differentiated content will help them pull ahead of competitors
with similar templates.

**Fix:** For each city, add one additional paragraph that mentions something specific and
local. Examples:

- **Ocala:** Reference the equestrian community, the growth along SR-200, or specific
  developments like Stone Creek or On Top of the World. Mention that many Ocala homes are
  on slab foundations and what that means for flooring selection.
- **Clermont:** Reference the rolling hills and the chain of lakes (unusual for Florida),
  mention the SR-50 corridor growth, and note that many Clermont homes are in newer
  developments with builder-grade subfloors that benefit from professional prep.
- **Apopka:** Reference the transformation from the "Indoor Foliage Capital" agricultural
  roots, the Rock Springs area, and the SR-429 expansion driving residential growth in
  northwest Orange County.

---

#### Priority 5 — Build a few local citations LOW IMPACT (but builds over time)

**Problem:** Google uses mentions of a business's name, address, and phone number (NAP) on
other websites to confirm it is a real local business serving the area.

**Fix:** Submit kayeflooring.com to these free local directories. Use the exact same business
name, address, and phone number on each:

| Directory | URL |
|---|---|
| Google Business Profile | https://business.google.com |
| Yelp for Business | https://biz.yelp.com |
| Angi (formerly Angie's List) | https://www.angi.com/pro |
| HomeAdvisor | https://www.homeadvisor.com/contractor |
| Houzz | https://www.houzz.com/professionals |
| Better Business Bureau | https://www.bbb.org |
| Nextdoor | https://business.nextdoor.com |

---

## Summary — What to Check and When

| When | Action |
|---|---|
| **Now (August 2026)** | Confirm pages are indexed (see `gsc-coverage-checklist.md`). Add meta descriptions (Priority 1). Add internal links (Priority 2). |
| **4 weeks after launch** | Open GSC Performance → check for any impressions on the city pages |
| **8 weeks after launch** | First Google search check. Record position. If impressions exist but position > 20, implement Priority 3 and 4 improvements. |
| **12 weeks after launch** | Second search check. Compare to the 8-week baseline. |
| **16 weeks after launch** | Full review. If pages are not on page 1, consider adding blog content targeting the city keywords (e.g., "Best flooring for Florida humidity"). |
| **Monthly ongoing** | Spot-check GSC Performance for new search queries driving impressions. |
