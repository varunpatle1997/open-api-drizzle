import app from './app.ts';
import configureOpenAPI from './lib/configure-open-api.ts';

configureOpenAPI(app)

Deno.serve({port:3000}, app.fetch);