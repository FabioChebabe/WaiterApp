import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function createCategory(request: Request, response: Response) {
    try {
        const { icon, name } = request.body;

        if (!name) {
            response.status(400).json({
                error: 'Name is required',
            });
        }

        const category = await Category.create({ icon, name });

        response.status(201).json(category);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}
