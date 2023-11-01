import { z } from "zod";

const MAX_FILE_SIZE = 8388608;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const props = {
  machineName: z
    .string({
      required_error: "machine Name is required",
    })
    .min(1, "Full name is required")
    .max(50, "machineName must be less than 50 characters")
  // .optional()
  ,
  machineNameEn: z
    .string({
      required_error: "machine Name Eng is required",
    })
    .min(1, "machine Name Eng is required")
    .max(50, "machineNameEn must be less than 50 characters")
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
  weight: z.number({
    required_error: "weight is required",
  })
    .min(1, "weight should be > 0")
    .max(9999, "weight Must be less than 9999"),
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
  unit: z
    .string()
    .max(10, "unit must be less than 10 characters")
    .optional(),
  currency: z
    .string()
    .max(10, "currency must be less than 10 characters")
    .optional(),
  clientRefID: z.string()
    .max(255, "clientRefID must be less than 255 characters")
    .optional(),
  abbreviation: z.string({
    required_error: "abbreviation is required",
  })
    .min(2, "abbreviation must be more than 2 characters")
    .max(4, "abbreviation must be less than 4 characters"),
  remark: z
    .string({
      // required_error: "descEn is required",
    })
    // .min(1, "descEn is required")
    .max(255, "remark must be less than 255 characters")
    .optional(),
}
export const CreateMachineSchema = z
  .object({
    machineName: props.machineName,
    machineNameEn: props.machineNameEn,
    desc: props.desc,
    descEn: props.descEn,
    weight: props.weight,
    price: props.price,
    unitPrice: props.unitPrice,
    unit: props.unit,
    currency: props.currency,
    clientRefID: props.clientRefID,
    abbreviation: props.abbreviation,
    remark: props.remark,
    attachment: z.object({
      size: z.number().optional(),
      type: z.string().optional(),
    })
      // .refine((file) => file.length == 1, "Image is required.")
      .refine((file) => (Object.keys(file).length == 0) || file.size <= MAX_FILE_SIZE, `Max file size is 8MB.`)
      .refine(
        (file) => (Object.keys(file).length == 0) || ACCEPTED_IMAGE_TYPES.includes(file.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })

export const ChangeMachineSchema = z
  .object({
    machineName: props.machineName,
    machineNameEn: props.machineNameEn,
    desc: props.desc,
    descEn: props.descEn,
    weight: props.weight,
    price: props.price,
    unitPrice: props.unitPrice,
    unit: props.unit,
    currency: props.currency,
    clientRefID: props.clientRefID,
    abbreviation: props.abbreviation,
    remark: props.remark,
    attachment: z.object({
      size: z.number().optional().default(0),
      type: z.string().optional().default(""),
    }).optional()
    // .refine((file) => file.length == 1, "Image is required.")
    ,
    currentAttachment: z.object({})
  })
  .refine((data) => data.attachment.size >= 0 && data.attachment.size <= MAX_FILE_SIZE, {
    path: ["attachment"],
    message: `Max file size is 8MB.`
  })
  .refine(
    (data) => {
      console.log("data", data.attachment.type)
      return data.attachment.type === "" || ACCEPTED_IMAGE_TYPES.includes(data.attachment.type)
    }, {
    path: ["attachment"],
    message: ".jpg, .jpeg, .png and .webp files are accepted"
  }
  )


export type CreateMachineInput = z.infer<typeof CreateMachineSchema>;
export type ChangeMachineInput = z.infer<typeof ChangeMachineSchema>;