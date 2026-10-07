"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import {
  submitConsultationRequest,
  type ConsultationRequestPayload,
} from "./submitConsultationRequest";

const services = [
  "hair-transplant",
  "beard-transplant",
  "eyebrow-transplant",
  "hair-loss-treatment",
  "prp-hair-face",
  "mesotherapy-hair-face",
  "mesogel",
  "biofiller",
  "botox",
  "lip-filler",
  "cheek-filler",
  "nose-filler",
  "under-eye-filler",
  "acne-treatment",
  "hydrafacial",
  "microneedling",
  "laser-hair-removal",
  "hr-sr-ipl",
  "fractional-co2-laser",
  "tattoo-removal-laser",
] as const;

type FormValues = {
  fullName: string;
  phone: string;
  serviceOfInterest: string;
  preferredContactMethod: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  serviceOfInterest: "",
  preferredContactMethod: "",
  message: "",
};

export default function ConsultationForm() {
  const t = useTranslations("ContactPage");
  const reduceMotion = useReducedMotion();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!values.fullName.trim()) {
      next.fullName = t("consultation.requiredName");
    }

    if (!values.phone.trim()) {
      next.phone = t("consultation.requiredPhone");
    }

    if (!values.serviceOfInterest) {
      next.serviceOfInterest = t("consultation.requiredService");
    }

    if (!values.preferredContactMethod) {
      next.preferredContactMethod = t("consultation.requiredContact");
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
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
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (hasError: boolean) =>
    `mt-2 w-full border bg-ivory px-4 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/50 ${
      hasError
        ? "border-primary"
        : "border-charcoal/15 focus:border-orchid"
    }`;

  return (
    <section
      id="consultation-form"
      className="bg-lavender/35 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden border border-charcoal/10 bg-white lg:grid-cols-[0.75fr_1.25fr]">
          {/* Introduction */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="bg-primary p-7 text-ivory sm:p-10 lg:p-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">
              {t("consultation.eyebrow")}
            </p>

            <h2 className="mt-5 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
              {t("consultation.title")}
            </h2>

            <p className="mt-5 text-sm leading-7 text-ivory/70 sm:text-base">
              {t("consultation.description")}
            </p>

            <div className="mt-12 border-t border-ivory/15 pt-5 text-xs leading-6 text-ivory/55">
              {t("consultation.disclaimer")}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: 0.05,
            }}
            className="grid gap-6 p-7 sm:p-10 lg:grid-cols-2 lg:p-12"
          >
            {/* Full name */}
            <Field
              label={t("consultation.fullName")}
              htmlFor="fullName"
              error={errors.fullName}
            >
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder={t("consultation.fullNamePlaceholder")}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                className={inputClass(Boolean(errors.fullName))}
              />

              {errors.fullName && (
                <p
                  id="fullName-error"
                  role="alert"
                  className="text-xs text-primary"
                >
                  {errors.fullName}
                </p>
              )}
            </Field>

            {/* Phone */}
            <Field
              label={t("consultation.phone")}
              htmlFor="phone"
              error={errors.phone}
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder={t("consultation.phonePlaceholder")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass(Boolean(errors.phone))}
              />

              {errors.phone && (
                <p
                  id="phone-error"
                  role="alert"
                  className="text-xs text-primary"
                >
                  {errors.phone}
                </p>
              )}
            </Field>

            {/* Service */}
            <Field
              label={t("consultation.service")}
              htmlFor="serviceOfInterest"
              error={errors.serviceOfInterest}
            >
              <select
                id="serviceOfInterest"
                name="serviceOfInterest"
                value={values.serviceOfInterest}
                onChange={(event) =>
                  updateField("serviceOfInterest", event.target.value)
                }
                aria-invalid={Boolean(errors.serviceOfInterest)}
                aria-describedby={
                  errors.serviceOfInterest
                    ? "serviceOfInterest-error"
                    : undefined
                }
                className={inputClass(Boolean(errors.serviceOfInterest))}
              >
                <option value="" disabled>
                  {t("consultation.servicePlaceholder")}
                </option>

                {services.map((slug) => (
                  <option key={slug} value={slug}>
                    {t(`consultation.services.${slug}`)}
                  </option>
                ))}
              </select>

              {errors.serviceOfInterest && (
                <p
                  id="serviceOfInterest-error"
                  role="alert"
                  className="text-xs text-primary"
                >
                  {errors.serviceOfInterest}
                </p>
              )}
            </Field>

            {/* Preferred contact method */}
            <fieldset>
              <legend className="text-sm font-semibold text-charcoal">
                {t("consultation.preferredContact")}
              </legend>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {(["phone", "whatsapp", "either"] as const).map((method) => (
                  <label
                    key={method}
                    className={`cursor-pointer border px-3 py-3 text-center text-sm transition-colors ${
                      values.preferredContactMethod === method
                        ? "border-primary bg-lavender text-primary"
                        : "border-charcoal/15 hover:border-primary/40"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="preferredContactMethod"
                      value={method}
                      checked={values.preferredContactMethod === method}
                      onChange={(event) =>
                        updateField(
                          "preferredContactMethod",
                          event.target.value,
                        )
                      }
                    />

                    {t(`consultation.contactMethods.${method}`)}
                  </label>
                ))}
              </div>

              {errors.preferredContactMethod && (
                <p
                  role="alert"
                  className="mt-2 text-xs text-primary"
                >
                  {errors.preferredContactMethod}
                </p>
              )}
            </fieldset>

            {/* Message */}
            <Field
              label={t("consultation.message")}
              htmlFor="message"
              optionalLabel={t("consultation.messageOptional")}
              className="lg:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) =>
                  updateField("message", event.target.value)
                }
                placeholder={t("consultation.messagePlaceholder")}
                className="mt-2 w-full resize-none border border-charcoal/15 bg-ivory px-4 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/50 focus:border-orchid"
              />
            </Field>

            {/* Submit */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "submitting"
                  ? t("consultation.submitting")
                  : t("consultation.submit")}

                {status !== "submitting" && (
                  <HiOutlineArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                )}
              </button>

              <div className="mt-4 text-sm" aria-live="polite">
                {status === "success" && (
                  <p className="text-primary">
                    {t("consultation.success")}
                  </p>
                )}

                {status === "error" && (
                  <p className="text-primary">
                    {t("consultation.error")}
                  </p>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optionalLabel,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optionalLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-medium text-charcoal"
      >
        <span>{label}</span>

        {optionalLabel && (
          <span className="text-xs font-normal text-muted">
            ({optionalLabel})
          </span>
        )}
      </label>

      {children}

      {error && (
        <p role="alert" className="text-xs text-primary">
          {error}
        </p>
      )}
    </div>
  );
}