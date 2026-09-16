export interface ConsultationRequestPayload {
  fullName: string;
  phone: string;
  serviceOfInterest: string;
  preferredContactMethod: string;
  message: string;
}

/**
 * No backend integration exists yet. This function is the single seam to
 * wire up later — an API route, an email service, a CRM webhook, and so
 * on. It currently only simulates a network request so the form UI can be
 * fully built, validated, and tested ahead of that integration. Replace
 * the body once a real endpoint exists; the form component does not need
 * to change.
 */
export async function submitConsultationRequest(
  payload: ConsultationRequestPayload
): Promise<{ success: true }> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true };
}