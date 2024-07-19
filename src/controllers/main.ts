import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';

@Controller()
export default class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logger.info('Health check called');
        return res.status(200).json({ hello: 'world!' });
    }
}
