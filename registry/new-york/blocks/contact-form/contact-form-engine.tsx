"use client"

import { useState } from "react"
import { useForm, type DefaultValues, type Path } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import { Textarea } from "@/registry/new-york/ui/textarea"
import { Button } from "@/registry/new-york/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Loader2, Send, CheckCircle2 } from "lucide-react"

export type FieldConfig<T> = {
  name: Path<T>
  label: string
  placeholder?: string
  type?: "text" | "email" | "tel" | "textarea" | "select" | "hidden"
  options?: { label: string; value: string }[]
  className?: string
}

export type ContactFormEngineProps<T extends Record<string, unknown>> = {
  schema: z.ZodType<T>
  defaultValues: DefaultValues<T>
  fields: FieldConfig<T>[]
  endpoint?: string
  submitLabel?: string
  successTitle?: string
  successMessage?: string
  className?: string
}

export function ContactFormEngine<T extends Record<string, unknown>>({
  schema,
  defaultValues,
  fields,
  endpoint = "/api/contact",
  submitLabel = "Send Message",
  successTitle = "Message sent",
  successMessage = "Thank you for reaching out. We'll get back to you within 24 hours.",
  className,
}: ContactFormEngineProps<T>) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  )

  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  })

  async function onSubmit(data: T) {
    setStatus("submitting")

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(
          (error as { message?: string }).message ?? "Something went wrong",
        )
      }

      setStatus("success")
      form.reset()

      toast.success(successTitle, { description: successMessage })
    } catch (err) {
      setStatus("idle")
      toast.error("Failed to send message", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again or email us directly.",
      })
    }
  }

  function renderField(fieldConfig: FieldConfig<T>) {
    const { name, label, placeholder, type = "text", options } = fieldConfig

    if (type === "hidden") {
      return (
        <FormField
          key={String(name)}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            >
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={(field.value as string) ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    }

    return (
      <FormField
        key={String(name)}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={fieldConfig.className}>
            <FormLabel className="text-sm font-medium text-foreground">
              {label}
            </FormLabel>
            <FormControl>
              {type === "textarea" ? (
                <Textarea
                  name={field.name}
                  ref={field.ref}
                  value={(field.value as string) ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  placeholder={placeholder}
                  className="min-h-[140px] resize-y bg-card transition-colors focus-visible:ring-1"
                />
              ) : type === "select" && options ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                >
                  <SelectTrigger className="bg-card transition-colors">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={(field.value as string) ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  type={type}
                  placeholder={placeholder}
                  className="bg-card transition-colors focus-visible:ring-1"
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            {successTitle}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {successMessage}
          </p>
          <Button
            variant="outline"
            className="mt-8 bg-transparent"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          {fields.map(renderField)}

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="mt-2 w-full"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{submitLabel}</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
