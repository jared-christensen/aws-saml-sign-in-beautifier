import { z } from "zod";

const groupSchema = z.object({
  name: z.string(),
  regEx: z.string(),
});

export const optionsSchema = z.object({
  favoriteAccounts: z.string().optional(),
  primaryButtonRegEx: z.string().optional(),
  cautionCardRegEx: z.string().optional(),
  infoCardRegEx: z.string().optional(),
  color1CardRegEx: z.string().optional(),
  color2CardRegEx: z.string().optional(),
  color3CardRegEx: z.string().optional(),
  removeFromAccountLabelRegEx: z.string().optional(),
  removeFromButtonLabelRegEx: z.string().optional(),
  gridColumns: z.string().min(1).optional(),
  groups: z.array(groupSchema).optional(),
});

export type Options = z.infer<typeof optionsSchema>;
export type Group = z.infer<typeof groupSchema>;
