import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/validate';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { Video } from '../models/video';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';

const postHealthCheckValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
});

@Controller('/videos')
export default class VideoController {
    @Route('get', '/get/all')
    @MongoGetAll(Video)
    getAll(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/get/:id')
    @MongoGet(Video)
    get(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json(req.mongoGet);
    }

    @Route('post', '/create')
    @MongoCreate(Video)
    create(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(201).json(req.mongoCreate);
    }

    @Route('post', '/query')
    @MongoQuery(Video)
    query(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json(req.mongoQuery);
    }

    @Route('patch', '/update/:id')
    @MongoUpdate(Video)
    update(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json(req.mongoUpdate);
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(Video)
    delete(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json({ message: 'deleted' });
    }
}
