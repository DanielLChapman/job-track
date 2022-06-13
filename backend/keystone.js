import { config, list} from '@keystone-6/core';
import { Job } from './schemas/Job';
import { withAuth, session} from './auth';
import {User} from './schemas/User';
import { Interview } from './schemas/Interview';
import 'dotenv/config';

export default config(
    withAuth({
    db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
    },
    server: {
        cors: {
            origin: ["http://localhost:7777", process.env.PROD_URL],
            credentials: true,
        },
    },
    lists: {
        User: User,
        Job: Job,
        Interview: Interview,
    },
    session,
    ui: {
        isAccessAllowed: (context) => !!context.session?.data
    }
}));