import { z } from "zod";

const MAX_FILE_SIZE = 8388608;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const machineProps = {
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
  ownerID: z.number({
    required_error: "ownerID is required",
  }).min(1, "ownerID is required"),
  machineType: z.number({
    required_error: "machineType is required",
  }).min(1, "machine Type is required"),

  palletNo: z.number({
    required_error: "pallet Number is required",
  })
    .min(1, "pallet Number should be > 0")
    .max(9999, "pallet Number Must be less than 9999"),
  clientRefID: z.string()
    .max(255, "clientRefID must be less than 255 characters")
    .optional(),
  remark: z
    .string({
      // required_error: "descEn is required",
    })
    // .min(1, "descEn is required")
    .max(255, "remark must be less than 255 characters")
    .optional(),
  attachment: z.object({
    size: z.number().optional(),
    type: z.string().optional(),
  })
    // .refine((file) => file.length == 1, "Image is required.")
    .refine((file) => (Object.keys(file).length == 0) || file.size <= MAX_FILE_SIZE, `Max file size is 8MB.`)
    .refine(
      (file) => (Object.keys(file).length == 0) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
}
export const CreateMachineSchema = z
  .object({
    machineName: machineProps.machineName,
    machineNameEn: machineProps.machineNameEn,
    ownerID: machineProps.ownerID,
    machineType: machineProps.machineType,
    palletNo: machineProps.palletNo,
    clientRefID: machineProps.clientRefID,
    remark: machineProps.remark,
    attachments: z.array(machineProps.attachment)
      .min(1,'at least one attachment are required'),
  })

export const ChangeMachineSchema = z
  .object({
    machineName: machineProps.machineName,
    machineNameEn: machineProps.machineNameEn,
    ownerID: machineProps.ownerID,
    machineType: machineProps.machineType,
    palletNo: machineProps.palletNo,
    clientRefID: machineProps.clientRefID,
    remark: machineProps.remark,
    attachments: z.array(z.object({
      size: z.number().optional().default(0),
      type: z.string().optional().default(""),
    }).optional())
      // .min(1, 'at least one attachment are required')
    // .refine((file) => file.length == 1, "Image is required.")
    ,
    currentAttachments: z.array(z.object({})).optional().nullable(),
  })
  .refine((data) => data.attachments.length > 0 ||
    data.attachments.every((attachment) => { return attachment.size >= 0 && attachment.size <= MAX_FILE_SIZE }), {
    path: ["attachments"],
    message: `Max file size is 8MB.`
  })
  .refine(
    (data) => {
      data.attachments.length > 0 &&
        data.attachments.some((attachment) => attachment.type === "" || ACCEPTED_IMAGE_TYPES.includes(attachment.type))
    }, {
    path: ["attachments"],
    message: ".jpg, .jpeg, .png and .webp files are accepted"
  }
  )

const machineTypeProps = {
  machineTypeName: z
    .string({
      required_error: "machine Type Name is required",
    })
    .min(1, "machine Type name is required")
    .max(50, "machineType Name must be less than 50 characters")
  // .optional()
  ,
  machineTypeNameEn: z
    .string({
      required_error: "machine Type Name Eng is required",
    })
    .min(1, "machine Name Eng is required")
    .max(50, "machineType NameEn must be less than 50 characters")
  // .optional()
  ,
}

export const CreateMachineTypeSchema = z.object({
  machineTypeName: machineTypeProps.machineTypeName,
  machineTypeNameEn: machineTypeProps.machineTypeNameEn
})


export type CreateMachineInput = z.infer<typeof CreateMachineSchema>;
export type ChangeMachineInput = z.infer<typeof ChangeMachineSchema>;
export type CreateMachineTypeInput = z.infer<typeof CreateMachineTypeSchema>;
export type ChangeMachineTypeInput = z.infer<typeof CreateMachineTypeSchema>;