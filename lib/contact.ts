import { z } from "zod";
import { site } from "@/content/site";

export * from "./contact-state";

const { form } = site.contact;
const msg = form.messages.fields;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: msg.tooLong })
    .optional()
    .transform((v) => v || undefined);

export const contactSchema = z.object({
  name: z.string().trim().min(1, { error: msg.name }).max(120, { error: msg.tooLong }),
  email: z.string().trim().max(254, { error: msg.tooLong }).pipe(z.email({ error: msg.email })),
  company: optionalText(160),
  // Unknown options are dropped rather than trusted.
  service: z
    .string()
    .optional()
    .transform((v) => (v && (form.service.options as readonly string[]).includes(v) ? v : undefined)),
  budget: z
    .string()
    .optional()
    .transform((v) => (v && (form.budget.options as readonly string[]).includes(v) ? v : undefined)),
  message: z.string().trim().min(10, { error: msg.message }).max(5000, { error: msg.tooLong }),
});

export type ContactInput = z.infer<typeof contactSchema>;
