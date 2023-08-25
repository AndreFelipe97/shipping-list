import { AuthenticationOptions } from '@adminjs/express';
import { Router } from 'express';
import { SessionOptions } from 'express-session';
import { User } from '../../models';
import { compare } from 'bcryptjs';
import session from 'express-session';

interface IAuthSessionReturn {
  auth: AuthenticationOptions;
  predefinedRouter?: Router | null | undefined;
  sessionOptions: SessionOptions | undefined;
}

export async function AuthService(): Promise<IAuthSessionReturn> {
  const mysqlStore = require('express-mysql-session')(session);
  const sessionStore = new mysqlStore({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true,
  });

  const auth = {
    authenticate: async (email: string, password: string) => {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) return false;

      const passwordConfirmed = await compare(
        password,
        user.password as string,
      );

      if (!passwordConfirmed) return false;

      return user;
    },
    cookieName: process.env.DB_NAME,
    cookiePassword: process.env.SECRET_KEY as string,
  };

  const predefinedRouter = null;

  const sessionOptions = {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY as string,
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
    name: process.env.DB_NAME,
  };

  return {
    auth,
    predefinedRouter,
    sessionOptions,
  };
}
