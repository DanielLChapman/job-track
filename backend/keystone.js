import { config, list} from '@keystone-6/core';
import { Post } from './schemas/Post';
import { withAuth, session} from './auth';
import {User} from './schemas/User';

export default config(
    withAuth({
    db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
    },
    lists: {
        User: User,
        Post: Post,
    },
    session,
    ui: {
        isAccessAllowed: (context) => !!context.session?.data
    }
}));