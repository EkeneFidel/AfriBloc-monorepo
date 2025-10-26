import z from "zod/v3";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Password is required"),
    newPassword: z.string().nonempty("New Password is required"),
    confirmNewPassword: z.string().nonempty("Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
