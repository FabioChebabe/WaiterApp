import { Schema, model, Document } from 'mongoose';

export interface IOrganization extends Document {
    name: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    number: number;
    city: string;
    state: string;
    plan?: string;
}

const organizationSchema = new Schema<IOrganization>(
    {
        name: { type: String, required: true },
        zipCode: { type: String, required: true },
        street: { type: String, required: true },
        neighborhood: { type: String, required: true },
        number: { type: Number, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    },
    { timestamps: true },
);

export const Organization = model<IOrganization>(
    'Organization',
    organizationSchema,
);
