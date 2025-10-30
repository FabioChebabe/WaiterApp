import path from 'node:path';

import { Request, Router } from 'express';
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
import { authenticationMiddleware } from './app/middleware/authenticationMiddleware';
import { authorizationMiddleware } from './app/middleware/authorizationMiddleware';

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
    authenticationMiddleware,
    authorizationMiddleware(['admin']),
    listUsers,
);

// List categories
router.get(
    '/categories',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager', 'waiter']),
    listCategories,
);
// Create Category
router.post(
    '/categories',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager']),
    createCategory,
);
//List products
router.get('/products', listProducts);
// Create Product
router.post(
    '/products',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager']),
    upload.single('image'),
    createProduct,
);
// get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

//list order
router.get(
    '/orders',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager', 'waiter']),
    listOrders,
);
// Create Order
router.post(
    '/orders',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager', 'waiter']),
    createOrder,
);
// Change order status
router.patch(
    '/orders/:orderId',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager', 'waiter']),
    changeOrderStatus,
);
// Delete/cancel order
router.delete(
    '/orders/:orderId',
    authenticationMiddleware,
    authorizationMiddleware(['super_admin', 'admin', 'manager', 'waiter']),
    cancelOrder,
);
