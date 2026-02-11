"use client"

import {
  contactSchema,
  type ContactFormValues,
} from "./contact-schema"
import {
  ContactFormEngine,
  type FieldConfig,
} from "./contact-form-engine"

const fields: FieldConfig<ContactFormValues>[] = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Jane Doe",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "jane@example.com",
  },
  {
    name: "phone",
    label: "Phone (optional)",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    placeholder: "Select a subject",
    options: [
      { label: "General Inquiry", value: "general" },
      { label: "Technical Support", value: "support" },
      { label: "Sales", value: "sales" },
      { label: "Partnership", value: "partnership" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us how we can help...",
  },
  {
    name: "honeypot",
    label: "",
    type: "hidden",
  },
]

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: undefined as unknown as ContactFormValues["subject"],
  message: "",
  honeypot: "",
}

export function ContactForm({ className }: { className?: string }) {
  return (
    <ContactFormEngine
      schema={contactSchema}
      defaultValues={defaultValues}
      fields={fields}
      className={className}
    />
  )
}
