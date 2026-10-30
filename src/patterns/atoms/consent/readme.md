# Consent

A small bottom-left banner that asks once to allow anonymous statistics. It appears only when Google Analytics is on the page (production build with a measurement ID) and the visitor has not answered yet. The answer is stored in `localStorage` (`analytics-consent`) and passed to Consent Mode (`analytics_storage`).

Data: `text` (optional).
