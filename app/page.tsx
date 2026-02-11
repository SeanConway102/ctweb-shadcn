import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { ContactForm } from "@/registry/new-york/blocks/contact-form/contact-form"
import { ContactInfo } from "@/registry/new-york/blocks/contact-form/contact-info"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          CT Web Component Registry
        </h1>
        <p className="text-muted-foreground">
          Reusable components for CT Web projects, distributed via the shadcn
          registry.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Contact form with validation, honeypot spam protection, and
              multi-field support.
            </h2>
            <OpenInV0Button name="contact-form" className="w-fit" />
          </div>
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col justify-center border-b border-border bg-background p-8 lg:border-b-0 lg:border-r lg:p-12">
                  <ContactInfo />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground">
                      Send us a message
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill in the details below and we will be in touch.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
