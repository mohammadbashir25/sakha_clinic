"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { consultationFormData } from "./data";
import {
  submitConsultationRequest,
  type ConsultationRequestPayload,
} from "./submitConsultationRequest";

interface FormValues {
  fullName: string;
  phone: string;
  serviceOfInterest: string;
  preferredContactMethod: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  serviceOfInterest: "",
  preferredContactMethod: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  }
  if (!values.serviceOfInterest) {
    errors.serviceOfInterest = "Please select a service of interest.";
  }
  if (!values.preferredContactMethod) {
    errors.preferredContactMethod = "Please select a preferred contact method.";
  }

  return errors;
}

export default function ConsultationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    const payload: ConsultationRequestPayload = {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      serviceOfInterest: values.serviceOfInterest,
      preferredContactMethod: values.preferredContactMethod,
      message: values.message.trim(),
    };

    try {
      await submitConsultationRequest(payload);
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <motion.div
      id="consultation-form"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-lavender/40 p-7 sm:p-9"
    >
      <h2 className="text-2xl leading-tight text-charcoal sm:text-3xl">
        {consultationFormData.heading}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-charcoal">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="mt-2 w-full border border-muted/30 bg-ivory px-4 py-3 text-base text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="mt-1.5 text-sm text-primary">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-2 w-full border border-muted/30 bg-ivory px-4 py-3 text-base text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-sm text-primary">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="serviceOfInterest" className="block text-sm font-medium text-charcoal">
            Service of Interest
          </label>
          <select
            id="serviceOfInterest"
            name="serviceOfInterest"
            value={values.serviceOfInterest}
            onChange={(event) => updateField("serviceOfInterest", event.target.value)}
            aria-invalid={Boolean(errors.serviceOfInterest)}
            aria-describedby={errors.serviceOfInterest ? "serviceOfInterest-error" : undefined}
            className="mt-2 w-full border border-muted/30 bg-ivory px-4 py-3 text-base text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
          >
            <option value="" disabled>
              Select a service
            </option>
            {consultationFormData.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.serviceOfInterest && (
            <p id="serviceOfInterest-error" role="alert" className="mt-1.5 text-sm text-primary">
              {errors.serviceOfInterest}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-charcoal">
            Preferred Contact Method
          </legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {consultationFormData.contactMethodOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`contact-method-${option.value}`}
                className="flex items-center gap-2 text-sm text-charcoal"
              >
                <input
                  id={`contact-method-${option.value}`}
                  type="radio"
                  name="preferredContactMethod"
                  value={option.value}
                  checked={values.preferredContactMethod === option.value}
                  onChange={(event) => updateField("preferredContactMethod", event.target.value)}
                  aria-describedby={
                    errors.preferredContactMethod ? "preferredContactMethod-error" : undefined
                  }
                  className="h-4 w-4 accent-primary"
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.preferredContactMethod && (
            <p
              id="preferredContactMethod-error"
              role="alert"
              className="mt-1.5 text-sm text-primary"
            >
              {errors.preferredContactMethod}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal">
            Message <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="mt-2 w-full resize-none border border-muted/30 bg-ivory px-4 py-3 text-base text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
          />
        </div>

        <p className="text-xs leading-relaxed text-muted">
          {consultationFormData.disclaimer}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary px-6 py-3.5 text-center text-sm font-medium text-ivory transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? consultationFormData.submittingLabel : consultationFormData.submitLabel}
        </button>

        <div aria-live="polite" className="text-sm">
          {status === "success" && (
            <p className="text-primary">{consultationFormData.successMessage}</p>
          )}
          {status === "error" && (
            <p className="text-primary">{consultationFormData.errorMessage}</p>
          )}
        </div>
      </form>
    </motion.div>
  );
}