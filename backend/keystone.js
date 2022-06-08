import { config, list} from '@keystone-6/core';
import { Job } from './schemas/Job';
import { withAuth, session} from './auth';
import {User} from './schemas/User';
import { Interview } from './schemas/Interview';

export default config(
    withAuth({
    db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
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