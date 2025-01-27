import { apiReference } from 'npm:@scalar/hono-api-reference';

export default function configureOpenAPI(app) {
    app.doc('/docs', {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: 'v1',
        },
    });

    app.get(
        '/reference',
        apiReference({
            theme: 'kepler',
            spec: {
                url: '/docs',
            },
            layout: 'classic'
        }),
    );
}
