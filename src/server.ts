import http from 'http';
import express from 'express';
import './config/config';
import './config/logger';
import { loggerHandler } from './middleware/loggerHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER } from './config/config';
import 'reflect-metadata';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logger.log('########################################');
    logger.log('Initializing API');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logger.log('########################################');
    logger.log('Logging & Configuration');
    application.use(loggerHandler);
    application.use(corsHandler);

    logger.log('########################################');
    logger.log('Define Controller Routing');
    defineRoutes([MainController], application);

    logger.log('########################################');
    logger.log('Define Routing Error');
    application.use(routeNotFound);

    logger.log('########################################');
    logger.log('Starting Server');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logger.info('Server Started: ' + SERVER.SERVER_HOSTNAME + ':' + SERVER.SERVER_PORT);
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
