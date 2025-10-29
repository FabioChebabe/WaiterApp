declare namespace Express {
    export interface Request {
        metadata?: {
            account?: {
                id: string;
                role: string;
                org: string;
            };
            [key: string]: any; // optional: allows adding extra metadata later
        };
    }
}
