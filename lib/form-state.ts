/**
 * Shared form state. Kept out of the "use server" module because every export
 * of a server-action file must itself be an async function.
 */

export type FormState = {
  status: "idle" | "error" | "success";
  message: string;
  /** Field name → error message. */
  errors: Record<string, string>;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
  errors: {},
};
