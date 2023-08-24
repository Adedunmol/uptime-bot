import { Request, Response } from "express";
import { createUserInput } from "../schema/auth.schema";
import bcrypt from "bcrypt";
import prisma from "../config/prisma-client";

export const createUserController = async (req: Request<{}, {}, createUserInput["body"]>, res: Response) => {
    try {

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req .body.email,
                password: passwordHash
            }
        })

        return res.status(201).json({ status: "success", data: { id: user.id, email: user.email, username: user.username } })
    } catch(err: any) {

        return res.status(409).json({ status: "error", message: `User exists with this ${err.meta.target}` });
    }
}