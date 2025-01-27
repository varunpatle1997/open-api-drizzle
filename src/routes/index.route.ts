import { createRoute, z } from '@hono/zod-openapi';
import { createRouter } from '../lib/create-app.ts';
import { jsonContent } from '../utils/openApiUtils.ts';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';
import env from '../env.ts';

const router = createRouter()
  .openapi(
    createRoute({
      tags: ['index'],
      method: 'get',
      path: '/',
      responses: {
        200: jsonContent(
          createMessageObjectSchema("User API"),
          'Welcome to the User API'
        )
      },
    }),
    (c) => {
      return c.json({ message: 'User API', DATABASE_URL: env.DATABASE_URL }, 200);
    },
  );

export default router;
