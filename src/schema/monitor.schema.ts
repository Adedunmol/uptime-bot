import { object, string, TypeOf, number } from "zod";

export const createMonitorSchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        url: string({ required_error: "url is required" }),
        interval: number().min(300).optional(),
        recipient: string({ required_error: "Email is required" }).email("Not a valid email")
    })
})

export const getMonitorSchema = object({
    params: object({
        id: string({ required_error: "id param is required" })
    })
})

export const updateMonitorSchema = object({
    body: object({
        interval: number().min(300).optional(),
        recipient: string().email("Not a valid email").optional()
    }),
    params: object({
        id: string({ required_error: "id param is required" })
    })
})

export type getMonitorInput = TypeOf<typeof getMonitorSchema>;
export type createMonitorInput = TypeOf<typeof createMonitorSchema>;
export type updateMonitorInput = TypeOf<typeof updateMonitorSchema>;