export interface ConsultationRequestPayload {
  fullName: string;
  phone: string;
  serviceOfInterest: string;
  preferredContactMethod: string;
  message: string;
}

export async function submitConsultationRequest(
  payload: ConsultationRequestPayload,
): Promise<{ success: true }> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => ({}))) as { message?: string };
  if (!response.ok) {
    throw new Error(result.message || "Unable to send your request. Please try again.");
  }

  return { success: true };
}
