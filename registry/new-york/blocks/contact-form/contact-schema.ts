import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must not exceed 80 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(["general", "support", "sales", "partnership"], {
    message: "Please select a subject",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2,000 characters"),
  honeypot: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
