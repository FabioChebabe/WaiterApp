import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'super_admin' | 'admin' | 'manager' | 'waiter';
    organization: Types.ObjectId;
    phoneNumber?: string;
    stripeCustomerId?: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['super_admin', 'admin', 'manager', 'waiter'],
            default: 'waiter',
        },
        organization: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Organization',
        },
        phoneNumber: String,
        stripeCustomerId: String,
    },
    { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
