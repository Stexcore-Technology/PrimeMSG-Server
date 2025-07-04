import { createServer } from "@stexcore/api-engine";
import dotenv from "dotenv";

// Load environments
dotenv.config();

// Create server instance
const server = createServer({ 
    port: Number(process.env.APP_PORT || 9000), 
    mode: "compact",
    workdir: __dirname,
    allowCircularServiceDeps: false
});

// Initialize server
server.initialize();