import express from "express";
import authRouter from "./routes/auth.route";
import monitorRouter from "./routes/monitor.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyJWT from "./middlewares/verifyJWT";
import validateResource from "./middlewares/validate-resource";
import { getMonitorSchema } from "./schema/monitor.schema";
import { deleteMonitorController } from "./controllers/monitor.controller";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    
    return res.status(200).json({ message: "Home page!" });
})
app.use("/api/v1/auth", authRouter);

app.use(verifyJWT);
app.use("/api/v1/monitors/", monitorRouter);

// app.all("*", (req, res) => {

//     return res.status(404).json({ message: "Route not found" });
// })

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
    })
})

export default app;