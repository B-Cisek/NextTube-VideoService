import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoCreate(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const data = new model({
                    _id: new mongoose.Types.ObjectId(),
                    ...req.body
                });

                await data.save();
                req.mongoCreate = data;
                if (data) {
                    req.mongoGet = data;
                } else {
                    return res.status(404).json({ error: 'Not Found' });
                }
            } catch (error) {
                logger.error(error);
                return res.status(500).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
