interface Window {
  /**
   * Dismisses the boot overlay painted by index.html. Defined there rather than
   * here so the overlay can leave even if this bundle fails to load.
   */
  __bootHide?: () => void;
}
