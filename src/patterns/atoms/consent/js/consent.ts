// Asks once for analytics consent and passes the answer to Google's Consent Mode.
type Gtag = (...args: unknown[]) => void;

const read = () => { try { return localStorage.getItem('analytics-consent'); } catch { return 'denied'; } };
const write = (value: string) => { try { localStorage.setItem('analytics-consent', value); } catch { /* private mode */ } };

document.querySelectorAll<HTMLElement>('.js-consent').forEach((banner) => {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  // Without analytics on the page (local development, no ID) there is nothing to ask.
  if (!gtag || read()) return;
  banner.hidden = false;
  banner.querySelectorAll<HTMLButtonElement>('[data-consent]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.consent ?? 'denied';
      write(value);
      gtag('consent', 'update', { analytics_storage: value });
      banner.hidden = true;
    });
  });
});
