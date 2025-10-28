import 'dotenv/config';
console.log('aquiiii >>> ', process.env.JWT_SECRET);
export const env = {
    jwtSecret: process.env.JWT_SECRET!,
};
