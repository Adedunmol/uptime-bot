import { Request, Response } from "express";
import prisma from "../config/prisma-client";
import { createMonitorInput, getMonitorInput, updateMonitorInput } from "../schema/monitor.schema";


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

export const getMonitorsController = async (req: Request, res: Response) => {
    try {

        const user = req.user;

        const monitors = await prisma.monitor.findMany({ where: { user: { username: user } } });

        return res.status(200).json({ status: "success", data: { monitors } });
    } catch(err: any) {

        return res.status(500).json({ status: "error", message: "unable to get monitors" });
    }
}

export const getMonitorController = async (req: Request<getMonitorInput["params"]>, res: Response) => {
    try {
        const id = req.params.id;

        const monitor = await prisma.monitor.findFirst({ where: { id: Number(id) } });

        if (!monitor) return res.status(404).json({ status: "success", data: { monitor: null } });

        return res.status(200).json({ status: "success", data: { monitor } });
    } catch(err: any) {

        return res.status(404).json({ status: "error", message: "unable to get monitor" });
    }
}

export const updateMonitorController = async (req: Request<updateMonitorInput["params"], {}, updateMonitorInput["body"]>, res: Response) => {
    try {
        const id = req.params.id;
        const username = req.user;

        const monitor = await prisma.monitor.update({ where: { id: Number(id), user: { username } }, data: { recipient: req.body.recipient, interval: req.body.interval } });

        return res.status(200).json({ status: "success", data: { monitor } });
    } catch(err: any) {

        return res.status(404).json({ status: "fail", message: "unable to get monitor" });
    }
}

export const deleteMonitorController = async (req: Request<getMonitorInput["params"]>, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        if (!id) return res.sendStatus(400);

        const username = req.user;

        const monitor = await prisma.monitor.delete({ where: { id: Number(id), user: { username }  } });

        return res.status(200).json({ status: "success", mesaage: "monitor deleted successfully" });
    } catch(err: any) {

        return res.status(404).json({ status: "fail", message: "unable to get monitor" });
    }
}