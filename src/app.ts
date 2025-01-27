import env from './env.ts';
import configureOpenAPI from './lib/configure-open-api.ts';
import createApp from './lib/create-app.ts';
import index from './routes/index.route.ts'
import users from './routes/users/users.index.ts'

const app = createApp()

const routes = [
    index,
    users
]

configureOpenAPI(app);

routes.forEach(route => {
    app.route("/", route)
})

export default app
