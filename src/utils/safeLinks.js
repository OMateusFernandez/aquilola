const allowedProtocols = new Set(['http:', 'https:', 'mailto:']);

export function getSafeLinkProps(href) {
  if (!href || href.startsWith('#')) {
    return { href: href || '#' };
  }

  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mateusfernandez.local';
    const parsed = new URL(href, origin);

    if (!allowedProtocols.has(parsed.protocol)) {
      return { href: '#' };
    }

    if (parsed.protocol === 'mailto:') {
      return { href: parsed.href };
    }

    const isExternal = parsed.origin !== origin;

    return {
      href: parsed.href,
      ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    };
  } catch {
    return { href: '#' };
  }
}
