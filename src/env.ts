import { z } from 'zod';
// import "@std/dotenv/load";

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
    DATABASE_URL: z.string()
});

const env = EnvSchema.parse(Deno.env.toObject());;


export default env;
