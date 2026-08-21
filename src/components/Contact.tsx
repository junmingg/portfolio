import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { contact, site, socials } from "@/data/site";
import { TelegramIcon } from "./icons/TelegramIcon";
import { Reveal } from "./Reveal";
import { Button } from "./ui/button";

// Direct reach-me tiles shown under the form (distinct from the social links).
const directContacts = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "Telegram",
    value: "@gymmingg",
    href: "https://t.me/gymmingg",
    icon: TelegramIcon,
  },
];

// Minimal typing for the Turnstile script injected by loadTurnstile().
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement | string,
        opts: Record<string, unknown>,
      ) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Injected when the contact form mounts rather than sitting in index.html, so
// visitors who never reach the form never pay for it. Memoised at module scope
// because React 18 StrictMode mounts effects twice in development.
const LOAD_TIMEOUT_MS = 10000;

let turnstileLoader: Promise<void> | undefined;
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  turnstileLoader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    // A request can hang indefinitely behind a captive portal, a filtering
    // proxy, or a blocking extension: neither onload nor onerror ever fires, so
    // without this the promise never settles and the form sits in a permanent
    // pending state that looks like the widget is merely slow.
    const timer = setTimeout(() => {
      script.remove();
      turnstileLoader = undefined;
      reject(new Error("Turnstile script timed out"));
    }, LOAD_TIMEOUT_MS);

    script.src = TURNSTILE_SRC;
    script.async = true;
    script.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      turnstileLoader = undefined; // allow a retry on remount
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return turnstileLoader;
}

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [company, setCompany] = React.useState(""); // honeypot
  const [token, setToken] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  // Verification failure is tracked separately from submission failure: they
  // have different causes, different remedies, and different lifetimes. Sharing
  // one `status` meant a widget that recovered still showed "unavailable" while
  // happily accepting the new token.
  const [verifyError, setVerifyError] = React.useState("");

  const widgetRef = React.useRef<HTMLDivElement>(null);
  const widgetId = React.useRef<string>();

  // Fetch the Turnstile script, then render the widget explicitly.
  React.useEffect(() => {
    let cancelled = false;
    // Turnstile fires error-callback for transient conditions as well as
    // terminal ones, so one automatic retry comes first and only a second
    // failure is treated as terminal. Guessing at Cloudflare's error-code
    // taxonomy would be worse than counting.
    let errors = 0;

    const failed = () => {
      if (cancelled) return;
      setVerifyError(
        `Verification is unavailable right now. Try reloading the page, or email me directly at ${site.email}.`
      );
    };

    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetRef.current) return;
        // onload firing is not proof the API installed itself — a blocked or
        // truncated script can resolve without defining `turnstile`.
        if (!window.turnstile) {
          failed();
          return;
        }
        widgetId.current = window.turnstile.render(widgetRef.current, {
          sitekey: contact.turnstileSiteKey,
          theme: "auto",
          callback: (t: string) => {
            // Recovery: clear the verification error, but leave any submission
            // error alone — that one is about a different failure entirely.
            errors = 0;
            setVerifyError("");
            setToken(t);
          },
          "error-callback": () => {
            setToken("");
            if (cancelled) return;
            if (++errors === 1 && widgetId.current && window.turnstile) {
              window.turnstile.reset(widgetId.current);
              return;
            }
            failed();
          },
          "expired-callback": () => setToken(""),
        });
      })
      .catch(failed);
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!token) {
      setVerifyError(
        verifyError
          ? `Verification is unavailable, so the form can’t be sent. Please email me directly at ${site.email}.`
          : "Please complete the verification below."
      );
      return;
    }

    setStatus("submitting");
    setError("");
    setVerifyError("");

    try {
      const res = await fetch(contact.workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company, // honeypot — empty for real users
          turnstileToken: token,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please try again in a moment.");
    } finally {
      // Turnstile tokens are single-use — reset the widget for another attempt.
      setToken("");
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
      }
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/15 disabled:opacity-60";

  return (
    <div className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[var(--radius-card)] px-8 py-16 sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]"
              style={{ background: "var(--glow-a)" }}
            />

            <div className="text-center">
              <p className="text-mono-label mb-5">Let's talk</p>
              <h2 className="mx-auto max-w-2xl text-balance text-4xl leading-[1.05] sm:text-6xl">
                Have a role or an idea worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
                I'm open to Data Science &amp; ML opportunities and the
                occasional good problem. Drop me a message below.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-6 py-10 text-center"
              >
                <CheckCircle2 className="size-8 text-accent" />
                <p className="text-lg font-medium">Message sent</p>
                <p className="text-sm text-muted-foreground">
                  I'll respond to your email at my earliest convenience.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative mx-auto mt-10 max-w-xl space-y-4 text-left"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-mono-label mb-2 block"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "submitting"}
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-mono-label mb-2 block"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "submitting"}
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-mono-label mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "submitting"}
                    className={`${inputClasses} resize-y`}
                    placeholder="Tell me about the role or idea…"
                  />
                </div>

                {/* Honeypot — hidden from real users, catches naive bots. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {/* Turnstile widget renders here */}
                <div ref={widgetRef} className="min-h-[65px] pt-1" />

                {verifyError && (
                  <p
                    role="status"
                    className="flex items-center gap-2 text-sm text-red-500"
                  >
                    <AlertCircle className="size-4 shrink-0" />
                    {verifyError}
                  </p>
                )}

                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="size-4 shrink-0" />
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Direct reach-me tiles */}
            <div className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
              {directContacts.map(({ label, value, href, icon: Icon }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-mono-label block">{label}</span>
                      <span className="block truncate text-sm text-foreground">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>

            {/* Social links — lighter pill chips, secondary to the tiles above */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-accent/40 hover:text-foreground"
                >
                  <Icon className="size-4 transition-colors group-hover:text-accent" />
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
