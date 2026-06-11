import { permanentRedirect } from "next/navigation";

/** Folded into the one-page site — the "Know Us" section carries this content. */
export default function AboutRedirect() {
  permanentRedirect("/#know-us");
}
