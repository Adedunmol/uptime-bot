import parseTime from "../utils/parse-time";
import * as cron from "node-schedule";
import prisma from "../config/prisma-client";
import isSiteUp from "../utils/get-site";
import sendMail from "../utils/email";

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
                const updateMonitor = prisma.monitor.update({ where: { id: monitor.id }, data: { last_down: Date(), scheduled: false } });
                const message = `${monitor.name} is currently down at ${Date.now()}. You may check the services depending on it.`
                Promise.all([
                    sendMail(monitor.recipient, `${monitor.name} is down`, message),
                    updateMonitor
                ]).then(values => {

                    console.log(values);
                    console.log("done");
                }).catch(err => {
                    
                    console.log("An error occurred", err);
                })
            }

        }.bind(null, monitor))

        //update the monitor's scheduled field to true
        const updateMonitor = await prisma.monitor.update({ where: { id: monitor.id }, data: { scheduled: true } });

    }

})