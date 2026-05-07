"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return { status: "error", message: "Please fill in all fields." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Phase 3: wire to Resend / HubSpot / SES / etc.
  console.log("[contact] received:", { name, email, subject });
  await new Promise((r) => setTimeout(r, 400));

  return {
    status: "success",
    message: "Thanks — we'll be in touch shortly.",
  };
}
