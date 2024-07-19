import { Express, RequestHandler } from 'express';
import { RouteHandler } from '../library/routes';

export function Route(method: keyof Express, path: string = '', ...middleware: RequestHandler[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const routePath = path;
        const routeHandler: RouteHandler = Reflect.getMetadata('routeHandlers', target) || new Map();

        if (!routeHandler.has(method)) {
            routeHandler.set(method, new Map());
        }

        routeHandler.get(method)?.set(routePath, [...middleware, descriptor.value]);

        Reflect.defineMetadata('routeHandlers', routeHandler, target);
    };
}
