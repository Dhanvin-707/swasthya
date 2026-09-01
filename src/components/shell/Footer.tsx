export function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-card py-4">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted">
        Swasthya AI • National Digital Health Stack — Unified Healthcare Ecosystem for Rural &amp;
        Underserved Communities
      </p>
    </footer>
  );
}

export function DemoNotice() {
  return (
    <p role="note" className="bg-warn-soft px-4 py-1.5 text-center text-xs font-semibold text-warn">
      Demo data only — not for real medical decisions. For emergencies call 108 or 112.
    </p>
  );
}
