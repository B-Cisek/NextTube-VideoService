import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import './config/config';
import './config/logger';
import { loggerHandler } from './middleware/loggerHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { mongo, server } from './config/config';
import 'reflect-metadata';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';
import { declareHandler } from './middleware/declareHandler';
import VideoController from './controllers/video';
import { tokenValidation } from './middleware/tokenValidation';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logger.log('########################################');
    logger.log('Initializing API');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logger.log('########################################');
    logger.log('Connect to MongoDB');
    try {
        const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
        logger.log('Connecting to Mongo: ', connection.version);
    } catch (error) {
        logger.log('Unable to connect to MongoDB');
        logger.error(error);
    }

    logger.log('########################################');
    logger.log('Logging & Configuration');
    application.use(tokenValidation);
    application.use(declareHandler);
    application.use(loggerHandler);
    application.use(corsHandler);

    logger.log('########################################');
    logger.log('Define Controller Routing');
    defineRoutes([MainController, VideoController], application);

    logger.log('########################################');
    logger.log('Define Routing Error');
    application.use(routeNotFound);

    logger.log('########################################');
    logger.log('Starting Server');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logger.info('Server Started: ' + server.SERVER_HOSTNAME + ':' + server.SERVER_PORT);
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
