import parseTime from "../utils/parse-time";
import * as cron from "node-schedule";
import prisma from "../config/prisma-client";
import isSiteUp from "../utils/get-site";
import sendMail from "../utils/email";
import { Prisma } from "@prisma/client";

type Monitor = {
    id: number;
    url: string;
    name: string;
    interval: number;
    last_down: Date | null;
    down_since: Date | null;
    down: boolean;
    recipient: string;
    monitor_enabled: boolean;
    scheduled: boolean;
    userId: number;
}

const EVERY_MINUTE = parseTime(60);

const job = cron.scheduleJob(EVERY_MINUTE, async (data) => {

    const monitors = await prisma.monitor.findMany({ where: { scheduled: false } });

    for (const monitor of monitors) {

        cron.scheduleJob(parseTime(monitor.interval), async function name(monitor: Monitor) {
            const siteIsUp = await isSiteUp(monitor.url);

            // send mail to the user if site is down
            if (!siteIsUp) {

                const message = `${monitor.name} is currently down. You may check the services depending on it.`
                sendMail(monitor.recipient, `${monitor.name} is down`, message);
            }
        }.bind(null, monitor))
    }

})