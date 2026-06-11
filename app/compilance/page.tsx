import { permanentRedirect } from "next/navigation";

/** Folded into the one-page site — the "Compliance" section carries this content. */
export default function ComplianceRedirect() {
  permanentRedirect("/#compliance");
}
