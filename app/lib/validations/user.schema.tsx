import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
          .min(1, "Full name is required"),
      nameEn: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Full name is required"),
    userID: z
      .string({
        required_error: "userID is required",
      })
      .min(1, "userID is required"),
    username: z
      .string({
        required_error: "username is required",
      })
      .min(1, "username is required"),
    //   .email("Email is invalid"),
    // photo: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
    userType: z.number().default(3),
    userRole: z.number().default(3),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const LoginUserSchema = z.object({
  identifier: z
    .string({
      required_error: "Identifier is required",
    })
    .min(1, "Identifier required"),
    // .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const ChangeUserDataSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Full name is required"),
  nameEn: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Full name is required"),
  userID: z
    .string({
      required_error: "userID is required",
    })
    .min(1, "userID is required"),
  //   .email("Email is invalid"),
  // photo: z.string().optional(),
  // password: z
  //   .string({
  //     // required_error: "Password is required",
  //   })
  //   // .min(1, "Password is required")
  //   .min(8, "Password must be more than 8 characters")
  //   .max(32, "Password must be less than 32 characters"),
  // passwordConfirm: z
  //   .string({
  //     // required_error: "Confirm your password",
  //   })
    // .min(1, "Confirm your password"),
  userType: z.number().default(3),
  userRole: z.number().default(3),
})
//   .refine((data) => data.password === data.passwordConfirm, {
//   path: ["passwordConfirm"],
//   message: "Passwords do not match",
// });


export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type ChangeUserDataInput = z.infer<typeof ChangeUserDataSchema>;
