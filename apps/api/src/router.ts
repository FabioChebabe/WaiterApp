import path from 'node:path';

import { Router } from 'express';
import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import multer from 'multer';
import { listProductsByCategory } from './app/useCases/categories/listProductsBycategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { signUp } from './app/useCases/auth/signUp';
import { listUsers } from './app/useCases/users/listUsers';
import { signIn } from './app/useCases/auth/signIn';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from './app/config/env';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(process.cwd(), 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get(
    '/users',
    (req, resp, next) => {
        const { authorization } = req.headers;
        // if()
        if (!authorization) {
            return resp.status(401).json({ error: 'Invalid access token.' });
        }

        try {
            const [bearer, token] = authorization.split(' ');
            if (bearer !== 'Bearer') {
                throw new Error();
            }
            const payload = verify(token, env.jwtSecret) as JwtPayload;

            return {
                data: {
                    account: {
                        accountId: payload.sub,
                        role: payload.role,
                    },
                },
            };
        } catch (error) {
            return {
                statusCode: 401,
                body: {
                    error: 'Invalid access token.',
                },
            };
        }
        console.log('authorization', authorization);
    },
    listUsers,
);

// List categories
router.get('/categories', listCategories);
// Create Category
router.post('/categories', createCategory);
//List products
router.get('/products', listProducts);
// Create Product
router.post('/products', upload.single('image'), createProduct);
// get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

//list order
router.get('/orders', listOrders);
// Create Order
router.post('/orders', createOrder);
// Change order status
router.patch('/orders/:orderId', changeOrderStatus);
// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
