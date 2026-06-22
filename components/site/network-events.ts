/**
 * Shared constant for the network-map "focus a location" event. It lives in its
 * own tiny module so lightweight consumers (e.g. CrossingChips) can dispatch the
 * event WITHOUT statically importing the heavy NetworkMap component — which is
 * lazy-loaded (next/dynamic) to keep its ~770 lines off the initial bundle.
 */
export const FOCUS_LOCATION_EVENT = "tbm:focus-location";
