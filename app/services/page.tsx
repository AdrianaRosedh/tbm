import { permanentRedirect } from "next/navigation";

/** Folded into the one-page site — the "Services" section carries this content. */
export default function ServicesRedirect() {
  permanentRedirect("/#services");
}
