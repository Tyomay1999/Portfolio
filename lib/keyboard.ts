type KeyboardState = {
  open: boolean;
  height: number;
};

let state: KeyboardState = { open: false, height: 0 };
let initialized = false;
let resizeTimer: number | undefined;
const listeners = new Set<(s: KeyboardState) => void>();

const isMobileUA = () => /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

const emit = () => listeners.forEach(fn => fn({ ...state }));

const computeState = () => {
  const vv: VisualViewport | undefined | null = window?.visualViewport;

  const height = vv?.height ?? window.innerHeight;
  const diff =
    (vv ? window.innerHeight - height : 0) || (screen?.height ? screen.height - height : 0);

  const SHRINK_THRESHOLD = 150;

  const active = document.activeElement as HTMLElement | null;
  const hasTextFocus =
    (!!active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) ||
    active?.getAttribute('contenteditable') === 'true';

  const looksShrunk = diff > SHRINK_THRESHOLD;

  const open = isMobileUA() && (looksShrunk || hasTextFocus);

  state = { open, height: Math.max(0, Math.round(diff)) };
  emit();
};

const onResize = () => {
  if (resizeTimer) window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(computeState, 50);
};

export function initKeyboardWatcher() {
  if (initialized) return;
  initialized = true;

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize);
    window.visualViewport.addEventListener('scroll', onResize); // iOS двигает vv.scroll
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  window.addEventListener('focusin', computeState);
  window.addEventListener('focusout', () => window.setTimeout(computeState, 150));

  computeState();
}

export function isKeyboardOpen(): boolean {
  return state.open;
}

export const isKeyboardOpenNow = isKeyboardOpen;

export function onKeyboardChange(fn: (s: KeyboardState) => void): () => void {
  listeners.add(fn);
  fn({ ...state });
  return () => {
    listeners.delete(fn);
  };
}

export function destroyKeyboardWatcher() {
  if (!initialized) return;
  initialized = false;

  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', onResize);
    window.visualViewport.removeEventListener('scroll', onResize);
  }
  window.removeEventListener('resize', onResize);
  window.removeEventListener('orientationchange', onResize);
  window.removeEventListener('focusin', computeState);
  listeners.clear();
  if (resizeTimer) window.clearTimeout(resizeTimer);
}
