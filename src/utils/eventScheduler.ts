import { Agenda } from "@hokify/agenda";
import config from "../config/main.json" assert { type: "json" };

class EventScheduler {
    private agenda: Agenda;

    constructor() {
        this.agenda = new Agenda({
            db: {
                address: config.mongoUrl + "Nucleus",
                collection: "eventScheduler"
            }
        });
    }

    async start() {
        await new Promise((resolve) => this.agenda.once("ready", resolve));
        this.agenda.start();
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async schedule(name: string, time: string, data: any) {
        await this.agenda.schedule(time, name, data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cancel(name: string, data: any) {
        this.agenda.cancel({ name, data });
    }
}

export default EventScheduler;
