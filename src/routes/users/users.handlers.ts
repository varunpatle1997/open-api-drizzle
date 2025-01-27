import { RouteHandler } from '@hono/zod-openapi';
import { CreateRoute, ListRoute } from './users.routes.ts';
import { db } from '../../database/index.ts';
import { users } from '../../database/schema.ts';

export const list:RouteHandler<ListRoute> = async (c) => {
    const users = await db.query.users.findMany();
    console.log(users)
    return c.json(users, 200)
}

export const create:RouteHandler<CreateRoute> = async (c) => {
    const user = c.req.valid("json");
    const [inserted] = await db.insert(users).values(user).returning()
    console.log(inserted)
    return c.json(inserted, 200)
}