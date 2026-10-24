import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/**
 * `false` during SSR and the first client render, `true` once hydrated.
 * Gates client-only work (portals, `window` reads) without a `setState` inside
 * an effect, so it stays hydration-safe and React-Compiler-clean.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
