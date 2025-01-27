import { z } from '@hono/zod-openapi';
export function jsonContent<T extends z.ZodType>(
  schema: T,
  description: string
) {
  return {
    content: {
      "application/json": {
        schema
      },
    },
    description,
  };
}

const IdParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
      required: true,
    },
    required: ["id"],
    example: 42,
  }),
});

export default IdParamsSchema;