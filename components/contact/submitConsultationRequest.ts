export interface ConsultationRequestPayload {
  fullName: string;
  phone: string;
  serviceOfInterest: string;
  preferredContactMethod: string;
  message: string;
}

/**
 * Keep this as the integration seam until a real backend/email endpoint exists.
 * The current project does not have a real consultation backend yet.
 */
export async function submitConsultationRequest(
  payload: ConsultationRequestPayload,
): Promise<{ success: true }> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true };
}
