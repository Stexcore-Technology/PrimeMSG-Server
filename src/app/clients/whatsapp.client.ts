import Client from "../classes/Client";
import WAWebJS from "whatsapp-web.js";

export default class WhatsappClient extends Client {

    /**
     * Whatsapp client
     */
    protected wa: WAWebJS.Client;

    /**
     * Initialize platform client
     */
    constructor() {
        super("whasapp");

        // create whatsapp client
        this.wa = new WAWebJS.Client({

        });

        this.wa.on("disconnected", (reason) => {
            console.log("@disconnected", reason);
        });

        this.wa.on("loading_screen", (percent, message) => {
            console.log("@loading_screen", percent, message);
        });

        this.wa.on("qr", (qr) => {
            console.log("@loading_screen", qr);
        });

        this.wa.on("ready", () => {
            console.log("@ready");
        });
    }
    
    public initialize(): void {
        this.wa.initialize();
    }

    public destroy(): void {
        this.wa.destroy();
    }
    
}