import http from 'http';
import express from 'express';
import './config/config';
import './config/logger';
import { loggerHandler } from './middleware/loggerHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER } from './config/config';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logger.log('########################################');
    logger.log('Initializing API');
    logger.log('########################################');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logger.log('########################################');
    logger.log('Logging & Configuration');
    logger.log('########################################');
    application.use(loggerHandler);
    application.use(corsHandler);

    logger.log('########################################');
    logger.log('Define Controller Routing');
    logger.log('########################################');
    application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ server: 'OK' });
    });

    logger.log('########################################');
    logger.log('Define Routing Error');
    logger.log('########################################');
    application.use(routeNotFound);

    logger.log('########################################');
    logger.log('Starting Server');
    logger.log('########################################');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logger.info('Server Started: ' + SERVER.SERVER_HOSTNAME + ':' + SERVER.SERVER_PORT);
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
