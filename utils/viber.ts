const normalizePhone = (raw: string) =>
  raw
    .trim()
    .replace(/[^\d+]/g, '')
    .replace(/^00/, '+');

const isAndroid = () => /android/i.test(navigator.userAgent);
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isMobile = () => /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

export function openViberChat(
  raw: string,
  opts?: {
    onFallbackCopy?: (copiedValue: string) => void;
    onFallbackNavigate?: () => void;
    fallbackDownloadUrl?: string;
    timeoutMs?: number;
  },
) {
  const {
    onFallbackCopy,
    onFallbackNavigate,
    fallbackDownloadUrl = 'https://www.viber.com/download/',
    timeoutMs = 900,
  } = opts || {};
  if (!raw) return;

  const intl = normalizePhone(raw);
  const encoded = encodeURIComponent(intl);
  const viberUrl = `viber://chat?number=${encoded}`;

  const start = Date.now();
  let didHide = false;

  const handleFail = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      onFallbackCopy?.(raw);
    } catch {}
    if (fallbackDownloadUrl) {
      if (!isMobile()) window.open(fallbackDownloadUrl, '_blank', 'noopener,noreferrer');
    }
    onFallbackNavigate?.();
  };

  const onVis = () => {
    if (document.hidden) didHide = true;
  };
  document.addEventListener('visibilitychange', onVis, { once: true });

  if (isIOS()) {
    window.location.href = viberUrl;
    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', onVis);
      if (!didHide && Date.now() - start < timeoutMs + 100) handleFail();
    }, timeoutMs);
    return;
  }

  if (isAndroid()) {
    window.location.href = viberUrl;

    window.setTimeout(() => {
      if (didHide) return;
      const intent = `intent://chat?number=${encoded}#Intent;scheme=viber;package=com.viber.voip;end`;
      window.location.href = intent;

      window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onVis);
        if (!didHide) handleFail();
      }, 500);
    }, timeoutMs);
    return;
  }

  window.location.href = viberUrl;

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onVis);
    if (!didHide) handleFail();
  }, timeoutMs);
}
