"use client";

import { useActionState } from "react";
import { submitReferral } from "@/app/actions/submit";
import { initialFormState, type FormState } from "@/lib/form-state";
import {
  FormMessage,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "./fields";
import { insuranceOptions, referralSourceOptions } from "@/content/referrals";

export function ReferralForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitReferral,
    initialFormState
  );

  const e = state.errors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      <FormMessage status={state.status} message={state.message} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="childFirstName"
          label="Child's first name"
          error={e.childFirstName}
        />
        <TextField
          name="childLastName"
          label="Child's last name"
          error={e.childLastName}
        />
        <TextField
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          error={e.dateOfBirth}
        />
        <TextField
          name="diagnosis"
          label="Diagnosis"
          placeholder="e.g. ASD Level 2"
          error={e.diagnosis}
          optional
        />
      </div>

      <TextField
        name="guardianName"
        label="Guardian / parent name"
        autoComplete="name"
        error={e.guardianName}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={e.phone}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={e.email}
        />
      </div>

      <SelectField
        name="insurance"
        label="Insurance / coverage"
        options={insuranceOptions}
        error={e.insurance}
      />

      <SelectField
        name="referralSource"
        label="How did you hear about us?"
        options={referralSourceOptions}
        error={e.referralSource}
        optional
      />

      <TextAreaField name="notes" label="Additional notes" optional />

      <SubmitButton pending={pending}>Submit referral</SubmitButton>
    </form>
  );
}
