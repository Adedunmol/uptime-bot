import express from "express";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    
    return res.status(200).json({ message: "Home page!" });
})
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res) => {

    return res.status(404).json({ message: "Route not found" });
})

export default app;