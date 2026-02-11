import { Mail, MapPin, Clock } from "lucide-react"
import { Separator } from "@/registry/new-york/ui/separator"

const items = [
  {
    icon: Mail,
    heading: "Email us",
    lines: ["hello@yourcompany.com"],
  },
  {
    icon: MapPin,
    heading: "Visit us",
    lines: ["100 Main Street", "San Francisco, CA 94105"],
  },
  {
    icon: Clock,
    heading: "Working hours",
    lines: ["Mon - Fri, 9:00 AM - 6:00 PM PT"],
  },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Get in touch
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground lg:text-4xl">
          {"Let's start a conversation"}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Have a question, a project idea, or just want to say hello? Fill out
          the form and our team will respond within 24 hours.
        </p>
      </div>

      <Separator />

      <ul className="flex flex-col gap-6" role="list">
        {items.map((item) => (
          <li key={item.heading} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
              <item.icon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.heading}
              </p>
              {item.lines.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {line}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
