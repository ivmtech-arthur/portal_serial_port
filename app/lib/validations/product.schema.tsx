import { z } from "zod";

const MAX_FILE_SIZE = 8388608;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CreateProductSchema = z
    .object({
        productName: z
            .string({
                required_error: "product Name is required",
            })
            .min(1, "Full name is required")
            .max(50, "productName must be less than 50 characters")
            // .optional()
        ,
        productNameEn: z
            .string({
                required_error: "product Name Eng is required",
            })
            .min(1, "product Name Eng is required")
            .max(50, "productNameEn must be less than 50 characters")
            // .optional()
        ,
        desc: z
            .string({
                // required_error: "userID is required",
            })
            // .min(1, "descEn is required")
            .max(255, "desc must be less than 255 characters")
            .optional(),
        descEn: z
            .string({
                // required_error: "descEn is required",
            })
            // .min(1, "descEn is required")
            .max(255, "descEn must be less than 255 characters")
            .optional(),
        //   .email("Email is invalid"),
        // photo: z.string().optional(),
        price: z
            .number({
                required_error: "price is required",
            })
            .min(0, "price is required")
            .max(9999, "Price Must be less than $9999"),
        unitPrice: z
            .number({
                required_error: "unitPrice is required",
            })
            .min(0, "unitPrice is required")
            .max(9999, "unitPrice Must be less than $9999"),
        remark: z
            .string({
                // required_error: "descEn is required",
            })
            // .min(1, "descEn is required")
            .max(255, "remark must be less than 255 characters")
            .optional(),
        attachment: z.object({
            // length: z
            //     .number(),
            size: z.number().optional(),
            type: z.string().optional(),
        })
            // .refine((file) => file.length == 1, "Image is required.")
            .refine((file) => (Object.keys(file).length == 0) || file.size <= MAX_FILE_SIZE, `Max file size is 8MB.`)
            .refine(
                (file) => (Object.keys(file).length == 0) || ACCEPTED_IMAGE_TYPES.includes(file.type),
                ".jpg, .jpeg, .png and .webp files are accepted."
        ),
        // attachment: z.object({
        //     file: z
        //         .any()
        // })
        //     .refine((file) => file.length == 1, "Image is required.")
        //     .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        //     .refine(
        //         (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        //         ".jpg, .jpeg, .png and .webp files are accepted."
        //     ),
    })

export const ChangeProductSchema = z
    .object({
        productName: z
            .string({
                required_error: "product Name is required",
            })
            .min(1, "Full name is required")
            .max(50, "productName must be less than 50 characters")
        // .optional()
        ,
        productNameEn: z
            .string({
                required_error: "product Name Eng is required",
            })
            .min(1, "product Name Eng is required")
            .max(50, "productNameEn must be less than 50 characters")
        // .optional()
        ,
        desc: z
            .string({
                // required_error: "userID is required",
            })
            // .min(1, "descEn is required")
            .max(255, "desc must be less than 255 characters")
            .optional(),
        descEn: z
            .string({
                // required_error: "descEn is required",
            })
            // .min(1, "descEn is required")
            .max(255, "descEn must be less than 255 characters")
            .optional(),
        //   .email("Email is invalid"),
        // photo: z.string().optional(),
        price: z
            .number({
                required_error: "price is required",
            })
            .min(0, "price is required")
            .max(9999, "Price Must be less than $9999"),
        unitPrice: z
            .number({
                required_error: "unitPrice is required",
            })
            .min(0, "unitPrice is required")
            .max(9999, "unitPrice Must be less than $9999"),
        remark: z
            .string({
                // required_error: "descEn is required",
            })
            // .min(1, "descEn is required")
            .max(255, "remark must be less than 255 characters")
            .optional(),
        attachment: z.object({
            // length: z
            //     .number(),
            size: z.number(),
            type: z.string(),
        })
            // .refine((file) => file.length == 1, "Image is required.")
            .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 8MB.`)
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                ".jpg, .jpeg, .png and .webp files are accepted."
            ),
        // attachment: z.object({
        //     file: z
        //         .any()
        // })
        //     .refine((file) => file.length == 1, "Image is required.")
        //     .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        //     .refine(
        //         (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        //         ".jpg, .jpeg, .png and .webp files are accepted."
        //     ),
    })


export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type ChangeProductInput = z.infer<typeof ChangeProductSchema>;