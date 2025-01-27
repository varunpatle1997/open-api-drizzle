import { createRouter } from '../../lib/create-app.ts';

import * as handlers from "./users.handlers.ts"
import * as routes from "./users.routes.ts"

const router = createRouter()
.openapi(routes.list, handlers.list)
.openapi(routes.create, handlers.create )

export default router;