"use server";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const REQUIRED_FIELDS = [
  "fullName",
  "company",
  "email",
  "phone",
  "commodity",
  "weight",
  "volume",
  "originCity",
  "originState",
  "originZip",
  "destCity",
  "destState",
  "destZip",
  "shipDate",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const data: Record<string, string> = {};
  for (const f of REQUIRED_FIELDS) {
    data[f] = String(formData.get(f) ?? "").trim();
    if (!data[f]) {
      return { status: "error", message: "Please fill in all required fields." };
    }
  }
  data.notes = String(formData.get("notes") ?? "").trim();

  if (!EMAIL_RE.test(data.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Phase 3: wire to Resend / HubSpot / SES / etc.
  console.log("[quote] received:", {
    fullName: data.fullName,
    company: data.company,
    email: data.email,
    origin: `${data.originCity}, ${data.originState} ${data.originZip}`,
    destination: `${data.destCity}, ${data.destState} ${data.destZip}`,
    shipDate: data.shipDate,
  });
  await new Promise((r) => setTimeout(r, 600));

  return {
    status: "success",
    message: "Quote request received — we'll respond within 24 hours.",
  };
}
