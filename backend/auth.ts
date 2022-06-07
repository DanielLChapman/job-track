import { createAuth } from "@keystone-6/auth";
import { statelessSessions} from '@keystone-6/core/session';
import 'dotenv/config';

const { withAuth} = createAuth({
    listKey: 'User',
    identityField: 'email',
    sessionData: 'name',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
    },
});

let sessionSecret = process.env.COOKIE_SECRET || "SECRET COOKIE DONT LOOK I MEAN IT";

let sessionMaxAge = 60 * 60 * 24 * 30;

const session = statelessSessions({
    maxAge: sessionMaxAge,
    secret: sessionSecret
});

export { withAuth, session};