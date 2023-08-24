import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ status: "fail", message: "No token" });
    
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) return res.status(403).json({ status: "fail", message: "Bad token" });

        // @ts-ignore
        req.user = decoded;
        
        next()
    })
}

export default verifyJWT;