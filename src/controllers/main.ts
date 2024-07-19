import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/validate';

const postHealthCheckValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
});

@Controller()
export default class MainController {
    @Route('get', '/healthcheck')
    @Route('post', '/healthcheck')
    @Validate(postHealthCheckValidation)
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json({ hello: 'world!' });
    }
}
