/**
 * Main application routes
 */
import health from './api/health';
import services from './api/services';


export const initRoutes = (app) => {
    app.use('/', health);
	app.use('/api', services.create());
}

