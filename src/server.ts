import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import * as dotenv from 'dotenv';
import { User } from './models';
import { generateResource } from './utils/generateResource';
import { userProperties } from './properties/user.property';
import { CreateUser } from './actions/user/create.action';
import { sequelize } from './db';
import { authSession } from './services/authenticated/auth.session';
import { Product } from './models/product.entity';

dotenv.config();

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const PORT = process.env.PORT_HOST;

const start = async () => {
  const app = express();
  sequelize
    .sync()
    .then(result => console.log(result))
    .catch(error => console.log(error));

  const admin = new AdminJS({
    resources: [
      generateResource(User, userProperties, {
        new: {
          before: async (request: any) => CreateUser(request),
        },
        edit: {
          before: async (request: any) => CreateUser(request),
        },
      }),
      generateResource(Product, {}, {}),
    ],
    dashboard: {
      component: AdminJS.bundle('./frontend/components/dashboard.tsx'),
    },
  });

  const { auth, predefinedRouter, sessionOptions } = await authSession();

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    auth,
    predefinedRouter,
    sessionOptions,
  );
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://${process.env.HOST}:${PORT}${admin.options.rootPath}`,
    );
  });
};

start();
