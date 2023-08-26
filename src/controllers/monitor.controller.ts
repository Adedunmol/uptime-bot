import { Request, Response } from "express";
import prisma from "../config/prisma-client";
import { createMonitorInput } from "../schema/monitor.schema";


export const createMonitorController = async (req: Request<{}, {}, createMonitorInput["body"]>, res: Response) => {
    try {
        
        const monitor = await prisma.monitor.create({
            data: {
                name: req.body.name,
                recipient: req.body.recipient,
                url: req.body.url,
                interval: req.body.interval,
                user: {
                    connect:  { username: req.user }
                }
            },
        })

        return res.status(201).json({ status: "success", data: { monitor } });
    } catch(err: any) {

        return res.status(500).json({ status: "error", message: "unable to create a monitor" });
    }
}