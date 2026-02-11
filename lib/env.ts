import { z } from "zod"

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_TO_EMAIL: z.string().email("CONTACT_TO_EMAIL must be a valid email"),
  CONTACT_FROM_EMAIL: z.string().email("CONTACT_FROM_EMAIL must be a valid email"),
  NEXT_PUBLIC_BASE_URL: z.string().url("NEXT_PUBLIC_BASE_URL must be a valid URL"),
})

// Validate at module load time — crashes the build if any var is missing.
const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((i) => `  ${i.path.join(".")}: ${i.message}`)
    .join("\n")
  throw new Error(`Missing or invalid environment variables:\n${missing}`)
}

export const env = parsed.data
