import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
        app.use((req, resp, next) => {
            const allowedOrigins = [
                'http://localhost:5173',
                'http://localhost:5174',
            ];

            const origin = req.headers.origin as string;

            if (allowedOrigins.includes(origin)) {
                resp.setHeader('Access-Control-Allow-Origin', origin);
            }
            resp.setHeader('Access-Control-Allow-Methods', '*');
            resp.setHeader('Access-Control-Allow-Headers', '*');

            next();
        });

        app.use(
            '/uploads',
            express.static(path.resolve(__dirname, '..', 'uploads')),
        );
        app.use(express.json());
        app.use(router);

        server.listen(3001, () => {
            console.log('Server is running on http://localhost:3001');
        });
        console.log('Mongo connected');
    })
    .catch(() => console.log('error'));
