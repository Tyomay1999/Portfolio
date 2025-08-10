type KeyboardState = {
  open: boolean;
  height: number;
};

let state: KeyboardState = { open: false, height: 0 };
let initialized = false;
const listeners = new Set<(s: KeyboardState) => void>();

const isMobileUA = () =>
  /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

const emit = () => listeners.forEach(fn => fn({ ...state }));

const computeState = () => {
  const vv = (window as any).visualViewport as VisualViewport | undefined;

  const height = vv?.height ?? window.innerHeight;
  const full = vv?.height ? vv.height + (vv.offsetTop ?? 0) : window.innerHeight;
  const diff = (vv ? window.innerHeight - height : 0) || (screen?.height ? screen.height - height : 0);

  const SHRINK_THRESHOLD = 150;

  const active = document.activeElement as HTMLElement | null;
  const hasTextFocus =
    (!!active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) ||
    (active?.getAttribute?.('contenteditable') === 'true');

  const looksShrunk = diff > SHRINK_THRESHOLD;

  const open = isMobileUA() && (looksShrunk || hasTextFocus);

  state = { open, height: Math.max(0, diff) };
  emit();
};

const onResize = () => {
  clearTimeout((onResize as any)._t);
  (onResize as any)._t = setTimeout(computeState, 50);
};

export function initKeyboardWatcher() {
  if (initialized) return;
  initialized = true;

  if ('visualViewport' in window) {
    visualViewport!.addEventListener('resize', onResize);
    visualViewport!.addEventListener('scroll', onResize);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  window.addEventListener('focusin', computeState);
  window.addEventListener('focusout', () => setTimeout(computeState, 150));

  computeState();
}

export function isKeyboardOpen(): boolean {
  return state.open;
}

export const isKeyboardOpenNow = isKeyboardOpen;

export function onKeyboardChange(fn: (s: KeyboardState) => void) {
  listeners.add(fn);
  fn({ ...state });
  return () => listeners.delete(fn);
}

export function destroyKeyboardWatcher() {
  if (!initialized) return;
  initialized = false;

  if ('visualViewport' in window) {
    visualViewport!.removeEventListener('resize', onResize);
    visualViewport!.removeEventListener('scroll', onResize);
  }
  window.removeEventListener('resize', onResize);
  window.removeEventListener('orientationchange', onResize);
  window.removeEventListener('focusin', computeState);
  window.removeEventListener('focusout', computeState);
  listeners.clear();
}
