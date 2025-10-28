import z from 'zod';
import { Organization } from '../../models/Organization';
import { User } from '../../models/User';
import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function signIn(request: Request, response: Response) {
    try {
        const { success, error, data } = schema.safeParse(request.body);

        if (error) {
            return response.status(400).json({ erro: error.message });
        }

        const { email, password } = data;

        const account = await User.findOne({ email });

        if (!account) {
            return response.status(401).json({
                error: 'Invalid credentials',
            });
        }

        const isValidPassword = await compare(password, account.password);

        if (!isValidPassword) {
            return response.status(401).json({
                error: 'Invalid credentials',
            });
        }
        console.log('1>>> ', env.jwtSecret);

        const accessToken = sign(
            {
                sub: account.id,
                role: account.role,
                org: account.organization._id,
            },
            env.jwtSecret,
            { expiresIn: '7d' },
        );

        return response.status(200).json({ accessToken });
    } catch (error) {
        response.sendStatus(500);
    }
}
