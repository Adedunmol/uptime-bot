import { Request, Response } from "express";
import { createUserInput, loginUserInput } from "../schema/auth.schema";
import bcrypt from "bcrypt";
import prisma from "../config/prisma-client";
import * as jwt from "jsonwebtoken";

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

export const loginUserController = async (req: Request<{}, {}, loginUserInput["body"]>, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { email: req.body.email } });

        if (!user) return res.status(400).json({ status: "fail", message: "No user found with this email" });

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {

            const accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            )

            const refreshToken = jwt.sign(
                { username: user.username },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: "1d" }
            )
            
            const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { refresh_token: refreshToken } });
            res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            
            return res.status(200).json({ status: "success", data: { accessToken } });
        } else {

            return res.status(401).json({ status: "fail", message: "Invalid credentials" });
        }
    } catch(err: any) {

        return res.status(500).json({ status: "error", message: "Server error" })
    }
}

export const refreshTokenController = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = await prisma.user.findFirst({ where: { refresh_token: refreshToken } })

    if (!user) return res.status(403).json({ status: "fail", message: "No refresh token" });

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403);

            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            )

            return res.status(200).json({ status: "success", data: { accessToken } });
        }
    )
}