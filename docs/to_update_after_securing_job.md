# To update after securing a job

Places on the site that say "open to roles", plus where the new job needs to go.

## "Open to roles" copy

- [ ] `src/components/Hero.tsx`: the "Open to AI / ML Engineering roles"
      label (with the pulsing dot). Replace it with e.g. "Building at <company>", or remove it.
- [ ] `src/components/Contact.tsx`: "I'm open to AI / ML engineering
      opportunities and the occasional good problem." Soften it to e.g. "Always happy
      to hear about a good problem." The heading "Have a role or an idea worth building?"
      can stay or lose the "role" part.

## New job details

- [ ] `src/data/experience.ts`: add the new role, and set an end date on the current one.
- [ ] `src/data/site.ts`: in `about[1]`, the "Right now I'm a Software Engineer at
      Modular Asset Management…" sentence.
- [ ] `index.html`: in the meta `description`, the "Experience at Modular Asset
      Management, …" list.
- [ ] `public/resume.pdf`: replace it with the updated resume.

## Social preview image (og-image)

Source: `scripts/og-image/og.html`. The current image is variant `#a`, which has the
"Open to AI / ML roles" label.

1. Pick one:
   - **Keep A:** edit the `.label` line under `#a` in `og.html`
     (e.g. `Building at <company>`), or delete it.
   - **Switch to B** (terminal window, no photo): render `#b` instead of `#a`.
2. Render it under a **new filename** so LinkedIn/Slack/X don't keep serving
   the cached image (from the repo root, Git Bash):

   ```sh
   "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --hide-scrollbars \
     --window-size=1200,630 --virtual-time-budget=8000 \
     --screenshot="$(pwd -W)/public/og-image-v2.png" "file:///$(pwd -W)/scripts/og-image/og.html#a"
   ```

3. In `index.html`, point `og:image` at `https://chenjunming.com/og-image-v2.png`
   and delete the old `public/og-image.png`.
4. After deploying, paste `https://chenjunming.com` into
   <https://www.linkedin.com/post-inspector/> to refresh LinkedIn's cache.
   Check other platforms with <https://www.opengraph.xyz/>.
