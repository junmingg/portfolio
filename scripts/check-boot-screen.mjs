// Guards the one thing that makes the boot overlay worth having: it must paint
// from the HTML alone, before the bundle or the webfonts arrive. If it drifts
// back into a React component the overlay stops covering the download and
// starts being added to it. Run against dist/ after a build.
import { readFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const head = html.slice(0, html.indexOf("</head>"));
const at = (needle) => html.indexOf(needle);

const checks = [
  ["boot markup is in the document", at('id="boot"') !== -1],
  ["boot markup precedes #root", at('id="boot"') < at('id="root"')],
  ["boot styles are inlined in head", at("#boot {") !== -1 && at("#boot {") < head.length],
  ["theme class is set before boot paints", at("portfolio-theme") < at('id="boot"')],
  ["teardown is defined in the HTML, not the bundle", at("__bootHide") !== -1],
  // The failsafe is the difference between "the site failed" and "the site is
  // still loading, forever". If the bundle never runs, this is what lifts the
  // overlay, so it must not drift back into React.
  ["failsafe timeout is inlined", /setTimeout\(\s*window\.__bootHide/.test(html)],
  // Needs no script execution, so it covers the failures the timeout above
  // cannot: a CSP without 'unsafe-inline', a parse error in the block itself.
  ["css-only failsafe is present", /@keyframes\s+boot-failsafe/.test(html) && /animation:\s*boot-failsafe/.test(html)],
  // A module script is deferred, so it cannot block the boot paint no matter
  // where Vite hoists it. A plain blocking script in head would.
  ["app script is deferred", /<script type="module"[^>]*src="[^"]*"/.test(head)],
  ["no blocking third-party script in head", !/turnstile/i.test(head)],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
