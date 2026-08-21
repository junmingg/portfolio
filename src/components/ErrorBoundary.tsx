import { Component, type ReactNode } from "react";

/**
 * Catches render errors, chiefly a rejected `lazy()` import. Suspense does not
 * recover from those on its own: without a boundary above it, a failed chunk
 * fetch propagates to the root and React tears down the entire tree.
 *
 * The overwhelmingly common cause is a document that outlived a redeploy and is
 * asking for chunk names that no longer exist, so reloading is a real fix
 * rather than a gesture.
 *
 * Dismisses the boot overlay on the way through — otherwise a failure that
 * happens while the overlay is still up would leave it covering the fallback
 * this is trying to show.
 */
export class ErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: () => void;
    /**
     * Supplied when the caller can rebuild whatever failed — a fresh `lazy()`
     * instance, say. Without it the only remedy on offer is a full reload,
     * which is the wrong answer for a chunk that was merely slow.
     */
    onRetry?: () => void;
  },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    window.__bootHide?.();
    this.props.onError?.();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;

    const { onRetry } = this.props;
    return (
      <div className="px-6 py-28 text-center">
        <p className="text-muted-foreground">
          This part of the page didn&rsquo;t load.
        </p>
        <button
          type="button"
          onClick={() => {
            if (!onRetry) {
              window.location.reload();
              return;
            }
            // Clear our own failed state and let the owner build a fresh
            // instance; retrying the cached rejected promise would just throw
            // again on the next render.
            this.setState({ failed: false });
            onRetry();
          }}
          className="mt-4 rounded-full border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
        >
          {onRetry ? "Try again" : "Reload"}
        </button>
      </div>
    );
  }
}
