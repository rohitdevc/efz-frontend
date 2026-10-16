export interface EnquiryForm {
  enquiry_name: string;
  enquiry_phone_number: string;
  enquiry_email_address: string;
  enquiry_company_name?: string;
  enquiry_address?: string;
  enquiry_message?: string;
  ip_address: string;
  referral_url: string;
};

export interface EnquiryFormProps {
  enquiry_name: string;
  enquiry_phone_number: string;
  enquiry_email_address: string;
  enquiry_company_name: string;
  enquiry_address: string;
  enquiry_message: string;
  ip_address: string;
  referral_url: string;
};

export interface EnquiryFormErrors {
  enquiry_name?: string
  enquiry_phone_number?: string
  enquiry_email_address?: string
  enquiry_company_name?: string
  enquiry_address?: string
  enquiry_message?: string
}