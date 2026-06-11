import { permanentRedirect } from "next/navigation";

/**
 * Folded into the one-page site. Contact now lives in the popup overlay, so
 * any old link or direct visit to /contact lands on the homepage with the
 * contact popup already open (ContactOverlay reads ?contact=open on mount).
 */
export default function ContactRedirect() {
  permanentRedirect("/?contact=open");
}
