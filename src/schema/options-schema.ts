import { z } from "zod";

export const optionsSchema = z.object({
  favoriteAccounts: z.string().optional(),
  primaryButtonRegEx: z.string().optional(),
  cautionCardRegEx: z.string().optional(),
  infoCardRegEx: z.string().optional(),
  removeFromAccountLabelRegEx: z.string().optional(),
  removeFromButtonLabelRegEx: z.string().optional(),
  gridColumns: z.string().min(1).optional(),
});

export type Options = z.infer<typeof optionsSchema>;
