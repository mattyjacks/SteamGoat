'use client';

export function trackEvent(eventName: string, properties?: Record<string, string>) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, properties);
    }

    console.log(`[SteamGOAT Analytics] ${eventName}`, properties || '');
  } catch {
    // Silently fail if analytics not configured
  }
}

export function trackCapabilityDownload() {
  trackEvent('capability_statement_download', {
    event_category: 'engagement',
    event_label: 'capability_statement',
  });
}

export function trackGovInquiry(email: string) {
  const isGovEmail = email.endsWith('.gov') || email.endsWith('.mil');
  trackEvent('contact_inquiry', {
    event_category: 'lead',
    event_label: isGovEmail ? 'gov_email' : 'commercial_email',
    is_gov: isGovEmail ? 'true' : 'false',
  });
}

export function trackNavigation(destination: string) {
  trackEvent('navigation', {
    event_category: 'navigation',
    event_label: destination,
  });
}
