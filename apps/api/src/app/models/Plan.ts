import { Schema, model, Document } from 'mongoose';

export interface IPlan extends Document {
    stripeSubscriptionId: string;
    stripeCustomerId: string;
    status: string;
    currentPeriodEnd: Date;
    name: string; // TODO: REVIEW STATUS
}

const planSchema = new Schema<IPlan>(
    {
        stripeSubscriptionId: { type: String, required: true },
        stripeCustomerId: { type: String, required: true },
        status: { type: String, required: true },
        currentPeriodEnd: { type: Date, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true },
);

export const Plan = model<IPlan>('Plan', planSchema);
