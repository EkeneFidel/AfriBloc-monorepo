import z from "zod/v3";

export const FundWalletSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  paymentMethod: z.string().nonempty("Payment method is required"),
});

export type FundWalletSchemaType = z.infer<typeof FundWalletSchema>;

export const WithdrawSchema = z
  .object({
    amount: z.coerce.number().min(1, "Amount must be at least 1"),
    destination: z.string().nonempty("Withdrawal destination is required"),
    network: z.string().optional(),
    walletAddress: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.destination === "crypto") {
      if (!data.network || data.network === "all") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Network is required for crypto withdrawal",
          path: ["network"],
        });
      }
      if (!data.walletAddress || data.walletAddress.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Wallet address is required for crypto withdrawal",
          path: ["walletAddress"],
        });
      }
    }
  });

export type WithdrawSchemaType = z.infer<typeof WithdrawSchema>;
