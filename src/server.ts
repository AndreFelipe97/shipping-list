import AdminJS, { ActionContext, ActionRequest } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import * as dotenv from 'dotenv';
import { User } from './models';
import { generateResource } from './utils/generateResource';
import { userProperties } from './properties/user.property';
import { CreateUser } from './actions/user/create.action';
import { sequelize } from './db';
import { authSession } from './configs/authenticated/auth.session';
import { Product } from './models/product.entity';
import hbs from 'hbs';
import EmailService from './configs/email/email.service';
import { UpdateUser } from './actions/user/update.action';
import routes from './routes/index.routes';

const path = require('path');

dotenv.config();

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const bodyParser = require('body-parser');

const PORT = process.env.PORT_HOST;

const emailService = new EmailService(__dirname);

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
          before: async (request: ActionRequest) => {
            await emailService.sendEmail(
              request.payload?.email,
              'Bem vindo ao meu gerenciador de lista de compras',
              'password-send',
              {
                text: 'seja bem-vindo ao sistema, sua senha é: ',
                name: request.payload?.name,
                password: request.payload?.password,
              },
            );
            return CreateUser(request);
          },
        },
        edit: {
          before: async (request: ActionRequest, context: ActionContext) => {
            if (request.method && request.method === 'post') {
              await emailService.sendEmail(
                request.payload?.email,
                'Senha alterada',
                'password-send',
                {
                  text: 'sua senha foi alterada e agora é: ',
                  name: request.payload?.name,
                  password: request.payload?.password,
                },
              );
              return UpdateUser(request, context);
            } else {
              return request;
            }
          },
        },
      }),
      generateResource(Product, {}, {}),
    ],
    dashboard: {
      component: AdminJS.bundle('./frontend/components/dashboard.tsx'),
    },
    branding: {
      companyName: 'Gerenciado de lista de compras',
    },
  });

  const { auth, predefinedRouter, sessionOptions } = await authSession();

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    auth,
    predefinedRouter,
    sessionOptions,
  );

  console.log('Entrou aqui');

  hbs.registerPartials(path.join(__dirname, 'configs', 'email', 'views'));
  app.set('view engine', '.hbs');

  app.use(admin.options.rootPath, adminRouter);

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/dashboard', routes);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://${process.env.HOST}:${PORT}${admin.options.rootPath}`,
    );
  });
};

start();
