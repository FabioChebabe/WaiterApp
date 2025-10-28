//TODO: signup need to create an organization and create an admin user

import z from 'zod';
import { Organization } from '../../models/Organization';
import { User } from '../../models/User';
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

const schema = z
    .object({
        name: z.string().nonempty('Name is required'),
        email: z.email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters'),
        phoneNumber: z.string().nonempty('Phone number is required'),
        organizationName: z.string().nonempty('Organization name is required'),
        organizationZipCode: z.string().nonempty('Zip code is required'),
        organizationStreet: z.string().nonempty('Street is required'),
        organizationNeighborhood: z
            .string()
            .nonempty('Neighborhood is required'),
        organizationNumber: z.number(),
        organizationCity: z.string().nonempty('City is required'),
        organizationState: z.string().nonempty('State is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export async function signUp(request: Request, response: Response) {
    try {
        const { success, error, data } = schema.safeParse(request.body);

        if (error) {
            return response.status(400).json({ erro: error.message });
        }

        const {
            name,
            email,
            password,
            phoneNumber,
            organizationName,
            organizationZipCode,
            organizationStreet,
            organizationNeighborhood,
            organizationNumber,
            organizationCity,
            organizationState,
        } = data;

        const accountAlreadyExist = await User.findOne({ email });

        if (accountAlreadyExist) {
            return response.status(409).json({
                error: 'Account already exist!',
            });
        }

        const organization = await Organization.create({
            name: organizationName,
            zipCode: organizationZipCode,
            city: organizationCity,
            street: organizationStreet,
            neighborhood: organizationNeighborhood,
            number: organizationNumber,
            state: organizationState,
        });

        const hashPassword = await hash(password, 10);
        const user = await User.create({
            name,
            password: hashPassword,
            role: 'admin',
            email,
            phoneNumber,
            organization: organization._id,
        });

        console.log('user >>> ', user);
        return response.sendStatus(204);
    } catch (error) {
        response.sendStatus(500);
    }
}
