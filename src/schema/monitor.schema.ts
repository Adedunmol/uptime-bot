import { object, string, TypeOf, number } from "zod";

export const createMonitorSchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        url: string({ required_error: "url is required" }),
        interval: number().min(300).optional(),
        recipient: string({ required_error: "Email is required" }).email("Not a valid email")
    })
})

export type createMonitorInput = TypeOf<typeof createMonitorSchema>;