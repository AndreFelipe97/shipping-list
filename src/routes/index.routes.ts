import { Request, Response, Router } from 'express';
import usersRoutes from './users/users.routes';
import productsRoutes from './products/products.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);

export default routes;
