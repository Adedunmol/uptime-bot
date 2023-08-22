import parseTime from "../utils/parse-time";
import * as cron from "node-cron";

const EVERY_MINUTE = parseTime(60);

const task = cron.schedule(EVERY_MINUTE, () => {
    console.log("running every minute");
})