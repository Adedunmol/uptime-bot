import dotenv from "dotenv";

dotenv.config();

import "./jobs/index";
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})