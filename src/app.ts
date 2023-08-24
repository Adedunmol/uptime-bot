import express from "express";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    
    return res.status(200).json({ message: "Home page!" });
})
app.use("/api/v1/auth", authRouter);

export default app;