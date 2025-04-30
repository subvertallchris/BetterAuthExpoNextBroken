import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { username } from 'better-auth/plugins';

import Database from "better-sqlite3";
 
export const auth = betterAuth({
  plugins: [
    expo(),
    username(),
    // nextCookies must be last!
    nextCookies(),
  ],
  database: new Database("./sqlite.db"),
  trustedOrigins: ["myapp://"],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    modelName: 'Session',
    expiresIn: 400 * 24 * 60 * 60, // 400 days
    // https://www.better-auth.com/docs/concepts/session-management#cookie-cache
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds - 1 minutes
    },
  },
});
