import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import {notFound, onError} from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"

export function createRouter(){
    return new OpenAPIHono({strict: false, 
        defaultHook
    })
}

export default function createApp() {
    const app = createRouter()
    app.use(logger())

    app.notFound(notFound);
    app.onError(onError)
    return app;
}
