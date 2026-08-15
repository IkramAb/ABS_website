"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/submit";
import { initialFormState, type FormState } from "@/lib/form-state";
import {
  FormMessage,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "./fields";
import { subjectOptions } from "@/content/contact";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitContact,
    initialFormState
  );

  const e = state.errors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      <FormMessage status={state.status} message={state.message} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="name"
          label="Your name"
          autoComplete="name"
          error={e.name}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={e.email}
        />
      </div>

      <TextField
        name="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        optional
      />

      <SelectField
        name="subject"
        label="Subject"
        options={subjectOptions}
        error={e.subject}
      />

      <TextAreaField name="message" label="Message" rows={6} error={e.message} />

      <SubmitButton pending={pending}>Send message</SubmitButton>
    </form>
  );
}
