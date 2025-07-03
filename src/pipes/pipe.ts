import { RequestHandler, static as Static, json, urlencoded } from "express";
import morgan from "morgan";
import path from "path";

/**
 * Pipes requests handlers
 */
const pipesRequestsHandlers: RequestHandler[] = [

    // Morgan middleware
    morgan("dev"),

    // Static files
    Static(path.join(process.cwd(), "public")),

    // Json Parser
    json(),

    // UrlEncoded Parser
    urlencoded({ extended: true })
];

// export middleware
export default pipesRequestsHandlers;