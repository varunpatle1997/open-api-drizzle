import { createRoute } from '@hono/zod-openapi';
import { IdParamsSchema, jsonContent } from '../../utils/openApiUtils.ts';
import { z } from '@hono/zod-openapi'
import { userInsertSchema, userPatchSchema, userSelectSchema } from '../../database/schema.ts';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import createErrorSchema from 'stoker/openapi/schemas/create-error-schema';

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

export const patch = createRoute({
    tags: ["Users"],
    path: "/users/{id}",
    request: {
        params: IdParamsSchema,
        body: jsonContent(
            userPatchSchema,
            "The user to update"
        )
    },
    method: "patch",
    responses: {
        200: jsonContent(
            userSelectSchema,
            "The updated user"
        ),
        422: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id"
        ),
        404: jsonContent(
            z.object({
                message: z.string()
            }).openapi({
                example: {
                    message: "Not found"
                }
            }),
            "User Not Found"
        )
    }
})

export const remove = createRoute({
    tags: ["Users"],
    path: "/users/{id}",
    request: {
        params: IdParamsSchema
    },
    method: "delete",
    responses: {
        204: {
            description: "task deleted"
        },
        422: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id"
        ),
        404: jsonContent(
            z.object({
                message: z.string()
            }).openapi({
                example: {
                    message: "Not found"
                }
            }),
            "User Not Found"
        )
    }
})

export const getOne = createRoute({
    tags: ["Users"],
    path: "/users/{id}",
    request: {
        params: IdParamsSchema
    },
    method: "get",
    responses: {
        200: jsonContent(
            userSelectSchema,
            "Single user"
        ),
        422: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id"
        ),
        404: jsonContent(
            z.object({
                message: z.string()
            }).openapi({
                example: {
                    message: "Not found"
                }
            }),
            "User Not Found"
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
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove