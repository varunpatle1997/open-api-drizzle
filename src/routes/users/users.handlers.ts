import { RouteHandler } from '@hono/zod-openapi';
import { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './users.routes.ts';
import { db } from '../../database/index.ts';
import { users } from '../../database/schema.ts';
import { eq } from 'drizzle-orm';

export const list: RouteHandler<ListRoute> = async (c) => {
    const users = await db.query.users.findMany();
    console.log(users)
    return c.json(users, 200)
}

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid("param")
    const user = await db.query.users.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id)
        }
    })

    if (!user) {
        return c.json({message: "Not found"}, 404)
    }
    console.log(users)
    return c.json(user, 200)
}

export const remove: RouteHandler<RemoveRoute> = async (c) => {
    const { id } = c.req.valid("param")
    const result = await db.delete(users)
    .where(eq(users.id, id))
    .returning()

    if (!result) {
        return c.json({message: "Not found"}, 404)
    }
    console.log(users)
    return c.body(null, 204)
}

export const patch: RouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");

    const [user] = await db.update(users)
    .set(updates)
    .where(eq(users.id, id))
    .returning()
    if(!user) {
        return c.json({message: "Not found"}, 404)
    }

    return c.json(user, 200)
}

export const create: RouteHandler<CreateRoute> = async (c) => {
    const user = c.req.valid("json");
    const [inserted] = await db.insert(users).values(user).returning()
    console.log(inserted)
    return c.json(inserted, 200)
}