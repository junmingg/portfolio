# GitHub Pages → Cloudflare

Notes for moving `chenjunming.com` off GitHub Pages and keeping the old
`junmingg.github.io/portfolio/` URL pointing at the new site.

> The target is Cloudflare **Workers static assets** (Cloudflare's recommended
> successor to Pages). Everything below applies equally to Cloudflare Pages.

## Starting state (2026-09-25)

- DNS for `chenjunming.com` is already on Cloudflare (`donna`/`owen.ns.cloudflare.com`).
  Apex A records point at GitHub Pages IPs (`185.199.108–111.153`), DNS-only.
- `https://junmingg.github.io/portfolio/` → `301 https://chenjunming.com/`
  (GitHub does this automatically because a custom domain is set).
- `http://`, `www.` → `301 https://chenjunming.com/` (GitHub Pages "Enforce HTTPS").

## Keeping the github.io redirect — Option 1 (chosen)

Leave GitHub Pages enabled with the custom domain still set. GitHub keeps
issuing the 301 from `junmingg.github.io/portfolio/` to `chenjunming.com`,
while Cloudflare serves the real site.

Steps, done at cut-over:

1. Point `chenjunming.com` at Cloudflare (custom domain on the Worker/Pages project).
2. Repo → Settings → Pages: **do not** remove `chenjunming.com`. Ignore the
   DNS check warning that will appear.
3. Stop the Pages workflow from deploying: delete `.github/workflows/deploy-pages.yml`
   (or remove its `push` trigger). The last deployment stays live.

Side benefit: the domain stays claimed by this repo, so no one else can
attach it to their GitHub Pages site.

### How to tell Option 1 stopped working

```sh
curl -sI https://junmingg.github.io/portfolio/ | grep -iE '^(HTTP|location)'
```

Healthy: `HTTP/1.1 301` + `Location: https://chenjunming.com/`.
Broken: a `404`, or no `Location` header. Also check whether Settings → Pages
still lists the custom domain. Keeping it is undocumented behaviour, so GitHub
could drop it after failed DNS checks.

## Option 2 — fallback if GitHub drops the redirect

Serve a tiny redirect site from GitHub Pages instead. It's not a true 301,
because Pages can't send one from files, but browsers follow it instantly and
Google treats meta-refresh + canonical as a permanent move.

1. Settings → Pages: remove the custom domain (if still set).
2. Create `gh-redirect/index.html` and `gh-redirect/404.html` with identical
   content. `404.html` catches deep links like `/portfolio/resume.pdf`:

   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>Moved to chenjunming.com</title>
       <link rel="canonical" href="https://chenjunming.com/" />
       <meta name="robots" content="noindex" />
       <meta http-equiv="refresh" content="0; url=https://chenjunming.com/" />
       <script>
         // Keep the path/query/hash, minus the /portfolio project prefix.
         var p = location.pathname.replace(/^\/portfolio/, "") || "/";
         location.replace("https://chenjunming.com" + p + location.search + location.hash);
       </script>
     </head>
     <body>
       <p>Moved to <a href="https://chenjunming.com/">chenjunming.com</a>.</p>
     </body>
   </html>
   ```

3. Replace `.github/workflows/deploy-pages.yml` so it publishes that folder
   instead of building the site:

   ```yaml
   name: Deploy GitHub Pages redirect
   on:
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: gh-redirect
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

4. Run it once from the Actions tab, then verify:

   ```sh
   curl -s https://junmingg.github.io/portfolio/ | grep -i refresh
   ```

   and open `https://junmingg.github.io/portfolio/resume.pdf` in a browser.
   It should land on `https://chenjunming.com/resume.pdf`.
