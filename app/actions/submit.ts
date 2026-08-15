"use server";

import { contact } from "@/content/site";
import type { FormState } from "@/lib/form-state";

/**
 * Set once the Jotform intake form is connected. Until then every submission
 * is refused loudly and the visitor is pointed at the phone number.
 *
 * A referral that appears to send but goes nowhere is the single worst
 * failure this site could have, so there is no silent success path.
 */
const DELIVERY_CONFIGURED = false;

const NOT_CONFIGURED_MESSAGE = `Online submissions aren't switched on yet. Please call us at ${contact.phone} or email ${contact.referralEmail} and we'll take your information right away.`;

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

function validate(
  data: FormData,
  rules: { name: string; label: string; type?: "email" | "text" }[]
) {
  const errors: Record<string, string> = {};

  for (const rule of rules) {
    const v = value(data, rule.name);

    if (!v) {
      errors[rule.name] = `${rule.label} is required.`;
      continue;
    }

    if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      errors[rule.name] = "Enter a valid email address.";
    }
  }

  return errors;
}

export async function submitReferral(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  const errors = validate(data, [
    { name: "childFirstName", label: "Child's first name" },
    { name: "childLastName", label: "Child's last name" },
    { name: "dateOfBirth", label: "Date of birth" },
    { name: "guardianName", label: "Guardian or parent name" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email", type: "email" },
    { name: "insurance", label: "Insurance or coverage" },
  ]);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  if (!DELIVERY_CONFIGURED) {
    return { status: "error", message: NOT_CONFIGURED_MESSAGE, errors: {} };
  }

  // TODO: forward to Jotform once the intake form is connected.
  return {
    status: "success",
    message: "Referral received. Our intake team will be in touch within 1–2 business days.",
    errors: {},
  };
}

export async function submitContact(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  const errors = validate(data, [
    { name: "name", label: "Your name" },
    { name: "email", label: "Email", type: "email" },
    { name: "subject", label: "Subject" },
    { name: "message", label: "Message" },
  ]);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  if (!DELIVERY_CONFIGURED) {
    return { status: "error", message: NOT_CONFIGURED_MESSAGE, errors: {} };
  }

  // TODO: forward to Jotform once the contact form is connected.
  return {
    status: "success",
    message: "Message sent. We'll reply within one business day.",
    errors: {},
  };
}
