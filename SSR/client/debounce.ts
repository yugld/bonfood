export default function debounce<
  T,
  F extends (...params: T[]) => ReturnType<F>,
>(fn: F, delay: number): F {
  let timeoutID: NodeJS.Timeout;
  return function (...args: T[]) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.apply(globalThis, args), delay);
  } as F;
}
