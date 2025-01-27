import { createRoute } from '@hono/zod-openapi';
import { jsonContent } from '../../utils/openApiUtils.ts';
import { z } from '@hono/zod-openapi'
import { userInsertSchema, userSelectSchema } from '../../database/schema.ts';
import { jsonContentRequired } from 'stoker/openapi/helpers';

export const list = createRoute({
    tags: ["Users"],
    path: "/users",
    method: "get",
    responses: {
        200: jsonContent(
            z.array(userSelectSchema),
            "list of users"
        ),
        400: jsonContent(
            z.object({ error: z.string() }),
            "Invalid request"
        )
    }
})

export const create = createRoute({
    tags: ["Users"],
    path: "/users",
    method: "post",
    request: {
        body: jsonContentRequired(userInsertSchema, "The user to create")
    },
    responses: {
        200: jsonContent(
            userSelectSchema,
            "list of users"
        )
    }
})

export type ListRoute = typeof list
export type CreateRoute = typeof create