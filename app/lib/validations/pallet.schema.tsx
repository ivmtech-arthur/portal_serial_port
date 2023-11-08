import { z } from "zod";


const MAX_FILE_SIZE = 8388608;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const palletProps = {
    palletID: z.number({
        required_error: "pallet is required",
    }).min(1, "pallet is required"),
    machineID: z.number(),
    description: z.string({}).optional(),
    productID: z.number({
        required_error: "pallet is required",
    }).min(1, "productID is required"),
    inventory: z.number().default(0),
    price: z.number().default(0),
    weight: z.number().default(0),
    attachment: z.object({
        size: z.number().optional(),
        type: z.string().optional(),
    })
}

export const CreatePalletDetailSchema = z.object({
    palletID: palletProps.palletID,
    description: palletProps.description,
    machineID: palletProps.machineID,
    productID: palletProps.productID,
    inventory: palletProps.inventory,
    price: palletProps.price,
    weight: palletProps.weight,
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

export const ChangePalletDetailSchema = z.object({
    palletID: palletProps.palletID,
    description: palletProps.description,
    machineID: palletProps.machineID,
    productID: palletProps.productID,
    inventory: palletProps.inventory,
    price: palletProps.price,
    weight: palletProps.weight,
    attachment: z.object({
        size: z.number().optional().default(0),
        type: z.string().optional().default(""),
    }).optional()
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

export const PalletDetailListSchema = z.array(ChangePalletDetailSchema)
    .superRefine((items, ctx) => {
        const palletIDMap = items.map((item) => item.palletID)
        const duplicateIDMap = palletIDMap.filter((palletNo, index) => palletIDMap.indexOf(palletNo) !== index)
        console.log("zod validate", palletIDMap, duplicateIDMap, items)
        items.forEach((item, index) => {
            if (duplicateIDMap.includes(item.palletID)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `No Duplicate ID is allowed`,
                    path: ["items", index, "palletID"],
                })
            }
        })
        // if (new Set(items.map(item => item.palletID)).size !== items.map(item => item.palletID).length) {

        // }
        // a.forEach(() => {

        // },ctx)

    })
// .refine(items => new Set(items.map(item => item.palletID)).size === items.map(item => item.palletID).length, {
//     message: 'Must be unique ID',
//     path: []
// })

export type CreatePalletDetailInput = z.infer<typeof CreatePalletDetailSchema>;
export type ChangePalletDetailInput = z.infer<typeof ChangePalletDetailSchema>;
export type PalletDetailListInput = z.infer<typeof PalletDetailListSchema>;