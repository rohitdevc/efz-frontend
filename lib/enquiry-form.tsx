"use server";

import { EnquiryFormProps } from "@/types/forms";
import { apiPOSTFetch } from "./api";
import { buildHeaders } from "./common";

export const submitEnquiryForm = async (formData: EnquiryFormProps) => apiPOSTFetch<EnquiryFormProps>(`enquiry-form-submit`, {
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
})