import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { swaggerUI } from '@hono/swagger-ui'
import { logger } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import env from './env.ts';
import {notFound, onError} from "stoker/middlewares"

const app = new OpenAPIHono({strict: false});
app.use(logger())

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).optional()
});

const CreateUserSchema = UserSchema.omit({ id: true });

app.notFound(notFound);

app.get("/error", (c) => {
  throw new Error("Ohh no")
})

app.onError(onError)


//define the route
const createUser = createRoute({
  method: 'post',
  path: '/users',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: UserSchema
        }
      },
      description: 'User created successfully'
    },
    400: {
      description: 'Invalid request body'
    }

  }
})

app.doc('/swagger', {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: 'v1'
  }
});

app.get('/docs', swaggerUI({url: '/swagger'}))

app.openapi(createUser, async(c) => {
  const payload = c.req.valid('json');

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    ...payload
  }

  return c.json(newUser, 201)
})

app.get('/', (c) => {
  return c.text(env.NODE_ENV);
});

export default app
