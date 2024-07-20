import { Request, Response, NextFunction } from 'express';
import { HydratedDocument, Model } from 'mongoose';

export function MongoUpdate(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const data = await model.findById(req.params.id);

                if (!data) {
                    return res.status(404).json({ error: 'Not Found' });
                }

                data.set({ ...req.body });

                await data.save();

                req.mongoUpdate = data;
            } catch (error) {
                logger.error(error);
                return res.status(500).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
