import { request, Request, Response } from 'express';
import { User } from '../../models/User';

export async function listUsers(request: Request, response: Response) {
    try {
        const users = await User.find();

        response.json(users);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}
